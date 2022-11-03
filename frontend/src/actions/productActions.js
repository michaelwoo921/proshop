import { 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS
 } from "../constants/productConstants";
import axios from 'axios';

export const listProducts = () => async (dispatch) => {
    dispatch({type: PRODUCT_LIST_REQUEST});
    try{
       
        const res = await axios.get('/api/products');
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: res.data});

    }catch(err){
        dispatch({type: PRODUCT_LIST_FAIL, payload: err.response ? err.response.data.message : err.message})
    }
}

export const listProductDetails = (productId) => async dispatch => {
    dispatch({type: PRODUCT_DETAILS_REQUEST});
    try{
        const res = await axios.get(`/api/products/${productId}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS, payload: res.data
        })

    }catch(err){
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: err.response ? err.response.data.message : err.message})
    }
}
