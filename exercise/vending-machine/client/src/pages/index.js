import React, { Fragment } from "react";
import TitleBar from '../components/nav'
import Products from '../components/products'


export default () => {
  return (
    <Fragment>
      <div className="container-sm">
        <TitleBar />
        <Products />
      </div>
    </Fragment>
  );
}



