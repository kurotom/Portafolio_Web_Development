document.addEventListener('DOMContentLoaded', () => {
  let allBtn = document.querySelector("#all");
  let addBtn = document.querySelector("#add");
  let addTake = document.querySelector("#take");
  let divall = document.querySelector("#divall");
  let divadd  = document.querySelector("#divadd");
  let divtake = document.querySelector("#divtake");
  divadd.style.display = 'none';
  divtake.style.display = 'none';
  paginationAll
  document.querySelector("#paginationAdd").style.display = 'none'
  document.querySelector("#paginationTake").style.display = 'none'

  arr = [allBtn, addBtn, addTake];
  arr.forEach(elemento => {
    elemento.addEventListener('click', () => {
      console.log(elemento.name)
      let name = elemento.name;
      if (name === 'add') {
        let divall = document.querySelector("#divall");
        let divadd  = document.querySelector("#divadd");
        let divtake = document.querySelector("#divtake");

        document.querySelector("#paginationAdd").style.display = 'block'
        document.querySelector("#paginationTake").style.display = 'none'
        document.querySelector("#paginationAll").style.display = 'none'
        divall.style.display = 'none';
        divtake.style.display = 'none';
        divadd.style.display = 'block';

      } else if (name === 'take') {

        let divall = document.querySelector("#divall");
        let divadd  = document.querySelector("#divadd");
        let divtake = document.querySelector("#divtake");

        document.querySelector("#paginationAdd").style.display = 'none'
        document.querySelector("#paginationTake").style.display = 'block'
        document.querySelector("#paginationAll").style.display = 'none'

        divall.style.display = 'none';
        divadd.style.display = 'none';
        divtake.style.display = 'block';
      } else if (name === "all") {
          // window.location.reload();

      }

    })
  })
})
