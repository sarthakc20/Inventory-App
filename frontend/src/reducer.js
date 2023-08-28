import {
  CLEAR_ERRORS,
  DELETE_ROW_FAIL,
  DELETE_ROW_REQUEST,
  DELETE_ROW_RESET,
  DELETE_ROW_SUCCESS,
  GET_CSV_FAIL,
  GET_CSV_REQUEST,
  GET_CSV_SUCCESS,
  IMPORT_CSV_FAIL,
  IMPORT_CSV_REQUEST,
  IMPORT_CSV_SUCCESS,
  UPDATE_CSV_FAIL,
  UPDATE_CSV_REQUEST,
  UPDATE_CSV_RESET,
  UPDATE_CSV_SUCCESS,
} from "./constants";

export const importReducer = (state = { csvData: [] }, action) => {
  switch (action.type) {
    case IMPORT_CSV_REQUEST:
      return {
        loading: true,
      };

    case IMPORT_CSV_SUCCESS:
      return {
        ...state,
        loading: false,
        csvData: action.payload,
      };

    case IMPORT_CSV_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getCsvReducer = (state = { csvdata: [] }, action) => {
  switch (action.type) {
    case GET_CSV_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CSV_SUCCESS:
      return {
        ...state,
        loading: false,
        csvdata: action.payload,
      };
    case GET_CSV_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const editRowReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ROW_REQUEST:
    case UPDATE_CSV_REQUEST:  
      return {
        ...state,
        loading: true,
      };

    case DELETE_ROW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

      case UPDATE_CSV_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };  

    case DELETE_ROW_FAIL:
    case UPDATE_CSV_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_ROW_RESET:
      return {
        ...state,
        isDeleted: false,
      };

      case UPDATE_CSV_RESET:
        return {
          ...state,
          isUpdated: false,
        };  
      
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
