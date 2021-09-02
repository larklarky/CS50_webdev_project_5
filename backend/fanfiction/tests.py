from django.test import TestCase, Client
from .models import FandomCategory
from .serializers import FandomCategorySerializer
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
