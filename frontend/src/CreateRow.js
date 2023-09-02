import React, { useEffect, useState } from "react";
import { MdNoteAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createRow } from "./action";
import { CREATE_CSV_RESET } from "./constants";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const CreateRow = () => {
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.createData);

  const [open, setOpen] = useState(false);

  const [part, setPart] = useState("");
  const [altpart, setAltpart] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [engine, setEngine] = useState("");
  const [locA, setLocA] = useState("");
  const [car, setCar] = useState("");
  const [locAStock, setLocAStock] = useState();
  const [locB, setLocB] = useState("");
  const [locBStock, setLocBStock] = useState();
  const [unit, setUnit] = useState("");
  const [rate, setRate] = useState();
  const [value, setValue] = useState();
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert("Row Created Successfully");
      dispatch({ type: CREATE_CSV_RESET });
    }
  }, [dispatch, error, success]);

  const updateToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const saveUpdateHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("Part", part);
    myForm.set("Alt_Part", altpart);
    myForm.set("Name", name);
    myForm.set("Brand", brand);
    myForm.set("Model", model);
    myForm.set("Engine", engine);
    myForm.set("Loc_A", locA);
    myForm.set("Car", car);
    myForm.set("Loc_A_Stock", locAStock);
    myForm.set("Loc_B", locB);
    myForm.set("Loc_B_Stock", locBStock);
    myForm.set("Unit", unit);
    myForm.set("Rate", rate);
    myForm.set("Value", value);
    myForm.set("Remarks", remarks);

    dispatch(createRow(myForm));

    setOpen(false); // Close the dialog
  };

  return (
    <>
      <button className="update" onClick={updateToggle}>
        Create Row <MdNoteAdd />
      </button>

      {/* <div className="tableContainer"> */}

      <Dialog
        aria-labelledby="Simple-dialog-title"
        open={open}
        maxWidth="xl"
        onClose={updateToggle}
        className="dialog"
      >
        <form onSubmit={saveUpdateHandler} id="updateForm" className="createForm">
          <DialogTitle>Create Inventory</DialogTitle>
          <DialogContent className="submitDialogActions">
            <div>
              <p>
                Part :
                <input
                  type="text"
                  placeholder="Part"
                  value={part}
                  onChange={(e) => setPart(e.target.value)}
                />
              </p>
            </div>
            <div>
              <p>
                Alt Part :
                <input
                  type="text"
                  placeholder="Alt Part"
                  value={altpart}
                  onChange={(e) => setAltpart(e.target.value)}
                />
              </p>
            </div>

            <div>
              <p>
                Name :
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </p>
            </div>

            <div>
              <p>
                Brand :
                <input
                  type="text"
                  placeholder="Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </p>
            </div>

            <div>
              <p>
                Model :
                <input
                  type="text"
                  placeholder="Model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </p>
            </div>

            <div>
              <p>
                Engine :
                <input
                  type="text"
                  placeholder="Engine"
                  value={engine}
                  onChange={(e) => setEngine(e.target.value)}
                />
              </p>
            </div>

            <div>
              <p>
                Car :
                <input
                  type="text"
                  placeholder="Car"
                  value={car}
                  onChange={(e) => setCar(e.target.value)}
                />
              </p>
            </div>

            <div>
              <p>
                Loc A :
                <input
                  type="text"
                  placeholder="Loc A"
                  value={locA}
                  onChange={(e) => setLocA(e.target.value)}
                />
              </p>
            </div>

            <div>
              <p>
                Loc A Stock :
                <input
                  type="number"
                  placeholder="Loc A Stock"
                  min="0"
                  value={locAStock}
                  onChange={(e) => setLocAStock(e.target.value)}
                />
              </p>
            </div>

            <div>
              <p>
                Loc B :
                <input
                  type="text"
                  placeholder="Loc B"
                  value={locB}
                  onChange={(e) => setLocB(e.target.value)}
                />
              </p>
            </div>

            <div>
              <p>
                Loc B Stock :
                <input
                  type="number"
                  min="0"
                  placeholder="Loc B Stock"
                  value={locBStock}
                  onChange={(e) => setLocBStock(e.target.value)}
                />
              </p>
            </div>

            <div>
              <p>
                Unit :
                <input
                  type="text"
                  placeholder="Unit"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                />
              </p>
            </div>

            <div>
              <p>
                Rate :
                <input
                  type="number"
                  placeholder="Rate"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </p>
            </div>

            <div>
              <p>
                Value :
                <input
                  type="number"
                  min="0"
                  placeholder="Value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </p>
            </div>

            <div>
              <p>
                Remarks :
                <input
                  type="text"
                  placeholder="Remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </p>
            </div>
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
      {/* </div> */}
    </>
  );
};

export default CreateRow;
