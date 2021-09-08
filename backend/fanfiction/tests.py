from django.contrib.auth.models import User
from django.http import response
from django.test import TestCase, Client
from .models import FandomCategory, User, Fandom, Character
from .serializers import FandomCategorySerializer, FandomSerializer, CharacterSerializer
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
            f'/api/fandoms/{self.sherlock_holmes.id}/',
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
