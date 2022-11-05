import {
    ORDER_CREATE_FAIL, 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_RESET, 
    ORDER_CREATE_SUCCESS} from '../constants/orderConstants';
import axios from 'axios';


    export const createOrder = (order) => async (dispatch, getState) => {
        dispatch({type: ORDER_CREATE_REQUEST});
        const { userInfo } =getState().userLogin;
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
            }
            const res = await axios.post(`/api/orders`, order, config);
            dispatch({type: ORDER_CREATE_SUCCESS, payload: res.data});
           
        }catch(error){
            dispatch({type: ORDER_CREATE_FAIL, payload: error.response ? error.response.data.message : error.message});
            console.log(error.response.data);
        }
    
    }