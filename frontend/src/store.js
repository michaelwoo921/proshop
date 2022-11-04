import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productListReducer, productDetailsReducer} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const middleware = [thunk];
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
})

const cartItemsFromStorage = JSON.parse(localStorage.getItem('cartItems')) || [];

const initialState = {
    cart: {cartItems: cartItemsFromStorage}
};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)) );

export default store;