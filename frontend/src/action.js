import axios from "axios";
import {
  CLEAR_ERRORS,
  DELETE_ROW_FAIL,
  DELETE_ROW_REQUEST,
  DELETE_ROW_SUCCESS,
  GET_CSV_FAIL,
  GET_CSV_REQUEST,
  GET_CSV_SUCCESS,
  IMPORT_CSV_FAIL,
  IMPORT_CSV_REQUEST,
  IMPORT_CSV_SUCCESS,
  UPDATE_CSV_FAIL,
  UPDATE_CSV_REQUEST,
  UPDATE_CSV_SUCCESS,
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

// Get CSV File
export const getCSVData = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CSV_REQUEST });

    const { data } = await axios.get(`/api/v1`);

    dispatch({ type: GET_CSV_SUCCESS, payload: data.csvdata });
  } catch (error) {
    dispatch({ type: GET_CSV_FAIL, payload: error.response.data.message });
  }
};

// Update CSV Data
export const updateData = (id, csvData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_CSV_REQUEST,
    });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`api/v1/${id}`, csvData, config);

    dispatch({ type: UPDATE_CSV_SUCCESS, payload: data.success });

  } catch (error) {
    dispatch({
      type: UPDATE_CSV_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete a Row
export const deleteRow = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ROW_REQUEST,
    });

    const { data } = await axios.delete(`api/v1/${id}`);

    dispatch({ type: DELETE_ROW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ROW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
