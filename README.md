# MovieView

Web application that shows information about movies, such as poster, plot, actors and their biography.

It uses The Movie Database (TMDB) API.

- For backend, i used Python, Framework Django, I wrote the API application with this elements.
	Use PostgreSQL database, for information of movies, for additional informations like biography, is consulted to The Movie Database API.
- For frontend, i used JavaScript, CSS, Bootstrap.

API have three endpoints, for now, i intend write new endpoints based on futures needs.


Final points:

* /api/cast?movie=[ID] : Return movie cast information by movie id.

* /api/movie/[ID]: returns movie information by its id.

* /api/biography/[personID]: Return cast person biography information by their id.

All these IDs have been provided by [The Movie Database] (https://www.themoviedb.org)

:point_right:  **https://moviesviewapp.herokuapp.com/**
