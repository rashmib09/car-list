import axios from "axios";
import React, { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const AddCar = (props: any) => {
  const [carData, setCarData] = useState({
    id: Math.floor(Math.random() * 10000000 + 1),
    brand: "",
    licensePlate: "",
    manufacturer: "",
    operationCity: "",
    status: "",
    createdAt: new Date(),
    lastUpdatedAt: new Date(),
  });

  // fetch car data after click on edit
  useEffect(() => {
    if (props.selectedCar.id) {
      setCarData({
        id: props.selectedCar.id,
        brand: props.selectedCar.brand,
        licensePlate: props.selectedCar.licensePlate,
        manufacturer: props.selectedCar.manufacturer,
        operationCity: props.selectedCar.operationCity,
        status: props.selectedCar.status,
        createdAt: new Date(props.selectedCar.createdAt),
        lastUpdatedAt: props.selectedCar.lastUpdatedAt,
      });
    }
  }, [props.selectedCar]);

  //set data after change
  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  //update/create method
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let reqBody = {
      brand: carData.brand,
      licensePlate: carData.licensePlate,
      operationCity: carData.operationCity,
      manufacturer: carData.manufacturer,
      status: carData.status,
      createdAt: carData.createdAt,
    };

    let id = carData.id;
    axios
      .put(
        "https://nckbku0m91.execute-api.eu-central-1.amazonaws.com/cars/" +
          `${carData.id}`,
        reqBody
      )
      .then((resp) => {
        props.setOpen(false);
        props.setAlert(true);
        props.getCarList();
      })
      .catch(() => {
        //reset();
      });
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>
          <strong>Add Car</strong>
        </DialogTitle>
        <DialogContent>
          <div className={"col-md-12 form-wrapper"}>
            <form
              id={"create-post-form"}
              onSubmit={handleSubmit}
              noValidate={true}
            >
              <div className="form-group col-md-12">
                <label htmlFor="brand"> Brand</label>
                <input
                  type="text"
                  id="brand"
                  onChange={(e) => handleChange(e)}
                  name="brand"
                  value={carData.brand}
                  className="form-control"
                  placeholder="Enter brand"
                />
              </div>

              <div className="form-group col-md-12">
                <label htmlFor="licensePlate"> License Plate </label>
                <input
                  type="text"
                  id="licensePlate"
                  onChange={(e) => handleChange(e)}
                  name="licensePlate"
                  value={carData.licensePlate}
                  className="form-control"
                  placeholder="Enter licence plate"
                />
              </div>

              <div className="form-group col-md-12">
                <label htmlFor="manufacturer"> Manufacturer </label>
                <input
                  type="text"
                  id="manufacturer"
                  onChange={(e) => handleChange(e)}
                  name="manufacturer"
                  value={carData.manufacturer}
                  className="form-control"
                  placeholder="Enter manufacturer"
                />
              </div>

              <div className="form-group col-md-12">
                <label htmlFor="operationCity"> Operation City </label>
                <input
                  type="text"
                  id="operationCity"
                  onChange={(e) => handleChange(e)}
                  name="operationCity"
                  value={carData.operationCity}
                  className="form-control"
                  placeholder="Enter operation city"
                />
              </div>

              <div className="form-group col-md-12">
                <label htmlFor="status"> Status </label>
                <Select
                  className="form-control"
                  name="status"
                  placeholder="Nothing Selected"
                  value={carData.status}
                  displayEmpty
                  onChange={handleChange}
                >
                  <MenuItem value="available">available</MenuItem>
                  <MenuItem value="in-maintenance">in-maintenance</MenuItem>
                  <MenuItem value="out-of-service">out-of-service</MenuItem>
                </Select>
              </div>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="success"
            type="submit"
            variant="outlined"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCar;
