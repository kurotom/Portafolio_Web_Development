#!/bin/bash


if [ ! -d coreApp/uploads ]; then
	mkdir coreApp/uploads
fi
if [ -f document.pdf ]; then
	rm document.pdf
fi
if [ -f Compressed_document.pdf ]; then
	rm Compressed_document.pdf
fi

if [ -d staticfiles ]; then
	rm -rfv staticfiles
fi

python manage.py collectstatic --noinput

