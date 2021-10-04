from re import T
from django.contrib.auth.models import User
from django.http import response
from django.test import TestCase, Client
from .models import FandomCategory, User, Fandom, Character, Relationship, Warning, Category, Work, Chapter
from .serializers import (FandomCategorySerializer, FandomSerializer, CharacterSerializer, WorkSerializer,
RelationshipSerializer, WarningSerializer, CategorySerializer, ChapterSerializer)
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

    def works(self):
        self.music = FandomCategory.objects.create(name='Music')
        self.literature = FandomCategory.objects.create(name='Literature')
        self.sherlock = Fandom.objects.create(name='Sherlock', category=self.literature)
        self.sherlock_holmes = Character.objects.create(name = "Sherlock Holmes", fandom = self.sherlock)
        self.john_watson = Character.objects.create(name = 'John Watson', fandom = self.sherlock)
        self.irene_adler = Character.objects.create(name = 'Irene Adler', fandom = self.sherlock)
        self.sherlock_john = Relationship.objects.create(name = 'Sherlock Holmes/John Watson')
        self.sherlock_irene = Relationship.objects.create(name = 'Sherlock Holmes/Irene Adler')

        self.bts = Fandom.objects.create(name='BTS', category=self.music)
        self.jeon_jungkook = Character.objects.create(name='Jeon Jungkook', fandom = self.bts)
        self.kim_namjoon = Character.objects.create(name='Kim Namjoon | RM', fandom = self.bts)
        self.min_yoongi = Character.objects.create(name='Min Yoongi | Suga', fandom = self.bts)
        self.jungkook_namjoon = Relationship.objects.create(name = 'Jeon Jungkook/Kim Namjoon')
        self.namjoon_yoongi = Relationship.objects.create(name = 'Kim Namjoon/Min Yoongi')
        
        self.underage = Warning.objects.create(name='UNDERAGE')
        self.rape_noncon = Warning.objects.create(name='RAPE_NONCON')
        self.no_warnings = Warning.objects.create(name='NO_WARNINGS_APPLY')
        self.character_death = Warning.objects.create(name='MAJOR_CHARACTER_DEATH')
        self.violence = Warning.objects.create(name='VIOLENCE')
        self.choose_no_warnings = Warning.objects.create(name='CHOOSE_NOT_TO_USE_WARNINGS')

        self.other = Category.objects.create(name='OTHER')
        self.multy = Category.objects.create(name='MULTY')
        self.mm = Category.objects.create(name='MM')
        self.gen = Category.objects.create(name='GEN')
        self.fm = Category.objects.create(name='FM')
        self.ff = Category.objects.create(name='FF')

        self.work1 = Work.objects.create(
            user=self.user1, 
            title='Volutpat est velit egestas dui id ornare', 
            description='Fermentum leo vel orci porta. Id aliquet lectus proin nibh nisl condimentum id venenatis. Viverra aliquet eget sit amet tellus cras adipiscing. Sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis.',
            completed=False,
            rating = 'TEEN_AND_UP',
        )

        # self.work1.user = self.user1
        self.work1.fandoms.add(self.sherlock)
        self.work1.warnings.add(self.violence)
        self.work1.categories.add(self.fm)
        self.work1.characters.add(self.sherlock_holmes, self.irene_adler, self.john_watson)
        self.work1.relationships.add(self.sherlock_irene)
        self.work1.save()

        self.work2 = Work.objects.create(
            user=self.user2,
            title='Tempus urna et pharetra pharetra massa massa',
            description='Est ante in nibh mauris. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan.',
            completed=False,
            rating='GENERAL_AUDIENCES',
        )

        self.work1.fandoms.add(self.bts)
        self.work1.warnings.add(self.no_warnings)
        self.work1.categories.add(self.mm)
        self.work1.characters.add(self.jeon_jungkook, self.kim_namjoon, self.min_yoongi)
        self.work1.relationships.add(self.jungkook_namjoon)
        self.work1.save()

    def chapters(self):
        self.works()
        self.chapter1_work1 = Chapter.objects.create(
            title = 'Chapter 1',
            text = """
                Tempus urna et pharetra pharetra massa massa. Est ante in nibh mauris. Amet mattis vulputate enim nulla 
                aliquet porttitor lacus luctus accumsan. Volutpat lacus laoreet non curabitur. Urna cursus eget nunc 
                scelerisque viverra mauris in aliquam sem. Non consectetur a erat nam. Bibendum enim facilisis gravida 
                neque convallis. Tortor consequat id porta nibh venenatis cras. Vivamus at augue eget arcu. Id faucibus 
                nisl tincidunt eget nullam. Ut placerat orci nulla pellentesque dignissim enim sit amet. Facilisis volutpat 
                est velit egestas dui id. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Sed 
                lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Iaculis eu non diam phasellus 
                vestibulum. Turpis in eu mi bibendum neque. Ullamcorper sit amet risus nullam. 
            """,
            work = self.work1
        )
        self.chapter1_work1.save()

        self.chapter2_work1 = Chapter.objects.create(
            title = 'Chapter 2',
            text = """
                Consectetur lorem donec massa sapien. Est pellentesque elit ullamcorper dignissim. Purus sit amet luctus 
                venenatis lectus magna fringilla. Turpis in eu mi bibendum. At risus viverra adipiscing at. Amet purus gravida 
                quis blandit turpis cursus. Felis donec et odio pellentesque diam volutpat commodo sed egestas. Rhoncus dolor 
                purus non enim praesent elementum facilisis leo. Dolor magna eget est lorem. Ut aliquam purus sit amet luctus. 
                Augue interdum velit euismod in pellentesque massa placerat duis. Nibh tortor id aliquet lectus proin nibh nisl 
                condimentum. Aliquet bibendum enim facilisis gravida. Vel quam elementum pulvinar etiam. In fermentum posuere urna 
                nec. Sed tempus urna et pharetra. 
            """,
            work = self.work1
        )
        self.chapter2_work1.save()

        self.chapter1_work2 = Chapter.objects.create(
            title = 'Chapter 1',
            text = """
                Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget. Libero volutpat sed cras ornare 
                arcu dui vivamus arcu. Mauris pellentesque pulvinar pellentesque habitant morbi tristique. Amet aliquam id 
                diam maecenas ultricies. Volutpat maecenas volutpat blandit aliquam. Vel facilisis volutpat est velit egestas. 
                Mauris ultrices eros in cursus turpis. Nec feugiat nisl pretium fusce id velit ut. Sit amet nisl purus in 
                mollis nunc sed id. Odio ut enim blandit volutpat maecenas volutpat. 
            """,
            work = self.work2
        )
        self.chapter1_work2.save()

    



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
        self.underage = Warning.objects.create(name='UNDERAGE')
        self.rape_noncon = Warning.objects.create(name='RAPE_NONCON')
        self.no_warnings = Warning.objects.create(name='NO_WARNINGS_APPLY')
        self.character_death = Warning.objects.create(name='MAJOR_CHARACTER_DEATH')
        self.violence = Warning.objects.create(name='VIOLENCE')
        self.choose_no_warnings = Warning.objects.create(name='CHOOSE_NOT_TO_USE_WARNINGS')

        
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
        self.other = Category.objects.create(name='OTHER')
        self.multy = Category.objects.create(name='MULTY')
        self.mm = Category.objects.create(name='MM')
        self.gen = Category.objects.create(name='GEN')
        self.fm = Category.objects.create(name='FM')
        self.ff = Category.objects.create(name='FF')

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


