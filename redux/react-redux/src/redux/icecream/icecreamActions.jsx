import { BUY_ICECREAM, COOK_ICECREAM } from "./icecreamTypes";

export const buyIcecream = () => {
  return {
    type: BUY_ICECREAM,
  };
};

export const cookIcecream = () => {
  return {
    type: COOK_ICECREAM,
  };
};
