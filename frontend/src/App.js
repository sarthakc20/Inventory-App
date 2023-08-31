import React, { useEffect, useState } from "react";
import "./App.css";
import Papa from "papaparse";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteRow,
  getCSVData,
  importCSV,
  updateData,
} from "./action";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { MdDelete } from "react-icons/md";
import { DELETE_ROW_RESET, UPDATE_CSV_RESET } from "./constants";
import { CSVLink } from "react-csv";

function App() {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.import);
  const {
    error: deleteError,
    isDeleted,
    isUpdated,
  } = useSelector((state) => state.editRow);
  const { error: getError, csvdata } = useSelector((state) => state.getCSV);

  const [data, setdata] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const [stockChange, setStockChange] = useState([]);

  const updateEffectOnChange = (value, id) => {
    const existing = stockChange.some((el) => el.id === id);
    if (!existing) {
      setStockChange([...stockChange, { id, ...value }]);
    } else {
      const modifiedStockChange = stockChange.map((el) => {
        if (el.id === id) {
          return { ...el, ...value };
        }
        return el;
      });
      setStockChange(modifiedStockChange);
    }
  };

  console.log(data);

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
      dispatch(getCSVData());
    } else {
      // If no file is selected
      alert("No file selected");
    }
  };

  const deleteRowHandler = (id) => {
    dispatch(deleteRow(id));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }

    if (getError) {
      alert(getError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("Data Updated Successfully");
      dispatch({ type: UPDATE_CSV_RESET });
    }

    if (isDeleted) {
      alert("Row Deleted Successfully");
      dispatch({ type: DELETE_ROW_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, getError, isUpdated]);

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
    {
      field: "action",
      flex: 0.3,
      headerName: "Action",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => deleteRowHandler(params.id)}>
              <MdDelete />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  csvdata &&
    csvdata
      .filter((item) => {
        return keyword === ""
          ? item
          : (item.Part && item.Part.includes(keyword)) ||
              (item.Alt_Part && item.Alt_Part.includes(keyword));
      })
      .forEach((item, index) => {
        rows.push({
          id: item._id,
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
    setStockChange([]);
    open ? setOpen(false) : setOpen(true);
  };

  const refreshToggle = () => {
    dispatch(getCSVData());
  };

  const saveUpdateHandler = (e) => {
    e.preventDefault();

    dispatch(updateData(stockChange));

    setOpen(false); // Close the dialog
  };

  const exportRow = [];

  csvdata &&
    csvdata
      .filter((item) => {
        return keyword.length >= 3
          ? item
          : (item.Part && item.Part.includes(keyword)) ||
              (item.Alt_Part && item.Alt_Part.includes(keyword));
      })
      .forEach((item, index) => {
        const rowWithoutId = {
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
        };

        exportRow.push(rowWithoutId);
      });

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
            placeholder="Search  Part or Alt_Part..."
            onChange={(e) => setKeyword(e.target.value)}
          />

          <input type="submit" value="Search" />
        </form>

        <button onClick={updateToggle} className="update">
          Update Inventory
        </button>

        <button onClick={refreshToggle} className="update">
          Refresh
        </button>

        <CSVLink data={exportRow}>Export CSV</CSVLink>
      </div>

      <div className="tableContainer">
        {csvdata.length ? (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myTable"
          />
        ) : <p>-- No Data Yet --</p>}

        <Dialog
          aria-labelledby="Simple-dialog-title"
          open={open}
          maxWidth="xl"
          onClose={updateToggle}
          className="dialog"
        >
          <form onSubmit={saveUpdateHandler} id="updateForm">
            <DialogTitle>Update Inventory</DialogTitle>
            <DialogContent className="submitDialogActions">
              <table className="custom-table">
                <tr>
                  <th className="table-header">Part</th>
                  <th className="table-header">Alt_Part</th>
                  <th className="table-header">Model</th>
                  <th className="table-header">Loc_A_Stock</th>
                  <th className="table-header">Loc_B_Stock</th>
                </tr>
                {rows.length ? (
                  rows.map((item, key) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.Part}</td>
                        <td>{item.Alt_Part}</td>
                        <td>{item.Model}</td>
                        <td>
                          <input
                            type="number"
                            onChange={(e) =>
                              updateEffectOnChange(
                                { locAStock: e.target.value },
                                item.id
                              )
                            }
                            defaultValue={item.Loc_A_Stock}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            onChange={(e) =>
                              updateEffectOnChange(
                                { locBStock: e.target.value },
                                item.id
                              )
                            }
                            defaultValue={item.Loc_B_Stock}
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <p>-- No Data Available --</p>
                )}
              </table>
            </DialogContent>
            <DialogActions>
              <Button onClick={updateToggle} color="secondary">
                Close
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  );
}

export default App;
