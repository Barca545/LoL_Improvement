from django.urls import path
from .views import *

#add the link to the page from react router here
urlpatterns = [
    path('', front),
    path('cs-tracker', front),
    path('vod-reviews', front),
    path('progress-tracker', front),
]