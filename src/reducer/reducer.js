import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL, CREATE_DATA_REQUEST, CREATE_DATA_FAIL, CREATE_DATA_SUCCESS, UPDATE_DATA_REQUEST, UPDATE_DATA_SUCCESS, UPDATE_DATA_FAIL, DELETE_DATA_REQUEST, DELETE_DATA_SUCCESS, DELETE_DATA_FAIL } from "../constant/action";

// reducer.js
const initialState = {
    scannedText: null,
    loading: false,
    success: false,
    data: [],
    error: null
  };
  
  const scannerReducer = (state = initialState, action) => {
    switch (action.type) {
      // FETCH
      case FETCH_DATA_REQUEST:
        return {
          ...state,
          loading: true,
          // scannedText: action.payload,
        };
      case FETCH_DATA_SUCCESS:
        return{
          loading: false,
          success: true,
          data: action.payload,
        };
      case FETCH_DATA_FAIL:
        return{
          loading: false,
          success: false,
          data: action.payload,
        }
      
        // CREATE
      case CREATE_DATA_REQUEST:
        return{
          ...state,
          loading: true
        }

      case CREATE_DATA_SUCCESS:
      return{
        loading: false,
        success: true,
        data: [...state.data, action.payload],
      };

      case CREATE_DATA_FAIL:
        return{
          loading: false,
          success: false,
          data: action.payload,
        }

      // UPDATE
      case UPDATE_DATA_REQUEST:
        return{
          ...state,
          loading: true
        }

      case UPDATE_DATA_SUCCESS:
      return{
        ...state,
        loading: false,
        success: true,
        data: state.data.map(item =>
          item.id === action.id ? action.payload : item
        )
      };

      case UPDATE_DATA_FAIL:
        return{
          ...state,
          loading: false,
          success: false,
          data: action.payload,
        }

      // DELETE
      case DELETE_DATA_REQUEST:
        return{
          ...state,
          loading: true
        }

      case DELETE_DATA_SUCCESS:
      return{
        ...state,
        loading: false,
        success: true,
        data: state.data.map(item => item.id !== action.id)
      };

      case DELETE_DATA_FAIL:
        return{
          ...state,
          loading: false,
          success: false,
          data: action.payload,
        }

      default:
        return state;
    }
  };
  
  export default scannerReducer;
  