from django.contrib.auth.models import User
from django.http import response
from django.test import TestCase, Client
from .models import FandomCategory, User
from .serializers import FandomCategorySerializer, UserSerializer
from django.urls import reverse
from rest_framework import status


client = Client()

class FandomCategoryTest(TestCase):
    def setUp(self):
        self.music = FandomCategory.objects.create(name='Music')
        self.literature = FandomCategory.objects.create(name='Literature')

    def test_get_fandom_category(self):
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

        response = client.post('/api/token/', {'username': 'user2', 'password': '1111' }, content_type= 'application/json')
        self.assertContains(response, 'token')
        
        token = "Token " + response.data['token']
        response = client.patch(
            '/api/users/' + str(self.user1.id) + '/',
            {'first_name': 'Alex', 'last_name¶': 'DJ'},
            content_type= 'application/json',
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)


