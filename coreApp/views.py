from django.shortcuts import render

from django.http import HttpResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from api.models import Movies, Genders

# Create your views here.

def index(request):

    pagina = 1
    if request.GET != {}:
        pagina = request.GET['page']

    movies = Movies.objects.all().order_by('title')

    paginator = Paginator(movies, 10)
    objeto_Paginator = paginator.get_page(pagina)

    data_return = []
    for k in objeto_Paginator.object_list:
        jsonData = k.JSONstringify()
        listGeneros = [Genders.objects.filter(pk=i)[0].JSONstringify() for i in jsonData['genres']['genre']]
        objeto_data = {
            'id': jsonData['id'],
            'title': jsonData['title'],
            'original_title': jsonData['original_title'],
            'overview': jsonData['overview'],
            'genres': listGeneros,
            'date': jsonData['date'],
            'vote_average': jsonData['vote_average'],
            'poster': jsonData['poster'],
        }
        data_return.append(objeto_data)

    return render(request, 'coreApp/index.html', {
        'movie_Data': data_return,
        'page_object': objeto_Paginator
    })



def genre(request, genrename):
    keyGenre = Genders.objects.get(name=genrename).id
    page = 1
    if request.GET != {}:
        page = int(request.GET['page'])

    peliculas = Movies.objects.all()

    data = [i for i in peliculas if int(keyGenre) in i.JSONstringify()['genres']['genre']]

    paginator = Paginator(data, 10)
    objetoPagina = paginator.get_page(page)
    dataPagina = objetoPagina.object_list

    dataReturn = []
    for item in dataPagina:
        itemJSOn = item.JSONstringify()
        listGeneros = [Genders.objects.filter(pk=i)[0].JSONstringify() for i in itemJSOn['genres']['genre']]
        objeto_data = {
            'id': itemJSOn['id'],
            'title': itemJSOn['title'],
            'original_title': itemJSOn['original_title'],
            'overview': itemJSOn['overview'],
            'genres': listGeneros,
            'date': itemJSOn['date'],
            'vote_average': itemJSOn['vote_average'],
            'poster': itemJSOn['poster'],
        }
        dataReturn.append(objeto_data)

    return render(request, 'coreApp/generos.html', {
        'result': dataReturn,
        'page_object': objetoPagina,
    })


def error_404_view(request, exception):
    return render(request, 'coreApp/404.html')

def error_500_view(request):
    return render(request, 'coreApp/500.html')
