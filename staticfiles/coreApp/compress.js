document.addEventListener('DOMContentLoaded', () => {
  console.log("contenido cargado");

  let button = document.querySelector("#send");
  let pdfButton = document.querySelector("#id_file");

  button.disabled = true;

  pdfButton.addEventListener('click', () => {
    button.disabled = false;
  })

  button.disabled = true;


})
