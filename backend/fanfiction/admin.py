from os import name
from django.contrib import admin
from .models import User, Work, Chapter, Category, Warning, FandomCategory, Fandom, Relationship, Character, Bookmark, Like

# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username')

class WorkAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user', 'date_created', 'completed')

class ChapterAdmin(admin.ModelAdmin):
    list_display = ('work', 'title', 'get_user',)

    def get_user(self, obj):
        return obj.work.user

    get_user.short_description = 'user'
    get_user.admin_order_field = 'work__user'

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

class WarningAdmin(admin.ModelAdmin):
    list_display = ('name',)

class FandomCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

class FandomAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')

class RelationshipAdmin(admin.ModelAdmin):
    list_display = ('name',)

class CharacterAdmin(admin.ModelAdmin):
    list_display = ('name', 'fandom')

class BookmarkAdmin(admin.ModelAdmin):
    list_display = ('user', 'work')

class LikeAdmin(admin.ModelAdmin):
    list_display = ('user', 'work')


admin.site.register(User, UserAdmin)
admin.site.register(Work, WorkAdmin)
admin.site.register(Chapter, ChapterAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Warning, WarningAdmin)
admin.site.register(FandomCategory, FandomCategoryAdmin)
admin.site.register(Fandom, FandomAdmin)
admin.site.register(Relationship, RelationshipAdmin)
admin.site.register(Character, CharacterAdmin)
admin.site.register(Bookmark, BookmarkAdmin)
admin.site.register(Like, LikeAdmin)
