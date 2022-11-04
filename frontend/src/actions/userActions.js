import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_RESET,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_PROFILE_RESET,
  } from '../constants/userConstants';
  import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
    dispatch({type: USER_LOGIN_REQUEST});
    try{
        const config = {
            headers: {'Content-Type': 'application/json'},
        }
        const res = await axios.post('/api/users/login',{email, password}, config);
        dispatch({type: USER_LOGIN_SUCCESS, payload: res.data});
        console.log(res.data);
        localStorage.setItem('userInfo', JSON.stringify(res.data))
    }catch(error){
        dispatch({type:USER_LOGIN_FAIL, payload: error.response ? error.response.data.message : error.message});
        console.log(error.response.data);
    }

}

export const logout = () => dispatch => {
    dispatch({type: USER_LOGOUT});
    localStorage.removeItem('userInfo');
}