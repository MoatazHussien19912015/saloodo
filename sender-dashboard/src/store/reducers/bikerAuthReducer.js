import * as actions from '../types/bikerAuthActionTypes';
    
    function authReducer ( state = {
      loading: false,
      biker: null,
      biker_token: localStorage.getItem('biker_token')?JSON.parse(localStorage.getItem('biker_token')):null,
      parcels: [], 
      error: null
      }, action) {
        switch(action.type){

            
          case actions.BIKER_REGISTER_REQUEST: return { ...state, loading: true};
          case actions.BIKER_REGISTER_SUCCESS: return { ...state, loading: false, biker_token: action.payload.data.token, error: null};
          case actions.BIKER_REGISTER_FAIL: return { ...state, loading: false, biker_token: null, error: action.payload };
          

          case actions.BIKER_LOGIN_REQUEST: return { ...state, loading: true};
          case actions.BIKER_LOGIN_SUCCESS: return { ...state, loading: false, biker_token: action.payload.data.token, error: null};
          case actions.BIKER_LOGIN_FAIL: return { ...state, loading: false, biker_token: null, error: action.payload };


          case actions.BIKER_PROFILE_REQUEST: return { ...state, loading: true};
          case actions.BIKER_PROFILE_SUCCESS: return { ...state, loading: false, biker: action.payload.data.biker, biker_token: action.payload.data.token, parcels: action.payload.data.parcels, error: null};
          case actions.BIKER_PROFILE_FAIL: return { ...state, loading: false, biker: null, biker_token: null, parcels: [], error: action.payload };

          
          case actions.BIKER_LOGOUT_REQUEST: return { ...state, loading: true};
          case actions.BIKER_LOGOUT_SUCCESS: return { ...state, loading: false, biker: null, biker_token: null};
           


            default: return state;
        }
      }

      export default authReducer;