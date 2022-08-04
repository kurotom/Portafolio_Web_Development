from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import requests
import os

import json
from datetime import datetime

from .models import Genders, Movies, Sex, Persons

# Create your views here.

def index(request):
    return JsonResponse({'ok': 'ok'}, status=201)

def cast(request):
    def formatedInfo(cast_crew, listData, keyApi):
        dataReturn = []
        poster = ''
        for item in listData:
            genero = ''
            personID = item['id']

            if item["profile_path"] == None:
                poster = '/static/coreApp/unkown.png'
            else:
                poster = f'https://image.tmdb.org/t/p/w220_and_h330_face{item["profile_path"]}'

            if cast_crew == 'cast':
                info = {
                    'id': item['id'],
                    'character': item['character'],
                    'name': item['name'],
                    'poster': poster,
                }
            elif cast_crew == 'crew':
                info = {
                    'id': item['id'],
                    'name': item['name'],
                    'poster': poster,
                }
            dataReturn.append(info)

        return dataReturn


    idMovie = int(request.GET['movie'])

    osKeyGetEnv = os.getenv('tmdb')

    urlCast = f'https://api.themoviedb.org/3/movie/{idMovie}/credits?api_key={osKeyGetEnv}&language=en-US'

    peticion = requests.get(urlCast)
    peticion.encoding
    respuesta = peticion.json()

    return JsonResponse({
        'cast': formatedInfo('cast', respuesta['cast'], osKeyGetEnv),
    }, status=200)



def movie(request, id):
    return JsonResponse({'ok': 'movie_ok_API'}, status=200)



def biography(request, personID):

    keyApi = os.getenv('tmdb')

    urlBio = f'https://api.themoviedb.org/3/person/{personID}?api_key={keyApi}&language=en-US'

    peticionBio = requests.get(urlBio)
    peticionBio.encoding
    bioJSON = peticionBio.json()

    genero = ''
    if bioJSON['gender'] == 0:
        genero = ''
    elif bioJSON['gender'] == 1 or bioJSON['gender'] == 2:
        genero = Sex.objects.get(pk=bioJSON['gender']).JSONstringify()['gender']

    data = {}
    for i in bioJSON:
        if i != 'gender' and i != 'popularity':
            if i == 'profile_path' and bioJSON[i] != None:
                image = f'https://image.tmdb.org/t/p/w220_and_h330_face{bioJSON[i]}'
                data[i] = image
            elif i == 'profile_path' and bioJSON[i] == None:
                poster = '/static/coreApp/unkown.png'
                data[i] = poster
            elif i == 'imdb_id' and bioJSON[i] != None:
                data[i] = f'https://www.imdb.com/name/{bioJSON["imdb_id"]}/'
            elif bioJSON[i] != None:
                data[i] =  bioJSON[i]
            else:
                data[i] = '---'
    data['gender'] = genero

    if data['birthday'] != '---':
        birthday = datetime.strptime(data['birthday'], '%Y-%m-%d').year
        yearNow = datetime.now().year
        data['age'] = int(yearNow) - int(birthday)
    else:
        data['age'] = ''

    return JsonResponse({'data': data}, status=200)
