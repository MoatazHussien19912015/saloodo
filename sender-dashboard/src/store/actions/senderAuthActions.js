import * as actions from '../types/senderAuthActionTypes';
import axios from 'axios';
import {url} from '../../config';

export const register = (x) => (dispatch, getState) => {
    dispatch({type: actions.SENDER_REGISTER_REQUEST});
    axios.post(`${url}/senders/register`,x).
    then(result => {
        localStorage.setItem('sender_token', JSON.stringify(result.data.token));
        localStorage.removeItem('biker_token');
        dispatch({type: actions.SENDER_REGISTER_SUCCESS, payload: result});
    })
    .catch(err=> { 
        localStorage.removeItem('sender_token');
        console.log(err); dispatch({type: actions.SENDER_REGISTER_FAIL, payload: err.response.data});
    });
};




    export const login = (x) => (dispatch, getState) => {
        console.log(x);
        dispatch({type: actions.SENDER_LOGIN_REQUEST});
        axios.post(`${url}/senders/login`,x).
        then(result => { console.log(result.data.token);
            localStorage.setItem('sender_token', JSON.stringify(result.data.token));
            localStorage.removeItem('biker_token');
            dispatch({type: actions.SENDER_LOGIN_SUCCESS, payload: result});
        })
        .catch(err=> {
            localStorage.removeItem('sender_token');
            console.log(err); dispatch({type: actions.SENDER_LOGIN_FAIL, payload: err.response.data});
        });
    };


    export const getProfile = (token) => (dispatch, getState) => { console.log(token);
        dispatch({type: actions.SENDER_PROFILE_REQUEST});
        axios.get(`${url}/senders/profile`, {headers: {'x-auth': token /* getState().senderAuthReducer.token */}}).
        then(result => {
            localStorage.setItem('sender_token', JSON.stringify(result.data.token));
            dispatch({type: actions.SENDER_PROFILE_SUCCESS, payload: result});
        })
        .catch(err=> {
            localStorage.removeItem('sender_token');
            console.log(err); dispatch({type: actions.SENDER_PROFILE_FAIL, payload: err.response.data});
        });
    };

    

   

    export const logout = () => (dispatch, getState) => {
        dispatch({type: actions.SENDER_LOGOUT_REQUEST});
        localStorage.removeItem('sender_token');
        dispatch({type: actions.SENDER_LOGOUT_SUCCESS});
       
    };