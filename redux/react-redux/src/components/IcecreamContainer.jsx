import React from "react";
import { connect } from "react-redux";
import { buyIcecream, cookIcecream } from "../redux/icecream/icecreamActions";

const IcecreamContainer = (props) => {
  return (
    <div>
      <h1>Icecream Container - {props.numOfIcecreams}</h1>
      <button onClick={props.buyIcecream}>Buy Icecream</button>
      <button onClick={props.cookIcecream}>Cook Icecream</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    numOfCakes: state.cake.numOfCakes,
    numOfIcecreams: state.icecream.numOfIcecreams,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    buyCake: () => dispatch(buyCake()),
    cookCake: () => dispatch(cookCake()),
    buyIcecream: () => dispatch(buyIcecream()),
    cookIcecream: () => dispatch(cookIcecream()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IcecreamContainer);
