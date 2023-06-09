from django.urls import path
from . import views

#I might be missing a url pattern because refreshing a page throws me to an error message
urlpatterns =[
    path("cs_data/", views.cs_data, name="cs_data"),
    path("cs_data/<str:match_id>", views.cs_data_detail, name="cs_data_detail"), #used to say "detail, is that ok?"
    path("player/", views.player, name="player"),
    path("player/<str:match_id>", views.player_detail, name="player_detail"),#used to say "detail, is that ok?"
    #All of the above may be unnecesary
    path("matchlist/<summoner_name>/<region>/<number>/", views.matchlist, name="matchlist"),
    path("cs_details/<match_id>/<puuid>/<region>/<type>/", views.problem_delta_cs, name="problem_delta_cs"),
]