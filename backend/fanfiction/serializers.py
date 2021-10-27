from rest_framework import serializers
from rest_framework import fields
from rest_framework.fields import ChoiceField
from rest_framework.serializers import Serializer
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
    password = serializers.CharField(min_length=4, write_only=True)
    

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name', 'date_joined')

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
            validated_data['password'])
        return user

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
    name = ChoiceField(choices= Warning.WARNINGS_CHOICES)
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
        ordering = ['name']
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


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = (
            'id',
            'user',
            'work',
        )

class WorkSerializer(serializers.ModelSerializer):
    relationships = RelationshipSerializer(many=True, required=False)
    characters = CharacterSerializer(many=True)
    categories = CategorySerializer(many=True)
    warnings = WarningSerializer(many=True)
    fandoms = FandomSerializer(many=True)
    user = UserSerializer(read_only=True, default=serializers.CurrentUserDefault())
    num_likes = serializers.IntegerField(source='likes.count', required=False)
    num_bookmarks = serializers.IntegerField(source='bookmarks.count', required=False)
   
    class Meta:
        ordering = ['-date_modified']
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
            'completed',
            'date_created',
            'date_modified',
            'fandoms',
            'num_likes',
            'num_bookmarks',
        )
        extra_kwargs = {
            'user': {'read_only': True},
            'category': {'read_only': True},
            'num_likes': {'required': False},
            'num_bookmarks': {'required': False},
        }
    
    def create(self, validated_data):
        characters_data = validated_data.pop('characters')
        categories_data = validated_data.pop('categories')
        warnings_data = validated_data.pop('warnings')
        fandoms_data = validated_data.pop('fandoms')
        user = self.context['request'].user
        

        work = Work.objects.create(user=user, **validated_data)

        for character_data in characters_data:
            character = Character.objects.filter(**character_data).first()
            if character:
                work.characters.add(character)
            # TODO return error if data doesn't exist
        if 'relationships' in validated_data:
            relationships_data = validated_data.pop('relationships')
            for relationship_data in relationships_data:
                relationship, _ = Relationship.objects.get_or_create(**relationship_data)
                work.relationships.add(relationship)
            # TODO return error if data doesn't exist

        for category_data in categories_data:
            category = Category.objects.filter(**category_data).first()
            if category:
                work.categories.add(category)
            # TODO return error if data doesn't exist    
        
        for warning_data in warnings_data:
            warning = Warning.objects.filter(**warning_data).first()
            if warning:
                work.warnings.add(warning)
            # TODO return error if data doesn't exist
        
        for fandom_data in fandoms_data:
            fandom = Fandom.objects.filter(**fandom_data).first()
            if fandom:
                work.fandoms.add(fandom)
            # TODO return error if data doesn't exist

        return work


    def update(self, instance, validated_data):
        characters_data = validated_data.pop('characters')
        categories_data = validated_data.pop('categories')
        warnings_data = validated_data.pop('warnings')
        fandoms_data = validated_data.pop('fandoms')
        user = self.context['request'].user

        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.completed = validated_data.get('completed', instance.completed)
        instance.rating = validated_data.get('rating', instance.rating)
        instance.save()
        
        instance.relationships.clear()
        if 'relationships' in validated_data:
            relationships_data = validated_data.pop('relationships')
            for relationship_data in relationships_data:
                relationship, _ = Relationship.objects.get_or_create(**relationship_data)
                instance.relationships.add(relationship)
        
        instance.characters.clear()
        for character_data in characters_data:
            character = Character.objects.filter(**character_data).first()
            if character:
                instance.characters.add(character)
        
        instance.categories.clear()
        for category_data in categories_data:
            category = Category.objects.filter(**category_data).first()
            if category:
                instance.categories.add(category)
        
        instance.warnings.clear()
        for warning_data in warnings_data:
            warning = Warning.objects.filter(**warning_data).first()
            if warning:
                instance.warnings.add(warning)
        
        instance.fandoms.clear()
        for fandom_data in fandoms_data:
            fandom = Fandom.objects.filter(**fandom_data).first()
            if fandom_data:
                instance.fandoms.add(fandom)

        return instance


class WorkReadOnlySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=True)
    relationships = RelationshipSerializer(many=True, required=False)
    characters = CharacterSerializer(many=True, required=False)
    categories = CategorySerializer(many=True, required=False)
    warnings = WarningSerializer(many=True, required=False)
    fandoms = FandomSerializer(many=True, required=False)
    user = UserSerializer(read_only=True, default=serializers.CurrentUserDefault())
    num_likes = serializers.IntegerField(source='likes.count', required=False)
    num_bookmarks = serializers.IntegerField(source='bookmarks.count', required=False)
   
    class Meta:
        ordering = ['-date_modified']
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
            'completed',
            'date_created',
            'date_modified',
            'fandoms',
            'num_likes',
            'num_bookmarks',
        )
        extra_kwargs = {
            'user': {'read_only': True},
            'category': {'read_only': True},
            'title': {'required': False},
            'description': {'required': False},
            'relationships': {'required': False},
            'characters': {'required': False},
            'categories': {'required': False},
            'warnings': {'required': False},
            'rating': {'required': False},
            'completed': {'required': False},
            'date_created': {'required': False},
            'date_modified': {'required': False},
            'fandoms': {'required': False},
            'num_likes': {'required': False},
            'num_bookmarks': {'required': False},
        }

class BookmarkSerializer(serializers.ModelSerializer):
    work = WorkReadOnlySerializer()
    user = UserSerializer(read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        # ordering = ['-id']
        model = Bookmark
        fields = (
            'id',
            'user',
            'work',
        )
        validators = []

    def validate(self, attrs):
        return attrs        
    
    def create(self, validated_data):
        work_data = validated_data.get('work')
        user = self.context['request'].user
        work = Work.objects.filter(id=work_data['id']).first()
        bookmark, _ = Bookmark.objects.get_or_create(user=user, work=work)
        return bookmark
        

