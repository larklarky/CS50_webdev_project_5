from django.urls import path, include, re_path
from rest_framework import routers
from rest_framework import viewsets
from rest_framework.authtoken.views import obtain_auth_token
from . import views

router = routers.DefaultRouter()
router.register('users', views.UserView, 'user')
router.register('works', views.WorkView, 'work')
router.register('chapters', views.ChapterView, 'chapter')
router.register('categories', views.CategoryView, 'category')
router.register('warnings', views.WarningView, 'warning')
router.register('fandom_categories', views.FandomCategoryView, 'fandom_category')
router.register('fandoms', views.FandomView, 'fandom')
router.register('relationships', views.RelationshipView, 'relationship')
router.register('characters', views.CharacterView, 'character')
router.register('bookmarks', views.BookmarkView, 'bookmark')
router.register('likes', views.LikeView, 'like')

urlpatterns = [
    path(r'', include(router.urls)),
    path('token/', obtain_auth_token, name='token'),
    path('registration/', views.RegistrationView.as_view(), name='registration'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    # path('users_current/', views.CurrentUserView.as_view(), name='current_user'),
]
