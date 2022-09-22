import React, { useEffect, useState } from "react";
import axios from "axios";
import AddCar from "./AddCar";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";

const AddButton = styled(Button)({
  margin: "20px",
  align: "center",
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#518bb3",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function CarList() {
  const [carList, setCarList] = useState([]);
  const [selectedCar, setSelectedCar] = useState({});
  const [isAlert, setAlert] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getCarList();
  }, []);

  const titleCase = (str: any) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const getCarList = () => {
    axios
      .get(`https://nckbku0m91.execute-api.eu-central-1.amazonaws.com/cars`)
      .then((data: any) => {
        setCarList(data.data);
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
    setSelectedCar({});
  };
  const editCar = (car: any) => {
    setSelectedCar(car);
    setOpen(true);
  };
  const deletecar = (id: number) => {
    axios
      .delete(
        `https://nckbku0m91.execute-api.eu-central-1.amazonaws.com/cars/${id}`
      )
      .then((data) => {
        getCarList();
      });
  };

  return (
    <div className="">
      {open ? (
        <AddCar
          setOpen={setOpen}
          getCarList={getCarList}
          setAlert={setAlert}
          open={open}
          selectedCar={selectedCar}
        />
      ) : (
        ""
      )}

      <div className="container">
        {isAlert ? (
          <Alert severity="success" sx={{ width: "100%" }}>
            Successfully updated car information
          </Alert>
        ) : (
          <></>
        )}
        <div className="row">
          <AddButton
            variant="outlined"
            color="primary"
            onClick={handleClickOpen}
          >
            <strong>+ Add Car</strong>
          </AddButton>
          <TableContainer component={Paper}>
            <Table stickyHeader sx={{ minWidth: 650 }} size="small">
              <TableHead className="thead-light">
                <TableRow>
                  <StyledTableCell scope="col">Brand</StyledTableCell>
                  <StyledTableCell scope="col">License Plate</StyledTableCell>
                  <StyledTableCell scope="col">Manufacturer</StyledTableCell>
                  <StyledTableCell scope="col">Operation City</StyledTableCell>
                  <StyledTableCell scope="col">Status</StyledTableCell>
                  <StyledTableCell scope="col">Created</StyledTableCell>
                  <StyledTableCell scope="col">Last Updated</StyledTableCell>
                  <StyledTableCell scope="col">Action</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {carList &&
                  carList.map((car: any) => (
                    <StyledTableRow key={car?.id}>
                      <StyledTableCell component="th" scope="row">
                        {car?.brand}
                      </StyledTableCell>
                      <StyledTableCell>{car?.licensePlate}</StyledTableCell>
                      <StyledTableCell>{car?.manufacturer}</StyledTableCell>
                      <StyledTableCell>{car?.operationCity}</StyledTableCell>
                      <StyledTableCell>
                        {car?.status ? titleCase(car?.status) : car?.status}
                      </StyledTableCell>
                      <StyledTableCell>{car?.createdAt}</StyledTableCell>
                      <StyledTableCell>{car?.lastUpdatedAt}</StyledTableCell>
                      <StyledTableCell>
                        <div className="d-flex justify-content-between align-items-center">
                          <div
                            className="btn-group"
                            style={{ marginBottom: "20px" }}
                          >
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => editCar(car)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => deletecar(car.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
