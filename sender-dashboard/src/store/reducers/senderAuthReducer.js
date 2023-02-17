import * as actions from '../types/senderAuthActionTypes';
    
    function senderAuthReducer ( state = {
        loading: false,
        sender: null,
        sender_token: localStorage.getItem('sender_token')?JSON.parse(localStorage.getItem('sender_token')):null,
        parcels: [], 
        error: null
      }, action) {
        switch(action.type){

            case actions.SENDER_REGISTER_REQUEST: return { ...state, loading: true};
            case actions.SENDER_REGISTER_SUCCESS: return { ...state, loading: false, sender_token: action.payload.data.token, error: null};
            case actions.SENDER_REGISTER_FAIL: return { ...state, loading: false, sender_token: null, error: action.payload };
            

            case actions.SENDER_LOGIN_REQUEST: return { ...state, loading: true};
            case actions.SENDER_LOGIN_SUCCESS: return { ...state, loading: false, sender_token: action.payload.data.token, error: null};
            case actions.SENDER_LOGIN_FAIL: return { ...state, loading: false, sender_token: null, error: action.payload };


            case actions.SENDER_PROFILE_REQUEST: return { ...state, loading: true};
            case actions.SENDER_PROFILE_SUCCESS: return { ...state, loading: false, sender: action.payload.data.sender, sender_token: action.payload.data.token, parcels: action.payload.data.parcels, error: null};
            case actions.SENDER_PROFILE_FAIL: return { ...state, loading: false, sender: null, sender_token: null, parcels: [], error: action.payload };

            
            case actions.SENDER_LOGOUT_REQUEST: return { ...state, loading: true};
            case actions.SENDER_LOGOUT_SUCCESS: return { ...state, loading: false, sender: null, sender_token: null};
           


            default: return state;
        }
      }

      export default senderAuthReducer;