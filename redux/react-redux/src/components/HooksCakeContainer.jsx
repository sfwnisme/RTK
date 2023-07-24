import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { buyCake } from "../redux";
import { cookCake } from "../redux/cake/cakeActions";

const HooksCakeContainer = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Cake Container - {state.cake.numOfCakes}</h1>
      <button onClick={() => dispatch(buyCake())}>Buy Cake</button>
      <button onClick={() => dispatch(cookCake())}>Cook Cake</button>
    </div>
  );
};

export default HooksCakeContainer;
