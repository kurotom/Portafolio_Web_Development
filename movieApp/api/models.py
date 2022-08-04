from django.db import models

# Create your models here.

class Genders(models.Model):
    id = models.IntegerField(primary_key=True, editable=False)
    name = models.CharField(max_length=30)

    class Meta:
        verbose_name_plural = 'Genres'

    def JSONstringify(self):
        return {
            'id': self.id,
            'name': self.name
        }

    def __str__(self):
        return f'id: {self.id}, genre: {self.name}'

class Movies(models.Model):
    id = models.IntegerField(primary_key=True, editable=False)
    title = models.CharField(max_length=100)
    original_title = models.CharField(max_length=100)
    overview = models.TextField(blank=True, null=True)
    genre_ids = models.JSONField(blank=True, null=True)
    release_date = models.CharField(max_length=12, blank=True, null=True)
    vote_average = models.FloatField(blank=True, null=True)
    poster_path = models.URLField(max_length=255, null=True, blank=True)
    persons = models.JSONField(blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Movies'

    def JSONstringify(self):
        return {
            "id": self.id,
            'title': self.title,
            'original_title': self.original_title,
            'overview': self.overview,
            'genres': self.genre_ids,
            'date': self.release_date,
            'vote_average': self.vote_average,
            'poster': self.poster_path
        }

    def __str__(self):
        return f'id: {self.id}, title: {self.title}, original_title: {self.original_title}, date: {self.release_date}, genres: {self.genre_ids}'


class Sex(models.Model):
    id = models.IntegerField(primary_key=True, editable=False)
    gender = models.CharField(max_length=30)

    class Meta:
        verbose_name_plural = 'Sex'

    def JSONstringify(self):
        return {
            'id': self.id,
            'gender': self.gender
        }

    def __str__(self):
        return f'id: {self.id}, gender: {self.gender}'


class Persons(models.Model):
    id_person = models.IntegerField(primary_key=True, editable=False)
    sex = models.ForeignKey(Sex, on_delete=models.CASCADE, blank=True, null=True, related_name='Gender')
    name = models.CharField(max_length=255, blank=True)
    path_image = models.URLField(max_length=255, null=True, blank=True)
    birthday = models.CharField(max_length=12, blank=True, null=True)
    place_of_birth = models.CharField(max_length=255, blank=True)
    biography = models.TextField(null=True, blank=True)
    known_for_department = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name_plural = 'Persons'

    def JSONstringify(self):
        return {
            'id': self.id,
            'id_person': self.id_person,
            'gender': self.gender,
            'name': self.name,
            'path_image': self.path_image,
            'birthday': self.birthday,
            'place_of_birth': self.place_of_birth,
            'biography': self.biography,
            'known_for_department': self.known_for_department
        }

    def __str__(self):
        return f'id: {self.id}, name: {self.name}, department: {self.known_for_department}, birthday: {self.birthday}'
