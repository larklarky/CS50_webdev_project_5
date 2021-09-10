from django.contrib.auth.models import User
from django.http import response
from django.test import TestCase, Client
from .models import FandomCategory, User, Fandom, Character, Relationship, Warning, Category
from .serializers import (FandomCategorySerializer, FandomSerializer, CharacterSerializer, 
RelationshipSerializer, WarningSerializer, CategorySerializer)
from django.urls import reverse
from rest_framework import status


client = Client()

class MyTestCase(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='user1', password='1111', email='user1@mail.com')
        self.user2 = User.objects.create_user(username='user2', password='1111', email='user2@mail.com')

    def login(self, username, password):
        response = client.post('/api/token/', {'username': username, 'password': password }, content_type= 'application/json')
        token = "Token " + response.data['token']
        return token

class FandomCategoryTest(MyTestCase):
    def setUp(self):
        super().setUp()

        self.music = FandomCategory.objects.create(name='Music')
        self.literature = FandomCategory.objects.create(name='Literature')

    def test_get_fandom_category_from_db(self):
        music_category = FandomCategory.objects.get(name='Music')
        literature_category = FandomCategory.objects.get(name='Literature')

        self.assertEqual(music_category.name, "Music")
        self.assertEqual(literature_category.name, "Literature")
    
    def test_get_all_fandom_categories(self):
         # get API response
        response = client.get('/api/fandom_categories/')
        # get data from db
        fandom_categories = FandomCategory.objects.all()
        serializer = FandomCategorySerializer(fandom_categories, many=True)

        self.assertEqual(response.data['results'], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], len(serializer.data))

    def test_get_fandom_category(self):
        response = client.get('/api/fandom_categories/'+ str(self.music.id) + '/')
        fandom_category = FandomCategory.objects.get(id=self.music.id)
        serializer = FandomCategorySerializer(fandom_category)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class AuthorizationTest(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='user1', password='1111', email='user1@mail.com')
    
    def test_login(self):
        response = client.put(
            '/api/users/' + str(self.user1.id) + '/',
            {'first_name': 'Alex', 'last_name¶': 'DJ'},
            content_type= 'application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        response = client.post('/api/token/', {'username': 'user1', 'password': '1111' }, content_type= 'application/json')
        self.assertContains(response, 'token')
        
        token = "Token " + response.data['token']
        response = client.patch(
            '/api/users/' + str(self.user1.id) + '/',
            {'first_name': 'Alex', 'last_name¶': 'DJ'},
            content_type= 'application/json',
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_signUp(self):
        response = client.post(
            '/api/registration/', 
            {'username':'user2', 'password':'1111', 'email':'user2@mail.com'}, 
            content_type= 'application/json')

        self.assertContains(response, 'id', status_code=status.HTTP_201_CREATED)
        self.assertEqual(response.data['username'], 'user2')
        self.assertEqual(response.data['email'], 'user2@mail.com')
        user2_id = response.data['id']

        response = client.post('/api/token/', {'username': 'user2', 'password': '1111' }, content_type= 'application/json')
        self.assertContains(response, 'token')
        
        token = "Token " + response.data['token']
        response = client.patch(
            '/api/users/' + str(self.user1.id) + '/',
            {'first_name': 'Alex', 'last_name': 'DJ'},
            content_type= 'application/json',
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = client.patch(
            '/api/users/' + str(user2_id) + '/',
            {'first_name': 'Alex', 'last_name': 'DJ'},
            content_type= 'application/json',
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logout(self):
        response = client.post('/api/token/', {'username': self.user1.username, 'password': '1111' }, content_type= 'application/json')
        self.assertContains(response, 'token')
        
        token = "Token " + response.data['token']
        
        response = client.patch(
            '/api/users/' + str(self.user1.id) + '/',
            {'first_name': 'Alex', 'last_name': 'DJ'},
            content_type= 'application/json',
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = client.delete(
            '/api/logout/',
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        response = client.patch(
            '/api/users/' + str(self.user1.id) + '/',
            {'first_name': 'Alex', 'last_name': 'DJ'},
            content_type= 'application/json',
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class FandomTest(MyTestCase):
    def setUp(self):
        super().setUp()
        self.music = FandomCategory.objects.create(name='Music')
        self.literature = FandomCategory.objects.create(name='Literature')
        self.Sherlock = Fandom.objects.create(name='Sherlock', category=self.literature)
        self.BTS = Fandom.objects.create(name='BTS', category=self.music)
    
    def test_get_all_fandoms(self):
        response = client.get('/api/fandoms/')

        fandoms = [self.Sherlock, self.BTS]
        serializer = FandomSerializer(fandoms, many=True)
        self.assertEqual(response.data['results'], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_fandom_by_id(self):
        response = client.get(
            f'/api/fandoms/{self.Sherlock.id}/'
        )
        self.assertEqual(response.data['id'], self.Sherlock.id)
        self.assertEqual(response.data['name'], self.Sherlock.name)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_fandom_by_wrong_id(self):
        response = client.get(
            f'/api/fandoms/6/'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_edit_fandom(self):
        token = self.login('user1', '1111')
        response = client.patch(
            f'/api/fandoms/{self.Sherlock.id}/',
            {'name': 'Harry Potter',},
            content_type= 'application/json',
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_fandom(self):
        token = self.login('user1', '1111')
        response = client.delete(
            f'/api/fandoms/{self.Sherlock.id}/',
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class CharactersTest(MyTestCase):
    def setUp(self):
        super().setUp()
        self.literature = FandomCategory.objects.create(name='Literature')
        self.Sherlock = Fandom.objects.create(name='Sherlock', category=self.literature)
        self.sherlock_holmes = Character.objects.create(name = "Sherlock Holmes", fandom = self.Sherlock)
        self.john_watson = Character.objects.create(name = 'John Watson', fandom = self.Sherlock)

    def test_get_all_characters(self):
        response = client.get('/api/characters/')

        characters = [self.sherlock_holmes, self.john_watson]
        serializer = CharacterSerializer(characters, many=True)
        self.assertEqual(response.data['results'], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_character_by_id(self):
        response = client.get(
            f'/api/characters/{self.sherlock_holmes.id}/'
        )
        self.assertEqual(response.data['id'], self.sherlock_holmes.id)
        self.assertEqual(response.data['name'], self.sherlock_holmes.name)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_character_by_wrong_id(self):
        response = client.get(
            f'/api/characters/6/'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_edit_character(self):
        token = self.login('user1', '1111')
        response = client.patch(
            f'/api/characters/{self.sherlock_holmes.id}/',
            {'name': 'Harry Potter',},
            content_type= 'application/json',
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_character(self):
        token = self.login('user1', '1111')
        response = client.delete(
            f'/api/characters/{self.sherlock_holmes.id}/',
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class RelationshipTest(MyTestCase):
    def setUp(self):
        super().setUp()
        self.literature = FandomCategory.objects.create(name='Literature')
        self.sherlock = Fandom.objects.create(name='Sherlock', category=self.literature)
        self.sherlock_holmes = Character.objects.create(name = "Sherlock Holmes", fandom = self.sherlock)
        self.john_watson = Character.objects.create(name = 'John Watson', fandom = self.sherlock)
        self.irene_adler = Character.objects.create(name = 'Irene Adler', fandom = self.sherlock)
        self.sherlock_john = Relationship.objects.create(name = 'Sherlock Holmes/John Watson')
        self.sherlock_irene = Relationship.objects.create(name = 'Sherlock Holmes/Irene Adler')

    def test_get_all_relationships(self):
        response = client.get('/api/relationships/')

        relationships = [self.sherlock_john, self.sherlock_irene]
        serializer = RelationshipSerializer(relationships, many=True)
        self.assertEqual(response.data['results'], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_relationship_by_id(self):
        response = client.get(
            f'/api/relationships/{self.sherlock_irene.id}/'
        )
        self.assertEqual(response.data['id'], self.sherlock_irene.id)
        self.assertEqual(response.data['name'], self.sherlock_irene.name)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_relationship_by_wrong_id(self):
        response = client.get(
            f'/api/relationships/6/'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_edit_relationship(self):
        token = self.login('user1', '1111')
        response = client.patch(
            f'/api/relationships/{self.sherlock_irene.id}/',
            {'name': 'Harry Potter/Hermione Granger',},
            content_type= 'application/json',
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_relationship(self):
        token = self.login('user1', '1111')
        response = client.delete(
            f'/api/relationships/{self.sherlock_irene.id}/',
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class WarningTest(MyTestCase):
    def setUp(self):
        super().setUp()
        self.underage = Warning.objects.create(name='Underage')
        self.rape_noncon = Warning.objects.create(name='Rape/Non-Con')
        self.no_warnings = Warning.objects.create(name='No Warnings Apply')
        self.character_death = Warning.objects.create(name='Major Character Death')
        self.violence = Warning.objects.create(name='Graphic Depictions Of Violence')
        self.choose_no_warnings = Warning.objects.create(name='Choose Not To Use Warnings')

        
    def test_get_all_warnings(self):
        response = client.get('/api/warnings/')


        warnings = [self.underage, self.rape_noncon, self.no_warnings, self.character_death, self.violence, self.choose_no_warnings]
        serializer = WarningSerializer(warnings, many=True)
        self.assertEqual(response.data['results'], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_warning_by_id(self):
        response = client.get(
            f'/api/warnings/{self.no_warnings.id}/'
        )
        self.assertEqual(response.data['id'], self.no_warnings.id)
        self.assertEqual(response.data['name'], self.no_warnings.name)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_warning_by_wrong_id(self):
        response = client.get(
            f'/api/warnings/10/'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_edit_warning(self):
        token = self.login('user1', '1111')
        response = client.patch(
            f'/api/warnings/{self.no_warnings.id}/',
            {'name': 'Mary Sue',},
            content_type = 'application/json',
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_warning(self):
        token = self.login('user1', '1111')
        response = client.delete(
            f'/api/warnings/{self.no_warnings.id}/',
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class CategoryTest(MyTestCase):
    def setUp(self):
        super().setUp()
        self.other = Category.objects.create(name='Other')
        self.multy = Category.objects.create(name='Multy')
        self.mm = Category.objects.create(name='M/M')
        self.gen = Category.objects.create(name='Gen')
        self.fm = Category.objects.create(name='F/M')
        self.ff = Category.objects.create(name='F/F')

    def test_get_all_categories(self):
        response = client.get('/api/categories/')


        categories = [self.other, self.multy, self.mm, self.gen, self.fm, self.ff]
        serializer = CategorySerializer(categories, many=True)
        self.assertEqual(response.data['results'], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_category_by_id(self):
        response = client.get(
            f'/api/categories/{self.multy.id}/'
        )
        self.assertEqual(response.data['id'], self.multy.id)
        self.assertEqual(response.data['name'], self.multy.name)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_category_by_wrong_id(self):
        response = client.get(
            f'/api/categories/10/'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_edit_category(self):
        token = self.login('user1', '1111')
        response = client.patch(
            f'/api/categories/{self.multy.id}/',
            {'name': 'Aliens',},
            content_type = 'application/json',
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_category(self):
        token = self.login('user1', '1111')
        response = client.delete(
            f'/api/categories/{self.multy.id}/',
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)