import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch ,connect } from "react-redux";
import { fecthAllProduct,productModal,fetchByID,productCheckout,CoinCalculator} from "../redux/actions";
import Swal from "sweetalert2";

const Products = props => {
  const dispatch = useDispatch();
  const [coin, setCoin] = useState(0);

  //fetchAllproduct
  useEffect(() => {
    if (props.products === null && !props.productsLoaded)
      props.fecthAllProduct();
  });

  //appendProductToDOM
  useEffect(() => {
    if (props.products !== null && !props.productsLoaded)
      dispatch({ type: "LISTS_PRODUCT", payload: props.products });
  });

  //setDisplayCurrentInsertedCoin
  useEffect(() => {
    setCoin(parseInt(props.currentCoin));
  });

  //modalAddeventlistener
  useEffect(() => {
    if (props.productsLoaded) {
      props.productModal(props.currentCoin, props.coins);
    }
  });

  //confirmBuy
  useEffect(() => {
    if (props.submitBuying) {
      props.fetchByID(props.buyingDetails.buyingID);
      dispatch({ type: "TOGGLE_SUBBIT" });
    }
  });

  //Checkout
  useEffect(() => {
    if (props.product !== null) {
      props.productCheckout(props.product, props.currentCoin);
      dispatch({ type: "CLEAR_CART" });
    }
  });

  //RefundChanges
  function Refund() {
    var remain = props.currentCoin;
    if (remain === 0) {
      alert("no coin to refund");
    } else {
      var changes = [];
      changes = CoinCalculator(remain, changes);
      Swal.fire({
        title: "Coin Change",
        html: `<h1>${changes}</h1>`,
        icon: "success"
      }).then(() => {
        dispatch({ type: "UPDATE_COIN", payload: 0 });
      });
    }
  }

  return (
    <Fragment>
      <div className="text-left">
        <h1 style={{ textDecoration: "underline" }} className="display-3">
          Dri<span style={{ color: "#D50000" }}>nks</span>
        </h1>
        <button className=" btn-primary">inserted coin : {coin}</button>
        <button
          onClick={Refund}
          className="btn-outline-danger m-3"
          id=""
          value="0"
        >
          Refund
        </button>
      </div>
      <div id="fields"></div>
    </Fragment>
  );
};

Products.propTypes = {
  products: PropTypes.array.isRequired,
  product: PropTypes.object.isRequired,
  productsLoaded: PropTypes.bool.isRequired,
  coins: PropTypes.array.isRequired,
  fecthAllProduct: PropTypes.func.isRequired,
  productModal: PropTypes.func.isRequired,
  fetchByID: PropTypes.func.isRequired,
  buyingDetails: PropTypes.object.isRequired,
  submitBuying: PropTypes.bool.isRequired,
  productCheckout: PropTypes.func.isRequired,
  currentCoin: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  products: state.products,
  productsLoaded: state.productsLoaded,
  product: state.product,
  coins: state.coin,
  buyingDetails: state.buyingDetails,
  submitBuying: state.submitBuying,
  currentCoin: state.currentCoin
});

export default connect(mapStateToProps,{fecthAllProduct,productModal,fetchByID,productCheckout})(Products);
