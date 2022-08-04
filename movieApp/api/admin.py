from django.contrib import admin

from .models import Genders, Movies, Sex, Persons

# Register your models here.

admin.site.register(Genders)
admin.site.register(Movies)
admin.site.register(Sex)
admin.site.register(Persons)
