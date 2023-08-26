import React, { useEffect, useState } from "react";
import "./App.css";
import Papa from "papaparse";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, importCSV } from "./action";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";

function App() {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.import);

  const [data, setdata] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);
  // const [update, setUpdate] = useState("");

  const uploadFileHandler = (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("fileInput"); // Add an ID to the input element

    const file = fileInput.files[0]; // Access the selected file

    if (file) {
      const formData = new FormData();
      formData.append("csvFile", file);

      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setdata(results.data);
        },
      });
      dispatch(importCSV(formData));
    } else {
      // If no file is selected
      alert("No file selected");
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const columns = [
    { field: "Part", headerName: "Part", minWidth: 200, flex: 1 },
    {
      field: "Alt_Part",
      headerName: "Alt_Part",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "Name",
      headerName: "Name",
      minWidth: 250,
      flex: 0.5,
    },
    {
      field: "Brand",
      headerName: "Brand",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "Model",
      headerName: "Model",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "Engine",
      headerName: "Engine",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "Car",
      headerName: "Car",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "Loc_A",
      headerName: "Loc_A",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "Loc_A_Stock",
      headerName: "Loc_A_Stock",
      type: "number",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "Loc_B",
      headerName: "Loc_B",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "Loc_B_Stock",
      headerName: "Loc_B_Stock",
      type: "number",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "Unit",
      headerName: "Unit",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "Rate",
      headerName: "Rate",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "Value",
      headerName: "Value",
      type: "number",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "Remarks",
      headerName: "Remarks",
      minWidth: 150,
      flex: 0.5,
    },
  ];

  const rows = [];

  data &&
    data
      .filter((item) => {
        return keyword === ""
          ? item
          : (item.Part && item.Part.includes(keyword)) ||
              (item.Alt_Part && item.Alt_Part.includes(keyword));
      })
      .forEach((item, index) => {
        rows.push({
          id: index,
          Part: item.Part,
          Alt_Part: item.Alt_Part,
          Name: item.Name,
          Brand: item.Brand,
          Model: item.Model,
          Engine: item.Engine,
          Car: item.Car,
          Loc_A: item.Loc_A,
          Loc_A_Stock: item.Loc_A_Stock,
          Loc_B: item.Loc_B,
          Loc_B_Stock: item.Loc_B_Stock,
          Unit: item.Unit,
          Rate: item.Rate,
          Value: item.Value,
          Remarks: item.Remarks,
        });
      });

  const searchFileHandler = (e) => {
    e.preventDefault();
  };

  const updateToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const saveUpdateHandler = () => {
    setOpen(false); // Close the dialog
  };
  

  const updateColumns = [
    { field: "Part", headerName: "Part", minWidth: 200, flex: 1 },
    { field: "Alt_Part", headerName: "Alt_Part", minWidth: 200, flex: 1 },
    {
      field: "Model",
      headerName: "Model",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "Loc_A_Stock",
      headerName: "Loc_A_Stock",
      type: "number",
      minWidth: 100,
      flex: 0.5,
      editable: true
    },
    {
      field: "Loc_B_Stock",
      headerName: "Loc_B_Stock",
      type: "number",
      minWidth: 100,
      flex: 0.5,
      editable: true
    },
  ];

  return (
    <>
      <div className="App">
        <h1>CSV Data Table</h1>
        <form onSubmit={uploadFileHandler}>
          <input type="file" accept=".csv" id="fileInput" />
          <button type="submit">Import</button>
        </form>

        <form className="searchBox" onSubmit={searchFileHandler}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setKeyword(e.target.value)}
          />

          <input type="submit" value="search" />
        </form>

        <button onClick={updateToggle} className="update">
          Update Inventory
        </button>
      </div>

      <div>
        {data.length ? (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myTable"
            // autoHeight
          />
        ) : null}

        <Dialog
          aria-labelledby="Simple-dialog-title"
          open={open}
          onClose={updateToggle}
        >
          <DialogTitle>Update Inventory</DialogTitle>
          <DialogContent>
            {data.length ? (
              <DataGrid
                rows={rows}
                columns={updateColumns}
                pageSize={10}
                className="myTable"
                // onChange={(e) => setUpdate(e.target.value)}
              />
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={updateToggle} color="secondary">
              Close
            </Button>
            <Button onClick={saveUpdateHandler} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default App;
