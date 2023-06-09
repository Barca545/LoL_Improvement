from rest_framework import serializers
from .models import * #specify in final build

class CSDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSData
        fields = ('id', 'cs', 'delta_cs','match_id')

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('summoner_name')       