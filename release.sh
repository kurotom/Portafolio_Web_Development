#!/usr/bin/env bash
python manage.py collectstatic --noinput
python manage.py makemigrations wallet
python manage.py migrate
