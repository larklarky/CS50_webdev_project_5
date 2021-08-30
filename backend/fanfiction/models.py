from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.deletion import CASCADE
# Create your models here.

class User(AbstractUser):
    pass

def __str__(self) -> str:
        return f'{self.username}'


class Work(models.Model):
    NOT_RATED = 'NOT_RATED'
    GENERAL_AUDIENCES = 'GENERAL_AUDIENCES'
    TEEN_AND_UP_AUDIENCES = 'TEEN_AND_UP'
    MATURE = 'MATURE'
    EXPLICIT = 'EXPLICIT'

    RATING_CHOICES = [ 
        (NOT_RATED, 'Not Rated'),
        (GENERAL_AUDIENCES, 'General Audiences'),
        (TEEN_AND_UP_AUDIENCES, 'Teen And Up Audiences'),
        (MATURE, 'Mature'),
        (EXPLICIT, 'Explicit'),
    ]


    user = models.ForeignKey('User', related_name='works', on_delete=models.CASCADE)
    title = models.CharField(max_length = 500, blank = False)
    description = models.TextField(blank=False)
    rating = models.CharField(max_length=30, choices=RATING_CHOICES)
    completed = models.BooleanField(default=False)
    
    date_created = models.DateTimeField(auto_now_add = True)
    date_modified = models.DateTimeField(auto_now = True)

    relationships = models.ManyToManyField('Relationship')
    characters = models.ManyToManyField('Character')
    categories = models.ManyToManyField('Category')
    warnings = models.ManyToManyField('Warning')
    fandoms = models.ManyToManyField('Fandom')
    

    def __str__(self) -> str:
        return f'{self.title}'


class Chapter(models.Model):
    title = models.CharField(max_length=400)
    text = models.TextField()
    work = models.ForeignKey('Work', on_delete=models.CASCADE, related_name='chapters')
    date_created = models.DateTimeField(auto_now_add = True)
    date_modified = models.DateTimeField(auto_now = True)

    def __str__(self) -> str:
        return f'{self.title}'


class Category(models.Model):
    FEMALE_FEMALE = 'FF'
    FEMALE_MALE = 'FM'
    GEN = 'GEN'
    MALE_MALE = 'MM'
    MULTY = 'MULTY'
    OTHER = 'OTHER'
    CATEGORIES_CHOICES = [
        (FEMALE_FEMALE, 'F/F'),
        (FEMALE_MALE, 'F/M'),
        (GEN, 'Gen'),
        (MALE_MALE, 'M/M'),
        (MULTY, 'Multy'),
        (OTHER, 'Other'),
    ]

    name = models.CharField(max_length=10, choices=CATEGORIES_CHOICES)

    def __str__(self) -> str:
        return f'{self.name}'

class Warning(models.Model):
    NO_WARNINGS = 'NO_WARNINGS_APPLY'
    VIOLENCE = 'VIOLENCE'
    MAJOR_CHARACTER_DEATH = 'MAIN_CHARACTER_DEATH'
    CHOOSE_NOT_TO_USE_WARNINGS = 'CHOOSE_NOT_TO_USE_WARNINGS'
    RAPE_NONCON = 'RAPE_NONCON'
    UNDERAGE = 'UNDERAGE'

    WARNINGS_CHOICES = [
        (CHOOSE_NOT_TO_USE_WARNINGS, 'Choose Not To Use Warnings'),
        (VIOLENCE, 'Graphic Depictions Of Violence'),
        (MAJOR_CHARACTER_DEATH, 'Major Character Death'),
        (NO_WARNINGS, 'No Warnings Apply'),
        (RAPE_NONCON, 'Rape/Non-Con'),
        (UNDERAGE, 'Underage'),
    ]
    
    name = models.CharField(max_length=50, choices=WARNINGS_CHOICES)

    def __str__(self) -> str:
        return f'{self.name}'


class FandomCategory(models.Model):
    name = models.CharField(max_length=200, blank=False)

    def __str__(self) -> str:
        return f'{self.name}'


class Fandom(models.Model):
    name = models.CharField(max_length=300, blank=False)
    category = models.ForeignKey('FandomCategory', on_delete=models.CASCADE, related_name='fandoms')

    def __str__(self) -> str:
        return f'{self.name}'


class Relationship(models.Model):
    name = models.CharField(max_length=300, blank=False)

    def __str__(self) -> str:
        return f'{self.name}'


class Character(models.Model):
    name = models.CharField(max_length=300, blank=False)
    fandom = models.ForeignKey('Fandom', on_delete=models.CASCADE, related_name='characters')

    def __str__(self) -> str:
        return f'{self.name}'


class Bookmark(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='bookmarks')
    work = models.ForeignKey('Work', on_delete=models.CASCADE, related_name='bookmarks')


class Like(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='likes')
    work = models.ForeignKey('Work', on_delete=models.CASCADE, related_name='likes')
