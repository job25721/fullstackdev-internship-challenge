import api from "../api";
import * as types from "./type";
import $ from "jquery";
import Swal from "sweetalert2";

export const fecthAllProduct = () => async dispatch => {
  const res = await api.get("/api");
  dispatch({
    type: types.GET_ALL_PRODUCTS,
    payload: res.data
  });
};

export const fetchByID = id => async dispatch => {
  const res = await api.get(`/api/${parseInt(id)}`);
  dispatch({ type: types.GET_ONE_PRODUCT, payload: res.data });
};

export const appendProducts = products => {
  var trigger = true;
  var count = 0;
  var row;
  const reducer = each => {
    if (count === 4) {
      trigger = true;
      count = 0;
    }
    if (trigger) {
      row = document.createElement("div");
      row.setAttribute("class", "row");
      $("#fields").append(row);
      trigger = false;
    }
    var col = document.createElement("div");
    col.setAttribute("class", "col col-lg-3");
    row.appendChild(col);
    var html = ` <div class="card mt-3" style="width:15rem">
                  <img
                     width = 100%
                     height = 215px
                    src="${each.image}"
                    class=""
                    alt="..."
                  />
                  <div class="card-body text-center">
                    <h5 class="card-title">${each.name}</h5>
                    <p class="card-text">Price : ${each.price}</p>
                    <button class="btn btn-primary buy" value="${each.id}">
                      Buy
                    </button>
                  </div>
                </div>
                `;
    $(col).append(html);
    count++;
  };
  products.map(reducer);
};

const productContent = (coins, coinNow,event) => {
  const contentSection = document.createElement("div");
  contentSection.setAttribute("class", "swalButton row");
  var div = document.createElement("div");
  div.setAttribute("class", "col");
  div.innerHTML =
    "<h1 style='position:relative;top:30px'>Pepsi</h1><h2>Max</h2>";
  contentSection.appendChild(div);
  div = document.createElement("div");
  div.setAttribute("class", "col");

  const header = document.createElement("h5");
  header.innerHTML = "Remianing time <b></b> mins.";
  const text = document.createElement("h2");
  text.setAttribute("id", "currentCoin");
  text.innerHTML = `<h3>inserted : ${coinNow}</h3>`;
  div.appendChild(text);

  coins.map(coin => {
    const button = document.createElement("button");
    button.setAttribute("class", "m-1 coinBtn");
    button.setAttribute("id", `coin${coin}`);
    button.setAttribute("value", coin);
    button.innerHTML = coin;
    div.appendChild(button);
  });
  contentSection.appendChild(div);
  return contentSection;
};

export const productModal =  (coinNow, coinTypes) => async dispatch => {
  $(".buy").on("click", e => {
    const contentSection = productContent(coinTypes,coinNow,e)
    const customSwal = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success m-1",
        cancelButton: "btn btn-danger m-1"
      },
      buttonsStyling: false
    });
    let timerInterval;
    customSwal
      .fire({
        title: "Please insert your coin!",
        html: contentSection,
        timer: 3000000,
        timerProgressBar: true,
        confirmButtonText: "Buy",
        cancelButtonText: "Cancel",
        showConfirmButton: true,
        showCancelButton: true,
        onBeforeOpen: () => {
          timerInterval = setInterval(() => {
            const content = Swal.getContent();
            if (content) {
              const b = content.querySelector("b");
              if (b) {
                var time = Swal.getTimerLeft();
                var min = Math.floor((time / 1000 / 60) << 0);
                var sec = Math.floor((time / 1000) % 60);
                b.textContent = min + " " + sec;
              }
            }
          }, 100);
        },
        onClose: () => {
          clearInterval(timerInterval);
        }
      })
      .then(result => {
        if (result.dismiss === Swal.DismissReason.timer) {
          alert("Time out!!");
        } else if (result.value) {
          alert("success");
          customSwal.close();
        } else {
          Swal.fire({
            title: "Coin Change",
            html: `<h1>${coinNow}</h1>`,
            icon: "error"
          });
          coinNow = 0;
        }
      });
    $(".coinBtn").on("click", e => {
      coinNow += parseInt(e.target.value);
      $("#currentCoin").html(`<h3>inserted : ${coinNow}</h3>`);
    });
  });
};
