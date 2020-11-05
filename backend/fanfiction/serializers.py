from rest_framework import serializers
from rest_framework import fields
from rest_framework.validators import UniqueValidator
from .models import User, Work, Chapter, Category, Warning, FandomCategory, Fandom, Relationship, Character, Bookmark, Like

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
        )
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())]
        )
    password = serializers.CharField(min_length=4)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
            validated_data['password'])
        return user

class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = (
            'id',
            'user',
            'title',
            'description',
            'relationships',
            'characters',
            'categories',
            'warnings',
            'rating',
            'comleted',
            'date_created',
            'date_modified',
        )

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = (
            'id',
            'title',
            'text',
            'work',
            'date_created',
            'date_modified',
        )

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            'id',
            'name',
        )


class WarningSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warning
        fields = (
            'id',
            'name',
        )


class FandomCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FandomCategory
        fields = (
            'id',
            'name',
        )

class FandomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fandom
        fields = (
            'id',
            'name',
            'category',
        )

class RelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relationship
        fields = (
            'id',
            'name',
        )

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = (
            'id',
            'name',
            'fandom',
        )

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = (
            'id',
            'user',
            'work',
        )

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = (
            'id',
            'user',
            'work',
        )
