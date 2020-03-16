import React, { Fragment } from "react";
import "../css/navigation-bar.css";

export default () => {
  return (
    <Fragment>
      <div className="row">
        <div className="col main">
          <img className="logo m-3" src="/img/vending-machine.png" alt="..." />
          <span className="title" style={{textDecoration:"underline"}}><span style={{color:"#D50000"}}>Vending</span> Machine</span>
        </div>
        <div className="col status text-right mr-3 mt-1">
          <span style={{ fontSize: "20px" }}><b>Your Coin</b> : Unlimited</span>
          <p style={{ fontSize: "20px" }}><b>Products</b> : Unlimited</p>
        </div>
      </div>
      <hr />
    </Fragment>
  );
};
