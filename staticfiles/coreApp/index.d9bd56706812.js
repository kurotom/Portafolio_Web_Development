document.addEventListener('DOMContentLoaded', () => {
  console.log("documento cargado");

  let infMovie = document.querySelector('#infoMovie');
  let contenido = document.querySelector('#Contenido');
  let paginas = document.querySelector("#paginacion");

  let itemContent = document.querySelectorAll('.itemContent');


  itemContent.forEach(item => {
    item.addEventListener('click', () => {
      console.log('click', item.getAttribute('id'))

      let currentPosition = document.documentElement.scrollTop;

      let id_Movie = item.getAttribute('id');

      let footer = document.querySelector('#FondoFooter');
      footer.style.cssText = 'position: fixed;'

      infMovie.style.display = 'flex';
      contenido.style.display = 'none';
      paginas.style.display = 'none';

      consultaDatos(id_Movie, infMovie, contenido, paginas, currentPosition);

    })
  })


})

function consultaDatos(id, divCast, divContenido, divPaginas, positionY) {
  async function getData() {
    const setting = {
      method: 'GET'
    }
    const response = await fetch(`/api/cast?movie=${id}`, setting);
    const responseJSON = await response.json();
    return responseJSON;
  }
  getData().then(response => {
    let cast = response.cast;

    console.log(cast)

    window.scrollTo(0, 0);

    let buttonBack = document.querySelector('#back_button');
    buttonBack.style.display = 'block';

    let footer = document.querySelector('#FondoFooter');
    footer.style.cssText = 'position: relative;'

    let divLoading = document.querySelector('#loading');
    divLoading.style.display = 'none';

    let infomovieData = document.querySelector('#infoDataMovie');

    cast.forEach(item => {
      let persona = document.createElement('div');
      persona.setAttribute('class', 'card_person');
      persona.setAttribute('id', `${item.id}`)

      string = `
        <div class='card_person_image'>
          <img src="${item.poster}" width='100px' height='150px'>
        </div>
        <div class='card_person_info'>
          <table class='table'>
            <tbody class='tbody_table'>
              <tr>
                <th>
                  Character
                </th>
                <td>
                  ${item.character}
                </td>
              </tr>
              <tr>
                <th>
                  Name
                </th>
                <td>
                  ${item.name}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `
      persona.innerHTML = string;
      infomovieData.append(persona)
    })

    buttonBack.addEventListener('click', () => {
      divCast.style.display = 'none';
      divContenido.style.display = 'flex';
      divPaginas.style.display = 'flex';
      divLoading.style.display = 'flex';

      footer.style.cssText = 'position: static;'

      let infodatamovie = document.querySelector('#infoDataMovie');
      infodatamovie.innerHTML = '';

      buttonBack.style.display = 'none';

      window.scrollTo(0, positionY);

    })

  })
  .then(etapaDos => {
    let cardPersons = document.querySelectorAll('.card_person');
    cardPersons.forEach(item => {
      item.addEventListener('click', () => {

        document.querySelector('body').style.cssText = `overflow-y: hidden;`

        let loadingIcon = document.querySelector('#loading');
        loadingIcon.style.cssText = `
        display: flex;
        position: fixed;
        top: 30%;
        `;

        let backbutton = document.querySelector('#back_button');
        backbutton.style.cssText = `
        opacity: 0.2;
        `;

        let dataMovieContent = document.querySelector('#infoDataMovie');
        dataMovieContent.style.cssText = `
        opacity: 0.2;
        `;


        let idperson = item.getAttribute('id');
        console.log('person', idperson);
        cargarBio(idperson);

      })
    })
  })
}



