import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { buyIcecream, cookIcecream } from "../redux/icecream/icecreamActions";

const HooksIcecreamContainer = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Icecreams Container - {state.icecream.numOfIcecreams}</h1>
      <button onClick={() => dispatch(buyIcecream())}>Buy Icecream</button>
      <button onClick={() => dispatch(cookIcecream())}>Cook Icecream</button>
    </div>
  );
};

export default HooksIcecreamContainer;
