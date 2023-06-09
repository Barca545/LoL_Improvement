from django.db import models

#these models need to be updated

class CSData(models.Model):
    frame = models.CharField(max_length=60)
    cs = models.CharField(max_length=500)
    delta_cs = models.CharField(max_length=150)
    match_id = models.CharField(max_length=150)
    
    def __str__(self):
        return self.title
    
class Player(models.Model):
    summoner_name = models.CharField(max_length=60)
    region = models.CharField(max_length=60,default='na1')
    
    def __str__(self):
        return self.title
