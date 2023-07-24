import { BUY_CAKE, COOK_CAKE } from "./cakeTypes";

export const buyCake = (number = 1) => {
  return {
    type: BUY_CAKE,
    payload: number,
  };
};
export const cookCake = (number = 1) => {
  return {
    type: COOK_CAKE,
    payload: number,
  };
};
