import React from "react";
import { connect } from "react-redux";
import { buyCake } from "../redux";
import { cookCake } from "../redux/cake/cakeActions";
import { buyIcecream, cookIcecream } from "../redux/icecream/icecreamActions";

const CakeContainer = (props) => {
  return (
    <div>
      <h1>Cake Container - {props.numOfCakes}</h1>
      <button onClick={props.buyCake}>Buy Cake</button>
      <button onClick={props.cookCake}>Cook Cake</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    numOfCakes: state.cake.numOfCakes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    buyCake: () => dispatch(buyCake()),
    cookCake: () => dispatch(cookCake()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CakeContainer);
