from django.contrib.auth import login, logout, authenticate
from django.shortcuts import render
from django.urls import reverse
from django.http import HttpResponseRedirect, HttpResponse
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib import messages



from datetime import datetime
from django import forms
import json


from .models import User, mywallet, ops



#       Forms

class WalletForm(forms.Form):
    """Formulario para crear una wallet"""
    name = forms.CharField(label="Name", label_suffix="", widget=forms.TextInput(attrs={'placeholder': '64 characters maximum'}))
    money = forms.FloatField(label="Amount", label_suffix="", widget=forms.NumberInput(attrs={'min': '0.0', 'placeholder': '$ 0.0', 'step': '0.1'}))









# Create your views here.

def index(request):
    return render(request, 'wallet/index.html')


def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse('wallet'))
        else:
            return render(request, 'wallet/login.html', {
                'message': 'Invalid username and/or password.'
            })
    else:
        return render(request, 'wallet/login.html')

    return render(request, 'wallet/login.html')


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))

def register_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, 'wallet/register.html', {
                'message': 'Password must match.'
            })
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except:
            return render(request, 'wallet/register.html', {
                'message': 'Username already taken.'
            })
        login(request, user)
        return HttpResponseRedirect(reverse('wallet'))
    else:
        return render(request, 'wallet/register.html')


@login_required
def createwallet(request):
    walletObj = mywallet.objects.filter(username=request.user.id)
    if request.method == "POST":
        dataForm = WalletForm(request.POST)
        if dataForm.is_valid():
            name = dataForm.cleaned_data['name']
            money = dataForm.cleaned_data["money"]

#            print()
#            print(walletObj.filter(nameWallet=name))
#            print()

            instanciaWallet = mywallet(
                userID=request.user.id,
                username=User.objects.get(pk=request.user.id),
                nameWallet=name,
                amount=money,
                date=str(datetime.now())
            )
            instanciaWallet.save()
            messages.info(request, f'Create wallet {name} successfully.', extra_tags='create')
            return HttpResponseRedirect(reverse('wallet'))
        else:
            return render(request, 'wallet/createwallet.html', {
                'formWallet': WalletForm,
            })

    return render(request, 'wallet/createwallet.html', {
        'formWallet': WalletForm,
    })


@login_required
def wallet(request):
    walletObj = mywallet.objects.filter(username=request.user.id)
    if request.method == "GET":
        if list(walletObj) == []:
            messages.info(request, 'Your are not have wallet yet.', extra_tags='no_wallet')
            return render(request, 'wallet/mywallet.html', {
                'formWallet': WalletForm
            })
        else:
            listData = [i.to_json() for i in walletObj]

            pages = Paginator(listData, 5)
            numPagina = request.GET.get('page')
            pageObject = pages.get_page(numPagina)

            return render(request, 'wallet/mywallet.html',{
                'data': pageObject,
                'page': pageObject
            })


@login_required
def operations(request):
    data = json.loads(request.body)
    print(data, request.user.id)
    if request.method == "POST":
        if data['op'] == 'add':
            walletObj = mywallet.objects.filter(id=data['numWallet'])
            price = walletObj[0].amount + float(data['money'])
            walletObj.update(amount=price)

            operation = ops(
                op=data['op'],
                walletID=data['numWallet'],
                walletName=mywallet.objects.get(pk=data['numWallet']),
                username=User.objects.get(pk=request.user.id),
                amount=data['money'],
                date=str(datetime.now())
            )
            operation.save()
            return JsonResponse({'message': 'OK Save Add'}, status=201)
        elif data['op'] == 'take':
            walletObj = mywallet.objects.filter(id=data['numWallet'])
            if walletObj[0].amount != 0:
                if walletObj[0].amount < float(data['money']):
                    walletObj.update(amount=0)
                    return JsonResponse({'message': 'Withdrew the total, amount entered is greater than the total.'}, status=201)
                else:
                    price = walletObj[0].amount - float(data['money'])
                    walletObj.update(amount=price)

                operation = ops(
                    op=data['op'],
                    walletID=data['numWallet'],
                    walletName=mywallet.objects.get(pk=data['numWallet']),
                    username=User.objects.get(pk=request.user.id),
                    amount=data['money'],
                    date=str(datetime.now())
                )
                operation.save()
                return JsonResponse({'message': 'OK Save Take'}, status=201)
            else:
                return JsonResponse({'message': 'Wallet not have funds.'}, status=201)


@login_required
def historical(request, q):
    def data(queryObject):
        listData = []
        for item in queryObject:
            listData.append(item.to_json())
        return listData

    operaciones = ops.objects.filter(username=request.user.id)

    if q == 'add':
        if list(operaciones) != []:
            dataAdd = data(operaciones.filter(op='add'))
            pagAdd = Paginator(dataAdd, 10)
            numPaginaAdd = request.GET.get('page')
            pagObjAdd = pagAdd.get_page(numPaginaAdd)

            return render(request, 'wallet/add.html', {
            'pagAdd': pagObjAdd,
            'dataAdd': pagObjAdd,
            })
        else:
            pagObjAdd = [None]
            return render(request, 'wallet/add.html', {
                'pagAdd': pagObjAdd,
                'dataAdd': pagObjAdd,
            })
    elif q == 'take':
        if list(operaciones) != []:
            dataTake = data(operaciones.filter(op='take'))
            pagTake = Paginator(dataTake, 10)
            numPaginaTake = request.GET.get('page')
            pagObjTake = pagTake.get_page(numPaginaTake)

            return render(request, 'wallet/take.html', {
                'pagTake': pagObjTake,
                'dataTake': pagObjTake
            })
        else:
            pagObjTake = [None]
            return render(request, 'wallet/take.html', {
                'pagTake': pagObjTake,
                'dataTake': pagObjTake,
            })

    if list(operaciones) != []:
        dataAll = data(operaciones)
        pagAll = Paginator(dataAll, 10)
        numPaginaAll = request.GET.get('page')
        pagObjAll = pagAll.get_page(numPaginaAll)

        return render(request, 'wallet/historical.html', {
            'pagAll': pagObjAll,
            'dataAll': pagObjAll,
        })
    else:
        pagObjAll = [None]
        return render(request, 'wallet/historical.html', {
            'pagAll': pagObjAll,
            'dataAll': pagObjAll,
        })

def deleteWallet(request):
    resp = json.loads(request.body)
    walletObj = mywallet.objects.filter(pk=resp['walletID'])
    print()
    walletObj.delete()
    print()


    messages.info(request, f'Wallet erased', extra_tags='deleted')
    return JsonResponse({'ok': 'ok'}, status=201)
