import { 
    CART_ADD_ITEM,
    CART_REMOVE_ITEM
  } from "../constants/cartConstants";

  export const cartReducer = (state={cartItems: []}, action) => {
    
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(i => i.product === item.product);
            
            return existItem 
            ? {...state, cartItems: state.cartItems.map(i => i.product === item.product ? item: i)} 
            : {...state, cartItems: [...state.cartItems, item] };

        case CART_REMOVE_ITEM:
            return {...state, cartItems: state.cartItems.filter(i => i.product !== action.payload)}

        default:
            return state;
    }
  }
