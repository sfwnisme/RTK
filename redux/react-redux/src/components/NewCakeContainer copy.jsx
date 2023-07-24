import React, { useState } from "react";
import { connect } from "react-redux";
import { buyCake } from "../redux";
import { cookCake } from "../redux/cake/cakeActions";
import { buyIcecream, cookIcecream } from "../redux/icecream/icecreamActions";

const NewCakeContainer = (props) => {
  const [number, setNumber] = useState(1);
  console.log(number);
  return (
    <div>
      <h1>Cake Container - {props.numOfCakes}</h1>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={() => props.buyCake(+number)}>Buy {number} Cake</button>
      <button onClick={() => props.cookCake(+number)}>
        Cook {number} Cake
      </button>
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
    buyCake: (parameter) => dispatch(buyCake(parameter)),
    cookCake: (parameter) => dispatch(cookCake(parameter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCakeContainer);
