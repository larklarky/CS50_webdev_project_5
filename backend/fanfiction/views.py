from django.http import response
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import views, status
from rest_framework import request
from .serializers import UserSerializer, WorkSerializer, ChapterSerializer, CategorySerializer, WarningSerializer, FandomCategorySerializer, FandomSerializer, RelationshipSerializer, CharacterSerializer, BookmarkSerializer, LikeSerializer
from .models import User, Work, Chapter, Category, Warning, FandomCategory, Fandom, Relationship, Character, Bookmark, Like
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django_filters.rest_framework import DjangoFilterBackend


# Create your views here.
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
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    queryset = User.objects.all()

class WorkView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = WorkSerializer
    queryset = Work.objects.all()

class ChapterView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ChapterSerializer
    queryset = Chapter.objects.all()

class CategoryView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class WarningView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = WarningSerializer
    queryset = Warning.objects.all()

class FandomCategoryView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = FandomCategorySerializer
    queryset = FandomCategory.objects.all()
    filter_backends = [DjangoFilterBackend]

class FandomView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = FandomSerializer
    queryset = Fandom.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'name']

class RelationshipView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = RelationshipSerializer
    queryset = Relationship.objects.all()

class CharacterView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = CharacterSerializer
    queryset = Character.objects.all()

class BookmarkView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = BookmarkSerializer
    queryset = Bookmark.objects.all()

class LikeView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = LikeSerializer
    queryset = Like.objects.all()

