import { CREATE_DATA_REQUEST, CREATE_DATA_SUCCESS, DELETE_DATA_REQUEST, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, UPDATE_DATA_FAIL, UPDATE_DATA_REQUEST, UPDATE_DATA_SUCCESS } from "../constant/action"
import API from "../api/api";

// FOR FETCHING DATA
export const fetch_data_data = (action) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_DATA_REQUEST });
        dispatch({ type: FETCH_DATA_SUCCESS, payload: action.payload});
    } catch (error) {
        
    }
}

// FOR CREATING DATA
export const create_data_data = (newItem) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_DATA_REQUEST });
        dispatch({ type: CREATE_DATA_SUCCESS, payload: newItem });
    } catch (error) {
        
    }
}

export const update_data_data = (newItem, id) => async (dispatch) => {
    try {
      // Dispatch request action to indicate the update process has started
      dispatch({ type: UPDATE_DATA_REQUEST });
  
      // Simulate an API call to update the data
      // For example:
      const { data } = await API.put(`blogs-list/${id}`, newItem);

      dispatch({ type: UPDATE_DATA_SUCCESS, payload: data })
      
    } catch (error) {
      // Dispatch failure action in case of error
      dispatch({ type: UPDATE_DATA_FAILURE, payload: error.message });
    }
  }

export const delete_data_data = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DATA_REQUEST });

    const { data } = await API.delete(`blogs-list/${id}`);

    dispatch({ type: UPDATE_DATA_SUCCESS, payload: data })
  } catch (error) {
    
    dispatch({ type: UPDATE_DATA_FAILURE, payload: error.message });
  }
}