import React, { useState } from "react";
import "./App.css";
import Papa from "papaparse";
import { DataGrid } from "@mui/x-data-grid";

function App() {
  const [data, setdata] = useState([]);

  const uploadFileHandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setdata(results.data);
      },
    });
  };

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
    data.forEach((item, index) => {
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

  return (
    <>
      <div className="App">
        <h1>CSV Data Table</h1>
        <input type="file" accept=".csv" onChange={uploadFileHandler} />
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
      </div>
    </>
  );
}

export default App;
