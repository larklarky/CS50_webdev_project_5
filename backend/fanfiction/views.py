from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer, WorkSerializer, ChapterSerializer, CategorySerializer, WarningSerializer, FandomCategorySerializer, FandomSerializer, RelationshipSerializer, CharacterSerializer, BookmarkSerializer, LikeSerializer
from .models import User, Work, Chapter, Category, Warning, FandomCategory, Fandom, Relationship, Character, Bookmark, Like


# Create your views here.
class UserView(viewsets.ModelViewSet):
  serializer_class = UserSerializer
  queryset = User.objects.all()

class WorkView(viewsets.ModelViewSet):
  serializer_class = WorkSerializer
  queryset = Work.objects.all()

class ChapterView(viewsets.ModelViewSet):
  serializer_class = ChapterSerializer
  queryset = Chapter.objects.all()

class CategoryView(viewsets.ModelViewSet):
  serializer_class = CategorySerializer
  queryset = Category.objects.all()

class WarningView(viewsets.ModelViewSet):
  serializer_class = WarningSerializer
  queryset = Warning.objects.all()

class FandomCategoryView(viewsets.ModelViewSet):
  serializer_class = FandomCategorySerializer
  queryset = FandomCategory.objects.all()

class FandomView(viewsets.ModelViewSet):
  serializer_class = FandomSerializer
  queryset = Fandom.objects.all()

class RelationshipView(viewsets.ModelViewSet):
  serializer_class = RelationshipSerializer
  queryset = Relationship.objects.all()

class CharacterView(viewsets.ModelViewSet):
  serializer_class = CharacterSerializer
  queryset = Character.objects.all()

class BookmarkView(viewsets.ModelViewSet):
  serializer_class = BookmarkSerializer
  queryset = Bookmark.objects.all()

class LikeView(viewsets.ModelViewSet):
  serializer_class = LikeSerializer
  queryset = Like.objects.all()

