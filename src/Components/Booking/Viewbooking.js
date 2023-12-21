import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import HomeappBar from "../Navbar/Home";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

export default function Viewbooking() {
  const [data, setdata] = useState([]);
  const [status, setstatus] = React.useState("");

  const handleChange = event => {
    setstatus(event.target.value);
  };
  function getData() {
    axios.get(API_BASE_URL + "getbookings/").then(res => {
      setdata(res.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <HomeappBar />

      <Container sx={{ mt: 5 }}>
        <FormControl sx={{ m: 1, width: "99%", pb: 4 }} size="small">
          <InputLabel id="demo-select-small-label">
            Sort By Request Status
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={status}
            label="Filter"
            onChange={handleChange}
          >
            <MenuItem value="pending">Opened</MenuItem>
            <MenuItem value="completed">Closed</MenuItem>
          </Select>
        </FormControl>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Id</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Address</StyledTableCell>
                <StyledTableCell align="right">Mobile</StyledTableCell>
                <StyledTableCell align="right">Slot Date</StyledTableCell>
                <StyledTableCell align="right">Slot Time</StyledTableCell>
                <StyledTableCell align="right">Payment Status</StyledTableCell>
                <StyledTableCell align="right">Request Status</StyledTableCell>
                <StyledTableCell align="right">Delete Request</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .filter(val => {
                  if (status == "pending") {
                    if (val.requestStatus == "pending") {
                      return val;
                    }
                  } else if (status == "completed") {
                    if (val.requestStatus == "completed") {
                      return val;
                    }
                  } else {
                    return val;
                  }
                })
                .map((e, index) =>
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row" align="right">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {e.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {e.email}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {e.address}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {e.mobile}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {e.slotDate}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {e.slotTime}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {e.paymentStatus}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {e.requestStatus == "pending"
                        ? <Button
                            color="primary"
                            onClick={() => {
                              axios
                                .put(API_BASE_URL + "updatebooking", {
                                  id: e._id,
                                  name: e.name,
                                  email: e.email,
                                  address: e.address,
                                  mobile: e.mobile,
                                  slotDate: e.slotDate,
                                  slotTime: e.slotTime,
                                  paymentStatus: "paid",
                                  requestStatus: "completed",
                                  requestCreationDate: new window.Date()
                                    .toISOString()
                                    .slice(0, 10)
                                })
                                .then(res => {
                                  if (res.data.status == 200) {
                                    alert("slot updated successfully");
                                    getData();
                                  }
                                });
                            }}
                          >
                            Update
                          </Button>
                        : e.requestStatus}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        onClick={() => {
                          axios
                            .delete(API_BASE_URL + "deletebooking", {
                              params: {
                                id: e._id
                              }
                            })
                            .then(res => {
                              if (res.data.status == 200) {
                                getData();
                              }
                            });
                        }}
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
