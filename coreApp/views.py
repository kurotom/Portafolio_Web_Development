from django.shortcuts import render
from django import forms
from django.urls import reverse
from django.http import HttpResponseRedirect, HttpResponse
from django.http import FileResponse
from django.http import JsonResponse
from django.contrib import messages

from .class_ghostscript.classghost import ConvertGS
from .antivirusCheck.clamFileScan import ScanViruses
import logging
from datetime import datetime

import json
import locale
import os
import uuid

from compressPDF.settings import MEDIA_ROOT

# Create your views here.
class upladFile(forms.Form):
    file = forms.FileField(label="", label_suffix="", widget=forms.FileInput(attrs={'accept': 'application/pdf', 'title': ''}))


def index(request):
    def saveFile(f, name):
        path = f'{name}.pdf'
        with open(path, 'wb') as destino:
            for chunk in f.chunks():
                destino.write(chunk)


    if request.method == "POST":
        if request.FILES['file'].size < 20000000:
            formulario = upladFile(request.POST, request.FILES)
            if formulario.is_valid():

                fileScan = ScanViruses(formulario.cleaned_data['file'].name)
                result = fileScan.scan()

                if result == 0 or result == None:
                    file = formulario.cleaned_data['file']
                    name = str(formulario.cleaned_data['file'].name).replace('.pdf', '')
                    title = f'{name}--{uuid.uuid4()}'

                    saveFile(file, title)

                    fichero = f'{title}.pdf'
                    ficheroFinal = f'Compressed_{title}.pdf'

                    ####                          ######
                    #####     Ghostscript Work     #####
                    ######                          ####
                    now = datetime.now()
                    ghost = ConvertGS(fichero, ficheroFinal)
                    g = ghost.excecute()
                    if g != 0:
                        logging.basicConfig(
                            format='%(levelname)s: %(asctime)s %(message)s',
                            filename='convert_error.log',
                            encoding='utf-8',
                            level=logging.ERROR
                        )
                        logging.error(' ')
                        logging.error(g)
                    ####                          ######
                    #####                          #####
                    ######                          ####
                    return HttpResponseRedirect(reverse(pdf, args=[ficheroFinal, fichero]))
                else:
                    formulario = upladFile()
                    f = formulario.cleaned_data['file'].name
                    messages.add_message(request, messages.WARNING, f'{f} --- File Infected!')
            else:
                return render(request, 'coreApp/index.html', {
                    "file": formulario
                })
        else:
            formulario = upladFile()
            messages.add_message(request, messages.WARNING, 'Max file size 20 MB.')

    return render(request, 'coreApp/index.html', {
        "file": upladFile,
    })


def pdf(request, filename, original):
    file = filename
    nameFinale = file.split('--')[0] + '.pdf'
    os.rename(file, nameFinale)

    returnFile = FileResponse(open(nameFinale, 'rb'), content_type='application/pdf', as_attachment=True)

    os.remove(original)
    os.remove(nameFinale)

    return returnFile
