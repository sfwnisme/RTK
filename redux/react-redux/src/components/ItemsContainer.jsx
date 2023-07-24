import React from "react";
import { connect } from "react-redux";
import { buyCake, buyIcecream } from "../redux";

const ItemsContainer = (props) => {
  return (
    <div>
      <h1>Item - {props.item}</h1>
      <button onClick={props.buyItem}>Buy Item</button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  // ownProps.cake => you can change it to ownProps.notCake it's just naming
  const itemState = ownProps.cake
    ? state.cake.numOfCakes
    : state.icecream.numOfIcecreams;

  return {
    item: itemState,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const itemDispatch = ownProps.cake
    ? () => dispatch(buyCake())
    : dispatch(buyIcecream());

  return {
    buyItem: itemDispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