function cargarBio(personID) {
  async function getBio() {
    const setting = {
      method: 'GET'
    }
    const respuesta = await fetch(`/api/biography/${personID}`, setting);
    const respuestaJSON = await respuesta.json();
    return respuestaJSON;
  }
  getBio().then(response => {
    console.log(response);
    let data = response.data

    console.log(Object.keys(data))

    let modalDiv = document.querySelector('#modal');
    let modalbody = document.querySelector('#contentModalBody');
    let modalcerrar = document.querySelector('#cerrarModal');

    document.querySelector('body').style.cssText = `overflow-y: hidden;`


    modalDiv.style.display = 'flex';

    console.log(data.age)

    let age = ``;
    if (data.age !== '') {
      age = `(${data.age} years)`
    } else {
      age = '';
    }

    let urlhomepage = ``;
    if (data.homepage !== '---') {
      urlhomepage = `<a href="${data.homepage}">Go Page</a>`
    } else {
      urlhomepage = ``;
    }
   

    let stringModalBody = `
      <div id='${data.id}' class="bodyModalContent">
        <div style='width: auto;'>
          <label class='h1'>
            ${data.name}
          </label>
          <hr class='hrItem'>
          <p>
            ${data.biography}
          </p>
        </div>

        <table class='table table-borderless' style='width: 190px;'>
          <tbody class='infoTableBody'>
            <th style='font-size: 19px; text-align: center; display: flex; justify-content: center;'>
              ${data.name}
            </th>
            <tr class='imageTable'>
              <td>
                <img src="${data.profile_path}" style="width: 150px;">
              </td>
            </tr>
            <tr>
              <th scope='row'  style="font-size: 88%; text-align: left; vertical-align: top;">
                Born
              </th>
              <td style="font-size: 88%; text-align: left; vertical-align: top;">
                <span>${data.birthday}</span>
                <span style="float: left;">${age}</span>
                <span>${data.place_of_birth}</span>
              </td>
            </tr>
            <tr>
              <th scope="row"  style="font-size: 88%; text-align: left; vertical-align: top;">
                Died
              </th>
              <td style="font-size: 88%; text-align: left; vertical-align: top;">
                ${data.deathday}
              </td>
            </tr>
            <tr>
              <th scope='row'  style="font-size: 88%; text-align: left; vertical-align: top;">
                Sex
              </th>
              <td style="font-size: 88%; text-align: left; vertical-align: top;">
                ${data.gender}
              </td>
            </tr>
            <tr>
              <th scope="row"  style="font-size: 88%; text-align: left; vertical-align: top;">
                Occupation
              </th>
              <td style="font-size: 88%; text-align: left; vertical-align: top;">
                ${data.known_for_department}
              </td>
            </tr>
            <tr>
              <th scope="row"  style="font-size: 88%; text-align: left; vertical-align: top;">
                IMDB
              </th>
              <td style="font-size: 88%; text-align: left; vertical-align: top;">
                <a href="${data.imdb_id}" target="_blank">
                  <svg id='svg_imdb' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM21.3 229.2H21c.1-.1.2-.3.3-.4zM97 319.8H64V192h33zm113.2 0h-28.7v-86.4l-11.6 86.4h-20.6l-12.2-84.5v84.5h-29V192h42.8c3.3 19.8 6 39.9 8.7 59.9l7.6-59.9h43zm11.4 0V192h24.6c17.6 0 44.7-1.6 49 20.9 1.7 7.6 1.4 16.3 1.4 24.4 0 88.5 11.1 82.6-75 82.5zm160.9-29.2c0 15.7-2.4 30.9-22.2 30.9-9 0-15.2-3-20.9-9.8l-1.9 8.1h-29.8V192h31.7v41.7c6-6.5 12-9.2 20.9-9.2 21.4 0 22.2 12.8 22.2 30.1zM265 229.9c0-9.7 1.6-16-10.3-16v83.7c12.2.3 10.3-8.7 10.3-18.4zm85.5 26.1c0-5.4 1.1-12.7-6.2-12.7-6 0-4.9 8.9-4.9 12.7 0 .6-1.1 39.6 1.1 44.7.8 1.6 2.2 2.4 3.8 2.4 7.8 0 6.2-9 6.2-14.4z"/></svg>
                </a>
              </td>
            </tr>
            <tr style='display: flex; flex-direction: column; justify-content: center; align-items: center;'>
              <th scope="row"  style="font-size: 88%; text-align: left; vertical-align: top;">
                Homepage
              </th>
              <td style="font-size: 88%; text-align: center; white-space: nowrap;">
	        ${urlhomepage}
	      </td>
            </tr>

          </tbody>
        </table>
      </div>
    `
    modalbody.innerHTML = stringModalBody;

    document.querySelector("#modalContent").scrollTo(0, 0);

    modalcerrar.addEventListener('click', () => {
      document.querySelector('body').style.cssText = `overflow-y: auto;`

      let backbutton = document.querySelector('#back_button');
      backbutton.style.cssText = `
      opacity: 1;
      `;

      let dataMovieContent = document.querySelector('#infoDataMovie');
      dataMovieContent.style.cssText = `
      opacity: 1;
      `;

      document.querySelector('#loading').style.display = 'none';

      modalDiv.style.display = 'none';
    })


  })
}
