import axios from "axios";
import {
    CLEAR_ERRORS,
  IMPORT_CSV_FAIL,
  IMPORT_CSV_REQUEST,
  IMPORT_CSV_SUCCESS,
} from "./constants";

// Import CSV File
export const importCSV = (csvData) => async (dispatch) => {
  try {
    dispatch({
      type: IMPORT_CSV_REQUEST,
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post("api/v1", csvData, config);

    dispatch({ type: IMPORT_CSV_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: IMPORT_CSV_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
