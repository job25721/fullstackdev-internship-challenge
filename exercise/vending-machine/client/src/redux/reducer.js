import * as types from "./type";
import * as actionMethod from "./actions";
const initialState = {
  products: null,
  product: null,
  productsLoaded: false,
  dis : false,
  coin : [1,2,5,10]
};

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case types.GET_ONE_PRODUCT:
      return {
        ...state,
        product: action.payload
      };
    case types.LISTS_PRODUCT:
      actionMethod.appendProducts(action.payload);
      return {
        ...state,
        productsLoaded: true
      };
    
    case types.BUY_PRODUCT:
      return {

      }
    case "testDispatch" :
      return {
        ...state,
        dis : !state.dis
      }
    default:
      return state;
  }
};
export default reducer;
