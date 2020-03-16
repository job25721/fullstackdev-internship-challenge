import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { fecthAllProduct, productModal } from "../redux/actions";
import { connect } from "react-redux";

const Products = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.products === null && !props.productsLoaded)
      props.fecthAllProduct()
  });

  useEffect(()=>{    
    if (props.products !== null && !props.productsLoaded)
      dispatch({ type: "LISTS_PRODUCT", payload: props.products });
  })
  useEffect(() => {
    if (props.productsLoaded) 
      props.productModal(0,props.coins)
  });

  function click() {
    //debugFunc
    console.log(props.product);
    
  }
  return (
    <Fragment>
      <div className="text-center">
        <h1 className="display-3">Products</h1>
        <button onClick={click}>Click</button>
      </div>
      <div id="fields"></div>
    </Fragment>
  );
};

Products.propTypes = {
  products: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  productsLoaded: PropTypes.string.isRequired,
  coins : PropTypes.string.isRequired,
  fecthAllProduct : PropTypes.func.isRequired,
  productModal : PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  products: state.products,
  productsLoaded: state.productsLoaded,
  product: state.product,
  coins : state.coin,
  dis : state.dis
});

export default connect(mapStateToProps,{fecthAllProduct,productModal})(Products);
