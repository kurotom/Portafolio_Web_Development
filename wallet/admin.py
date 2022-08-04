from django.contrib import admin

from .models import User, mywallet, ops

# Register your models here.

admin.site.register(User)
admin.site.register(mywallet)
admin.site.register(ops)
