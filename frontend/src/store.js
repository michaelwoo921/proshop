import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productListReducer, productDetailsReducer} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer} from './reducers/orderReducers';
import {
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer
    
} from './reducers/userReducers'

const middleware = [thunk];
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer
})

const cartItemsFromStorage = JSON.parse(localStorage.getItem('cartItems')) || [];
const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo')) || null;
const shippingAddressFromStorage = JSON.parse(localStorage.getItem('shippingAddress')) || {};


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: {userInfo: userInfoFromStorage, loading: false, error: ''},
};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)) );

export default store;