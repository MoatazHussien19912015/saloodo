import * as actions from '../types/bikerAuthActionTypes';
import axios from 'axios';
import {url} from '../../config';

export const register = (x) => (dispatch, getState) => {
    dispatch({type: actions.BIKER_REGISTER_REQUEST});
    axios.post(`${url}/bikers/register`,x).
    then(result => {
        localStorage.setItem('biker_token', JSON.stringify(result.data.token));
        localStorage.removeItem('sender_token');
        dispatch({type: actions.BIKER_REGISTER_SUCCESS, payload: result});
    })
    .catch(err=> { 
        localStorage.removeItem('biker_token');
        console.log(err); dispatch({type: actions.BIKER_REGISTER_FAIL, payload: err.response.data});
    });
};




    export const login = (x) => (dispatch, getState) => {
        console.log(x);
        dispatch({type: actions.BIKER_LOGIN_REQUEST});
        axios.post(`${url}/bikers/login`,x).
        then(result => { console.log(result.data.token);
            localStorage.setItem('biker_token', JSON.stringify(result.data.token));
            localStorage.removeItem('sender_token');
            dispatch({type: actions.BIKER_LOGIN_SUCCESS, payload: result});
        })
        .catch(err=> {
            localStorage.removeItem('biker_token');
            console.log(err); dispatch({type: actions.BIKER_LOGIN_FAIL, payload: err.response.data});
        });
    };


    export const getProfile = (token) => (dispatch, getState) => { console.log(token);
        dispatch({type: actions.BIKER_PROFILE_REQUEST});
        axios.get(`${url}/bikers/profile`, {headers: {'x-auth': token /* getState().bikerAuthReducer.token */}}).
        then(result => {
            localStorage.setItem('biker_token', JSON.stringify(result.data.token));
            dispatch({type: actions.BIKER_PROFILE_SUCCESS, payload: result});
        })
        .catch(err=> {
            localStorage.removeItem('biker_token');
            console.log(err); dispatch({type: actions.BIKER_PROFILE_FAIL, payload: err.response.data});
        });
    };

    

   

    export const logout = () => (dispatch, getState) => {
        dispatch({type: actions.BIKER_LOGOUT_REQUEST});
        localStorage.removeItem('biker_token');
        dispatch({type: actions.BIKER_LOGOUT_SUCCESS});
       
    };