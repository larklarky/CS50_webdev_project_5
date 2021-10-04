import re
from django.http import response
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import views, status
from rest_framework import request
from .serializers import UserSerializer, WorkSerializer, ChapterSerializer, CategorySerializer, WarningSerializer, FandomCategorySerializer, FandomSerializer, RelationshipSerializer, CharacterSerializer, BookmarkSerializer, LikeSerializer
from .models import User, Work, Chapter, Category, Warning, FandomCategory, Fandom, Relationship, Character, Bookmark, Like
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, BasePermission
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework import permissions
from django.db.models import Count
from django.core.exceptions import PermissionDenied

MODIFY_METHODS = ('PATCH', 'DELETE', 'PUT')

class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_permission(self, request, view):
        return True

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Instance must have an attribute named `owner`.
        if isinstance(obj, Chapter) == True:
            return obj.work.user.id == request.user.id
        elif isinstance(obj, Work) == True:
            return obj.user.id == request.user.id
        elif isinstance(obj, Like) == True:
            return obj.user.id == request.user.id
        elif isinstance(obj, Bookmark) == True:
            return obj.user.id == request.user.id
        elif isinstance(obj, User) == True:
            return obj.id == request.user.id
        elif isinstance(obj, Relationship) == True:
            if request.method in MODIFY_METHODS:
                return False
            return True

# Create your views here.
class LargeResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size= 100


class RegistrationView(views.APIView):
    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(views.APIView):
    def delete(self, request):
        user = User.objects.filter(username=request.user).first()
        token = Token.objects.filter(user = user).first()
        if token:
            token.delete()
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        return Response('error', status=status.HTTP_400_BAD_REQUEST)


class UserView(viewsets.ModelViewSet):
    permission_classes = (IsOwnerOrReadOnly, IsAuthenticatedOrReadOnly)
    serializer_class = UserSerializer
    queryset = User.objects.all()
    filter_backends = [DjangoFilterBackend]

    def get_object(self):
        pk = self.kwargs.get('pk')

        if pk == "current":
            return self.request.user

        return super(UserView, self).get_object()

class WorkView(viewsets.ModelViewSet):
    permission_classes = (IsOwnerOrReadOnly, IsAuthenticatedOrReadOnly)
    serializer_class = WorkSerializer
    queryset = Work.objects.annotate(
        num_likes=Count('likes'),
        num_bookmarks=Count('bookmarks'),
    ).order_by('-date_modified')
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['user', 'fandoms']
    pagination_class = StandardResultsSetPagination
    search_fields = ['title', 'description', 'characters__name', 'fandoms__name']


class ChapterView(viewsets.ModelViewSet):
    def perform_create(self, serializer):
        work = Work.objects.get(id = serializer.validated_data['work'].id)
        if self.request.user.id != work.user.id:
            raise PermissionDenied()
        
        serializer.save()
            

    permission_classes = (IsOwnerOrReadOnly, IsAuthenticatedOrReadOnly)
    serializer_class = ChapterSerializer
    queryset = Chapter.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['work']

class CategoryView(viewsets.ModelViewSet):
    permission_classes = (ReadOnly,)
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class WarningView(viewsets.ModelViewSet):
    permission_classes = (ReadOnly,)
    serializer_class = WarningSerializer
    queryset = Warning.objects.all()

class FandomCategoryView(viewsets.ModelViewSet):
    permission_classes = (ReadOnly,)
    serializer_class = FandomCategorySerializer
    queryset = FandomCategory.objects.all()
    filter_backends = [DjangoFilterBackend]

class FandomView(viewsets.ModelViewSet):
    permission_classes = (ReadOnly,)
    serializer_class = FandomSerializer
    queryset = Fandom.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['category', 'name']
    search_fields = ['name']

class RelationshipView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly)
    serializer_class = RelationshipSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    queryset = Relationship.objects.all()
    search_fields = ['name']

class CharacterView(viewsets.ModelViewSet):
    permission_classes = (ReadOnly,)
    serializer_class = CharacterSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    queryset = Character.objects.all()
    search_fields = ['name']

class BookmarkView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly)
    serializer_class = BookmarkSerializer
    queryset = Bookmark.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['user', 'work']
    search_fields = ['work']
    pagination_class = StandardResultsSetPagination

class LikeView(viewsets.ModelViewSet):
    permission_classes = (IsOwnerOrReadOnly, IsAuthenticatedOrReadOnly)
    serializer_class = LikeSerializer
    queryset = Like.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['user', 'work']
    search_fields = ['work']

