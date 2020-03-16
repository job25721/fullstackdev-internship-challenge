import * as types from "./type";
import * as actionMethod from "./actions";
const initialState = {
  products: null,
  product: null,
  productsLoaded: false,
  coin : [1,2,5,10],
  submitBuying : false,
  buyingDetails : null,
  currentCoin : 0
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
        ...state,
        buyingDetails : action.payload
      }
    case types.CLEAR_CART:
      return{
        ...state,
        product : null
      }
    case types.TOGGLE_SUBBIT:
      return {
        ...state,
        submitBuying : !state.submitBuying,
      }
    case types.UPDATE_COIN:
      return {
        ...state,
        currentCoin : action.payload
      }
    default:
      return state;
  }
};
export default reducer;
