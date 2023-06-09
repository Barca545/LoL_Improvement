"""
URL configuration for LoL_app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from core.views import front

#issue with refreshing does not appear to be react-router issue
#likely caused by the issue here: 
# https://stackoverflow.com/questions/33221473/404-page-not-found-using-django-react-router

urlpatterns = [
    path("", front, name="front"),
    path('', include('users.urls')),
    path('', include('cs_stracker.urls')),
    path('admin/', admin.site.urls), 
    path('token/', 
        jwt_views.TokenObtainPairView.as_view(), 
        name ='token_obtain_pair'),
    path('token/refresh/', 
        jwt_views.TokenRefreshView.as_view(), 
        name ='token_refresh'),

]

