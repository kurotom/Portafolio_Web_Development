document.addEventListener('DOMContentLoaded', () => {
  console.log("Todos los elementos cargados")
  let addButton = document.querySelectorAll("#add");
  let outButton = document.querySelectorAll("#out");
  let deleteButton = document.querySelectorAll("#delete");

  addMoney(addButton);
  outMoney(outButton);


  deleteButton.forEach(elemento => {
    elemento.addEventListener('click', () => {
      let divForm = document.querySelector("#deleteform");
      let form = divForm.querySelectorAll('form');

      let button = document.querySelector("#modalDelete").querySelector("button");
      button.addEventListener("click", () => {
        button.matches(':hover');
      })

      form.forEach(item => {
        item.addEventListener('click', () => {
          item.onsubmit = (evento) => {
            evento.preventDefault();

            let confirm = item.id;
            let csrfToken = item.querySelectorAll('input')[0].value;
            let walletID = elemento.name;

            if (confirm === 'no') {
              window.location.reload();
            } else if (confirm === 'yes') {
              async function confirmPost() {
                const settingPost = {
                  method: "POST",
                  headers: {
                    "X-CSRFToken": csrfToken
                  },
                  body: JSON.stringify({
                    'delete': confirm,
                    'walletID': walletID
                  })
                }
                const response = await fetch('/delete', settingPost);
                const responseJSON = await response.json();
                return responseJSON;
              }
              confirmPost().then(response => {
                console.log(response);
                window.location.reload();
              })
            }
          }
        })

      })
    })
  })

})


function addMoney(item) {
  item.forEach(elemento => {
    elemento.addEventListener("click", () => {
      console.log("add");
      let form = document.querySelector("#formAdd");
      form.onsubmit = (evento) => {
        evento.preventDefault();
        let numWallet = elemento.name;
        let money = document.querySelector("#moneyadd").value;
        let csrf_token = document.querySelector("#formAdd").querySelector("#form")[0].value

        async function addmoneyPost() {
          const settingPost = {
            method: "POST",
            headers: {
              "X-CSRFToken": csrf_token
            },
            body: JSON.stringify({
              "op": 'add',
              'numWallet': numWallet,
              "money": money
            })
          }
          const response = await fetch('/operations', settingPost);
          const responseJSON = await response.json();
          return responseJSON;
        }
        addmoneyPost().then(response => {
          console.log(response);
          window.location.reload()
        })
      }
      document.querySelector("#moneyadd").value = "";
    })
  })
}

function outMoney(item) {
  item.forEach(elemento => {
    elemento.addEventListener('click', () => {
      console.log("out");
      let form = document.querySelector("#formOut");
      form.onsubmit = (evento) => {
        evento.preventDefault();
        let numWallet = elemento.name;
        let money = document.querySelector("#moneyout").value;
        let csrf_token = document.querySelector("#formOut").querySelector("#form")[0].value

        async function takeMoneyPOST() {
          const settingPost = {
            method: "POST",
            headers: {
              "X-CSRFToken": csrf_token
            },
            body: JSON.stringify({
              "op": 'take',
              'numWallet': numWallet,
              "money": money
            })
          }
          const response = await fetch('operations', settingPost);
          const responseJSON = await response.json();
          return responseJSON;
        }
        takeMoneyPOST().then(response => {
          console.log(response);
          window.location.reload()

          console.log("despues del reload")
        })
      }
      document.querySelector("#moneyout").value = "";
    })
  })
}
