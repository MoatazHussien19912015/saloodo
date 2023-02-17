import * as actions from '../types/parcelActionTypes';
import axios from 'axios';
import {url} from '../../config';


export const getNewParcels = (token) => (dispatch, getState) => {
    dispatch({type: actions.GET_PARCELS_REQUEST});
    axios.get(`${url}/parcels/get-new-parcels`, {headers: {'x-auth': token}}).
    then(result => { 
        dispatch({type: actions.GET_PARCELS_SUCCESS, payload: result});
    })
    .catch(err=> {
        console.log(err); dispatch({type: actions.GET_PARCELS_FAIL, payload: err.response.data});
    });
};

export const pickParcel = (token, id, obj) => (dispatch, getState) => {
    dispatch({type: actions.PICK_PARCEL_REQUEST});
    axios.patch(`${url}/parcels/pick-parcel/${id}`, obj, {headers: {'x-auth': token}}).
    then(result => { 
        dispatch({type: actions.PICK_PARCEL_SUCCESS, payload: result});
    })
    .catch(err=> {
        console.log(err); dispatch({type: actions.PICK_PARCEL_FAIL, payload: err.response.data});
    });
};