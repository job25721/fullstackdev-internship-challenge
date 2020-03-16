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
    var trans = ""
    var in_stock = ""
    if(each.in_stock) {
      trans = "Yes" 
      in_stock = `<p class="btn-success card-text" >In stock :${trans}</p>`
    }
    else{
      trans = "No"
      in_stock = `<p class="btn-danger card-text" >In stock : ${trans}</p>`
    } 
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
                    <button class="btn-outline-success buy" value="${each.id}">
                      Select
                    </button>
                    <hr />
                    ${in_stock}
                  </div>
                </div>
                `;
    $(col).append(html);
    count++;
  };
  products.map(reducer)

};

const productContent = (coins, currentCoin,e) => {
  var title = e.currentTarget.previousElementSibling.previousElementSibling.textContent.split(" ")    
  var price = e.currentTarget.previousElementSibling.textContent
  const contentSection = document.createElement("div");
  contentSection.setAttribute("class", "swalButton row");
  var div = document.createElement("div");
  div.setAttribute("class", "col");
  var hParams = 1;
  for(let i=0;i<title.length;i++){
    const h = document.createElement(`h${hParams}`)
    if(hParams === 1) h.setAttribute("style","position:relative;top:25px")
    h.innerHTML = title[i]
    div.appendChild(h)
    if(hParams < 2)
      hParams++;
  }
  const p = document.createElement("h4")
  p.innerHTML = price

  div.appendChild(p)
  contentSection.appendChild(div);
  
  div = document.createElement("div");
  div.setAttribute("class", "col");

  const header = document.createElement("h5");
  header.innerHTML = "Remianing time <b></b> mins.";
  const text = document.createElement("h2");
  text.setAttribute("id", "currentCoin");
  text.innerHTML = `<h3>${currentCoin} ฿</h3>`;
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

export const productModal = (currentCoin, coinTypes) => async dispatch => {
  $(".buy").on("click", e => {
    const contentSection = productContent(coinTypes,currentCoin,e);
    const customSwal = Swal.mixin({
      customClass: {
        confirmButton: "btn-success m-1",
        cancelButton: "btn-warning m-1"
      },
      buttonsStyling: false
    });
    let timerInterval;
    customSwal
      .fire({
        // title: "Please insert your coin!",
        html: contentSection,
        timer: 100000,
        timerProgressBar: true,
        confirmButtonText: "Buy",
        cancelButtonText : "Another drinks",
        showConfirmButton: true,
        showCancelButton: true,
        onClose: () => {
          clearInterval(timerInterval);
        }
      })
      .then(result => {
        console.log();
        if (result.dismiss === Swal.DismissReason.timer) {
          Swal.fire({
            html : '<h1>Times out!!!</h1>',
            icon : "info",

          })
        } else if (result.value) {
          dispatch({type:types.UPDATE_COIN,payload: currentCoin})
          dispatch({type : types.BUY_PRODUCT ,payload : {currentCoin : currentCoin,buyingID : e.target.value}})
          dispatch({type:types.TOGGLE_SUBBIT})
          customSwal.close();
        }else{
          customSwal.close();
        }
      });
    $(".coinBtn").on("click", e => {
      currentCoin += parseInt(e.target.value);
      dispatch({type:types.UPDATE_COIN,payload: currentCoin})
      $("#currentCoin").html(`<h3>${currentCoin} ฿</h3>`);
    });
  });
};

export const CoinCalculator = (insertedCoin,changes) =>{
  if(insertedCoin === 0) changes = [0]
  while (insertedCoin !== 0) {
    if (insertedCoin >= 10) {
      insertedCoin -= 10;
      changes.push(10);
    } else if (insertedCoin >= 5) {
      insertedCoin -= 5;
      changes.push(5);
    } else if (insertedCoin >= 2) {
      insertedCoin -= 2;
      changes.push(2);
    } else if (insertedCoin >= 1) {
      insertedCoin -= 1;
      changes.push(1);
    }
  }
  return changes
}

export const productCheckout = (product,insertedCoin) => dispatch => {
  const price = product.price;
  var changes = []
  if(product.in_stock){
    if(insertedCoin >= product.price){
         insertedCoin -= price
         Swal.fire({
          // title: 'Thank you',
          html : `<h2 style="color:white">Thank you !</h2><h3 style="color:white">You've got ${product.name}</h3>`,
          width: 500,
          padding: '3em',
          background: '#fff url(https://media.giphy.com/media/VGuAZNdkPUpEY/giphy.gif)',
          backdrop: `
            rgba(0,0,123,0.4)
            left top
            no-repeat
          `
        })
        //  Swal.fire({
        //   title : "Thank you",
        //   icon : "success",
        //   html : `<h3>You've got ${product.name}</h3>`
        // })
        .then(()=>{
          if(insertedCoin !== 0){
            changes = CoinCalculator(insertedCoin,changes)
            Swal.fire({
              title: "Coin Change",
              html: `<h1>${changes}</h1>`,
              icon: "success"
            });
          }
        })
        dispatch({type:types.UPDATE_COIN,payload: 0})
        dispatch({type:types.BUY_PRODUCT,payload:null})
    }else{
       Swal.fire({
        title : "Sorry",
        icon : "warning",
        html : `<h3>You don't have enough money</h3>`
      })
    }
  }else{
    Swal.fire({
      title:"This product is out of stock",
      icon : "error"
    })
  }
}