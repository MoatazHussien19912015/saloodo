import * as actions from '../types/parcelActionTypes';
    
    function parcelsReducer ( state = {
        loading: false,
        parcels: [], 
        error: null
      }, action) {
        switch(action.type){

            case actions.GET_PARCELS_REQUEST: return { ...state, loading: true};
            case actions.GET_PARCELS_SUCCESS: return { ...state, loading: false, parcels: [...action.payload.data.parcels], error: null};
            case actions.GET_PARCELS_FAIL: return { ...state, loading: false, parcels: [], error: action.payload };
            
            case actions.PICK_PARCEL_REQUEST: return { ...state, loading: true};
            case actions.PICK_PARCEL_SUCCESS: return { ...state, loading: false, parcels: state.parcels.filter(parcel=>parcel._id != action.payload.data.parcel._id), error: null};
            case actions.PICK_PARCEL_FAIL: return { ...state, loading: false, error: action.payload };


            default: return state;
        }
      }

      export default parcelsReducer;