import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordered, restocked } from "./icecreamSlice";

const IcecreamView = () => {
  const [number, setNumber] = useState(2);
  const icecream = useSelector((state) => state.icecream.numOfIcecreams);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number Of Icecreams - {icecream}</h2>
      <button onClick={() => dispatch(ordered(+number))}>
        Order {number} Icecream
      </button>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={() => dispatch(restocked(+number))}>
        Restock {number} Icecreams
      </button>
    </div>
  );
};

export default IcecreamView;
