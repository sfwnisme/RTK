import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { buyCake } from "../redux";
import { cookCake } from "../redux/cake/cakeActions";
import { buyIcecream, cookIcecream } from "../redux/icecream/icecreamActions";

const HooksNewCakeContainer = () => {
  const numOfCakes = useSelector((state) => state.cake.numOfCakes);
  const dispatch = useDispatch();
  const [number, setNumber] = useState(1);
  console.log(number);
  return (
    <div>
      <h1>Cake Container - {numOfCakes}</h1>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={() => dispatch(buyCake(+number))}>
        Buy {number} Cake
      </button>
      <button onClick={() => dispatch(cookCake(+number))}>
        Cook {number} Cake
      </button>
    </div>
  );
};
export default HooksNewCakeContainer;