class WorkTest(MyTestCase):
    def setUp(self):
        super().setUp()
        
    def test_create_work(self):
        self.works()
        title = 'Dignissim cras tincidunt lobortis feugiat vivamus at augue eget'
        description = """Facilisi morbi tempus iaculis urna id volutpat lacus. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Arcu felis bibendum ut tristique et egestas quis ipsum suspendisse. Neque laoreet suspendisse interdum consectetur libero id faucibus.
        """
        token = self.login('user1', '1111')
        json_data = {
            "title": title, 
            "description": description, 
            "fandoms": [
                {"name": self.sherlock.name, "category": self.sherlock.category.id}
            ],
            "rating": "TEEN_AND_UP", 
            "completed": False, 
            "relationships": [
                {"name": self.sherlock_irene.name}
            ],
            "characters": [
                {"name":self.irene_adler.name, "fandom":self.irene_adler.fandom.id}, 
                {"name": self.sherlock_holmes.name, "fandom":self.sherlock_holmes.fandom.id}, 
                {"name":self.john_watson.name, "fandom":self.john_watson.fandom.id}
            ],
            "categories": [{"name": self.fm.name},],
            "warnings": [{"name": "NO_WARNINGS_APPLY"}],
        }
        response = client.post(
            "/api/works/",
            json_data,
            content_type = 'application/json',
            HTTP_AUTHORIZATION=token,
        )
        
        self.assertEqual(response.data['title'], json_data['title'])
        self.assertIn(response.data['description'], json_data['description'])
        self.assertEqual(response.data['fandoms'], FandomSerializer([self.sherlock], many=True).data)
        self.assertEqual(response.data['rating'], json_data['rating'])
        self.assertEqual(response.data['completed'], json_data['completed'])
        self.assertEqual(response.data['relationships'], RelationshipSerializer([self.sherlock_irene], many=True).data)
        self.assertEqual(response.data['characters'], CharacterSerializer([self.sherlock_holmes, self.john_watson, self.irene_adler], many=True).data)
        self.assertEqual(response.data['categories'], CategorySerializer([self.fm], many=True).data)
        self.assertEqual(response.data['warnings'], WarningSerializer([self.no_warnings], many=True).data)

    def test_get_all_works_without_token(self):
        self.works()
        response = client.get(
            '/api/works/',
        )

        works = [self.work1, self.work2]
        serializer = WorkSerializer(works, many=True)
        self.assertEqual(response.data['results'], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_all_works_with_token(self):
        self.works()
        token = token = self.login('user1', '1111')
        response = client.get(
            '/api/works/',
            HTTP_AUTHORIZATION=token
        )

        works = [self.work1, self.work2]
        serializer = WorkSerializer(works, many=True)
        self.assertEqual(response.data['results'], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_work_by_id(self):
        self.works()
        token = self.login('user1', '1111')
        response = client.get(
            f"/api/works/{self.work1.id}/",
            HTTP_AUTHORIZATION=token
        )
        work = self.work1
        serializer = WorkSerializer(work)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_work_by_wrong_id(self):
        token = self.login('user1', '1111')
        response = client.get(
            f"/api/works/10/",
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        
    def test_edit_work(self):
        self.works()
        token = self.login('user1', '1111')
        description = """Facilisi morbi tempus iaculis urna id volutpat lacus. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Arcu felis bibendum ut tristique et egestas quis ipsum suspendisse. Neque laoreet suspendisse interdum consectetur libero id faucibus.
        """
        json_data = {
            "title": "Volutpat est velit egestas dui id ornare", 
            "description": description, 
            "fandoms": [
                {"name": self.sherlock.name, "category": self.sherlock.category.id}
            ],
            "rating": "TEEN_AND_UP", 
            "completed": True, 
            "relationships": [
                {"name": self.sherlock_irene.name}
            ],
            "characters": [
                {"name":self.irene_adler.name, "fandom":self.irene_adler.fandom.id}, 
                {"name": self.sherlock_holmes.name, "fandom":self.sherlock_holmes.fandom.id}, 
                {"name":self.john_watson.name, "fandom":self.john_watson.fandom.id}
            ],
            "categories": [{"name": self.fm.name},],
            "warnings": [{"name": "VIOLENCE"}],
        }
        response = client.put(
            f"/api/works/{self.work1.id}/",
            json_data,
            content_type = 'application/json',
            HTTP_AUTHORIZATION=token
        )
        
        self.assertEqual(response.data['completed'], json_data['completed'])
        self.assertEqual(response.data['warnings'], WarningSerializer([self.violence], many=True).data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_work_with_wrong_token(self):
        self.works()
        token = self.login('user2', '1111')
        description = """Facilisi morbi tempus iaculis urna id volutpat lacus. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Arcu felis bibendum ut tristique et egestas quis ipsum suspendisse. Neque laoreet suspendisse interdum consectetur libero id faucibus.
        """
        json_data = {
            "title": "Volutpat est velit egestas dui id ornare", 
            "description": description, 
            "fandoms": [
                {"name": self.sherlock.name, "category": self.sherlock.category.id}
            ],
            "rating": "TEEN_AND_UP", 
            "completed": True, 
            "relationships": [
                {"name": self.sherlock_irene.name}
            ],
            "characters": [
                {"name":self.irene_adler.name, "fandom":self.irene_adler.fandom.id}, 
                {"name": self.sherlock_holmes.name, "fandom":self.sherlock_holmes.fandom.id}, 
                {"name":self.john_watson.name, "fandom":self.john_watson.fandom.id}
            ],
            "categories": [{"name": self.fm.name},],
            "warnings": [{"name": "VIOLENCE"}],
        }
        response = client.put(
            f"/api/works/{self.work1.id}/",
            json_data,
            content_type = 'application/json',
            HTTP_AUTHORIZATION=token
        )
        
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_edit_work_without_token(self):
        self.works()
        description = """Facilisi morbi tempus iaculis urna id volutpat lacus. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Arcu felis bibendum ut tristique et egestas quis ipsum suspendisse. Neque laoreet suspendisse interdum consectetur libero id faucibus.
        """
        json_data = {
            "title": "Volutpat est velit egestas dui id ornare", 
            "description": description, 
            "fandoms": [
                {"name": self.sherlock.name, "category": self.sherlock.category.id}
            ],
            "rating": "TEEN_AND_UP", 
            "completed": True, 
            "relationships": [
                {"name": self.sherlock_irene.name}
            ],
            "characters": [
                {"name":self.irene_adler.name, "fandom":self.irene_adler.fandom.id}, 
                {"name": self.sherlock_holmes.name, "fandom":self.sherlock_holmes.fandom.id}, 
                {"name":self.john_watson.name, "fandom":self.john_watson.fandom.id}
            ],
            "categories": [{"name": self.fm.name},],
            "warnings": [{"name": "VIOLENCE"}],
        }
        response = client.put(
            f"/api/works/{self.work1.id}/",
            json_data,
            content_type = 'application/json',
        )
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)    

    def test_delete_work_without_token(self):
        self.works()
        response = client.delete(f"/api/works/{self.work1.id}/")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_work_with_wrong_token(self):
        self.works()
        token = self.login('user2', '1111')
        response = client.delete(
            f"/api/works/{self.work1.id}/",
            HTTP_AUTHORIZATION=token
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_work(self):
        self.works()
        token = self.login('user1', '1111')
        response = client.delete(
            f"/api/works/{self.work1.id}/",
            HTTP_AUTHORIZATION=token
        )

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class ChapterTest(MyTestCase):
    def setUp(self):
        super().setUp()

    def test_create_chapter(self):
        self.works()
        token = self.login('user1', '1111')
        json_data = {
            "title": "Chapter 1",
            "text": """
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
                aliqua. Scelerisque felis imperdiet proin fermentum leo. Viverra ipsum nunc aliquet bibendum enim facilisis gravida. 
                Nunc lobortis mattis aliquam faucibus purus in. Et leo duis ut diam quam nulla porttitor massa. 
                Ligula ullamcorper malesuada proin libero nunc consequat interdum. Volutpat est velit egestas dui id ornare. 
                Fermentum leo vel orci porta. Id aliquet lectus proin nibh nisl condimentum id venenatis. 
                Viverra aliquet eget sit amet tellus cras adipiscing. 
            """,
            "work": self.work1.id
        }
        response = client.post(
            "/api/chapters/",
            json_data,
            content_type = 'application/json',
            HTTP_AUTHORIZATION=token
        )

        self.assertEqual(response.data['title'], json_data['title'])
        self.assertIn(response.data['text'], json_data['text'])
        self.assertEqual(response.data['work'], json_data['work'])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_create_chapter_without_token(self):
        self.works()
        json_data = {
            "title": "Chapter 1",
            "text": """
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
                aliqua. Scelerisque felis imperdiet proin fermentum leo. Viverra ipsum nunc aliquet bibendum enim facilisis gravida. 
                Nunc lobortis mattis aliquam faucibus purus in. Et leo duis ut diam quam nulla porttitor massa. 
                Ligula ullamcorper malesuada proin libero nunc consequat interdum. Volutpat est velit egestas dui id ornare. 
                Fermentum leo vel orci porta. Id aliquet lectus proin nibh nisl condimentum id venenatis. 
                Viverra aliquet eget sit amet tellus cras adipiscing. 
            """,
            "work": self.work1.id
        }
        response = client.post(
            "/api/chapters/",
            json_data,
            content_type = 'application/json',
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_chapter_not_owner(self):
        self.works()
        token = self.login('user2', '1111')
        json_data = {
            "title": "Chapter 1",
            "text": """
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
                aliqua. Scelerisque felis imperdiet proin fermentum leo. Viverra ipsum nunc aliquet bibendum enim facilisis gravida. 
                Nunc lobortis mattis aliquam faucibus purus in. Et leo duis ut diam quam nulla porttitor massa. 
                Ligula ullamcorper malesuada proin libero nunc consequat interdum. Volutpat est velit egestas dui id ornare. 
                Fermentum leo vel orci porta. Id aliquet lectus proin nibh nisl condimentum id venenatis. 
                Viverra aliquet eget sit amet tellus cras adipiscing. 
            """,
            "work": self.work1.id
        }
        response = client.post(
            "/api/chapters/",
            json_data,
            content_type = 'application/json',
            HTTP_AUTHORIZATION=token
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_all_chapters_without_token(self):
        self.works()
        self.chapters()

        chapters = [self.chapter1_work1, self.chapter2_work1, self.chapter1_work2]
        serializer = ChapterSerializer(chapters, many=True)

        response = client.get(
            '/api/chapters/'
        )

        self.assertEqual(response.data['results'], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_all_chapters(self):
        self.works()
        self.chapters()
        token = self.login('user2', '1111')

        chapters = [self.chapter1_work1, self.chapter2_work1, self.chapter1_work2]
        serializer = ChapterSerializer(chapters, many=True)

        response = client.get(
            '/api/chapters/',
            HTTP_AUTHORIZATION=token
        )

        self.assertEqual(response.data['results'], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_chapter_by_id(self):
        self.works()
        self.chapters()
        token = self.login('user2', '1111')

        serializer = ChapterSerializer(self.chapter1_work1)

        response = client.get(
            f'/api/chapters/{self.chapter1_work1.id}/',
            HTTP_AUTHORIZATION=token
        )

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_get_chapter_by_id_without_token(self):
        self.works()
        self.chapters()

        serializer = ChapterSerializer(self.chapter1_work1)

        response = client.get(
            f'/api/chapters/{self.chapter1_work1.id}/',
        )

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    
    def test_edit_chapter(self):
        self.works()
        self.chapters()
        token = self.login('user1', '1111')
        json_data = {
            "title": "Chapter 1 edited",
            "text": """
                Tempus urna et pharetra pharetra massa massa. Est ante in nibh mauris. Amet mattis vulputate enim nulla 
                aliquet porttitor lacus luctus accumsan. Volutpat lacus laoreet non curabitur. Urna cursus eget nunc 
                scelerisque viverra mauris in aliquam sem. Non consectetur a erat nam. Bibendum enim facilisis gravida 
                neque convallis. Tortor consequat id porta nibh venenatis cras. Vivamus at augue eget arcu. Id faucibus 
                nisl tincidunt eget nullam. Ut placerat orci nulla pellentesque dignissim enim sit amet. Facilisis volutpat 
                est velit egestas dui id. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Sed 
                lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Iaculis eu non diam phasellus 
                vestibulum. Turpis in eu mi bibendum neque. Ullamcorper sit amet risus nullam. 
            """,
            "work": self.work1.id
        }

        response = client.put(
            f"/api/chapters/{self.chapter1_work1.id}/",
            json_data,
            content_type = 'application/json',
            HTTP_AUTHORIZATION=token
        )

        self.assertEqual(response.data['title'], json_data['title'])
        self.assertIn(response.data['text'], json_data['text'])
        self.assertEqual(response.data['work'], json_data['work'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_chapter_not_owner(self):
        self.works()
        self.chapters()
        token = self.login('user2', '1111')
        json_data = {
            "title": "Chapter 1 edited",
            "text": """
                Tempus urna et pharetra pharetra massa massa. Est ante in nibh mauris. Amet mattis vulputate enim nulla 
                aliquet porttitor lacus luctus accumsan. Volutpat lacus laoreet non curabitur. Urna cursus eget nunc 
                scelerisque viverra mauris in aliquam sem. Non consectetur a erat nam. Bibendum enim facilisis gravida 
                neque convallis. Tortor consequat id porta nibh venenatis cras. Vivamus at augue eget arcu. Id faucibus 
                nisl tincidunt eget nullam. Ut placerat orci nulla pellentesque dignissim enim sit amet. Facilisis volutpat 
                est velit egestas dui id. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Sed 
                lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Iaculis eu non diam phasellus 
                vestibulum. Turpis in eu mi bibendum neque. Ullamcorper sit amet risus nullam. 
            """,
            "work": self.work1.id
        }

        response = client.put(
            f"/api/chapters/{self.chapter1_work1.id}/",
            json_data,
            content_type = 'application/json',
            HTTP_AUTHORIZATION=token
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_edit_chapter_without_token(self):
        self.works()
        self.chapters()
        json_data = {
            "title": "Chapter 1 edited",
            "text": """
                Tempus urna et pharetra pharetra massa massa. Est ante in nibh mauris. Amet mattis vulputate enim nulla 
                aliquet porttitor lacus luctus accumsan. Volutpat lacus laoreet non curabitur. Urna cursus eget nunc 
                scelerisque viverra mauris in aliquam sem. Non consectetur a erat nam. Bibendum enim facilisis gravida 
                neque convallis. Tortor consequat id porta nibh venenatis cras. Vivamus at augue eget arcu. Id faucibus 
                nisl tincidunt eget nullam. Ut placerat orci nulla pellentesque dignissim enim sit amet. Facilisis volutpat 
                est velit egestas dui id. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Sed 
                lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Iaculis eu non diam phasellus 
                vestibulum. Turpis in eu mi bibendum neque. Ullamcorper sit amet risus nullam. 
            """,
            "work": self.work1.id
        }

        response = client.put(
            f"/api/chapters/{self.chapter1_work1.id}/",
            json_data,
            content_type = 'application/json',
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_chapter_not_owner(self):
        self.works()
        self.chapters()
        token = self.login('user1', '1111')

        response = client.delete(
            f"/api/chapters/{self.chapter1_work2.id}/",
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_chapter_without_token(self):
        self.works()
        self.chapters()

        response = client.delete(
            f"/api/chapters/{self.chapter1_work2.id}/",
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_chapter(self):
        self.works()
        self.chapters()
        token = self.login('user1', '1111')

        response = client.delete(
            f"/api/chapters/{self.chapter2_work1.id}/",
            HTTP_AUTHORIZATION=token
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)