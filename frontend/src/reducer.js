import {
  CLEAR_ERRORS,
  IMPORT_CSV_FAIL,
  IMPORT_CSV_REQUEST,
  IMPORT_CSV_SUCCESS,
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

