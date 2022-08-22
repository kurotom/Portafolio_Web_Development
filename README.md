# Compress PDF App

Web application that will allow you to compress your PDF files in a simple and intuitive way.


I have used:

* Python
* Django
* JavaScript
* Bootstrap
* HTML y CSS

## Requirements

1. Download and install Ghostscript on your machine, [https://ghostscript.com/releases/gsdnld.html](https://ghostscript.com/releases/gsdnld.html).

2. Optional - Download and install Clamav [http://www.clamav.net/downloads](http://www.clamav.net/downloads).
   If not installed in your machine, not worry, the app will not scan for viruses on yours pdf files.


## Run

1. Clone the branch of the repository.
```
$ git clone --branch https://github.com/kurotom/Portafolio_Web_Development.git
```

2. Install dependencies.
```
$ pip install -r requirements.txt
```

3. Run command to prepare the app.
```
$ python manage.py collectstatic --noinput
```

4. Run the service.
```
$ python manage.py runserver
```

5. Go to webpage [http://localhost:8000](http://localhost:8000).

