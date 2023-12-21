import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Home";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../../config";
import { getReservationData } from "../../Reducers/Reservation";

const Bookslot = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector(state => state.reservation.value);
  const [slotDetails, setslotDetails] = useState({
    id: "",
    name: "",
    email: "",
    address: "",
    mobile: "",
    slotDate: data.slotDate,
    slotTime: data.slotTime,
    paymentStatus: data.paymentStatus,
    requestStatus: data.requestStatus,
    requestCreationDate: data.requestCreationDate
  });
  const handleChange = e => {
    setslotDetails({ ...slotDetails, [e.target.name]: e.target.value });
  };
  const reserveSlot = e => {
    e.preventDefault();
    if (
      slotDetails.name == "" ||
      slotDetails.email == "" ||
      slotDetails.address == "" ||
      slotDetails.mobile == "" ||
      slotDetails.slotDate == "" ||
      slotDetails.slotTime == ""
    ) {
      alert("please fill all details");
    } else {
      var options = {
        key: "rzp_test_LONmMhvrQ8P8l8",
        key_secret: "lxpNGoogBuLY2T6pfB5Y7YSI",
        amount: 100 * 100,
        currency: "INR",
        name: "SLOT RESERVATION",
        description: "for booking slot",
        handler: function(response) {
          axios.post(API_BASE_URL + "bookslot", slotDetails).then(res => {
            if (res.data.status == 200) {
              alert(res.data.message);
              dispatch(
                getReservationData({
                  id: "",
                  name: "",
                  email: "",
                  address: "",
                  mobile: "",
                  slotDate: "",
                  slotTime: "",
                  paymentStatus: "",
                  requestStatus: "",
                  requestCreationDate: ""
                })
              );
              navigate("/bookinghistory");
            }
          });
        },
        prefill: {
          name: slotDetails.name,
          email: slotDetails.email,
          contact: slotDetails.mobile
        },
        notes: { address: "Razorpay Corporate office" },
        theme: { color: "#3399cc" }
      };
      var pay = new window.Razorpay(options);
      pay.open();
    }
  };

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          height: "90vh",
          paddingInline: { lg: "100px", md: "70px", sm: "30px", xs: "10px" },
          marginTop: "50px"
        }}
      >
        <Typography variant="h4" sx={{ color: "black" }}>
          RESERVE YOUR SLOT
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <TextField
            id="outlined-size-small"
            size="small"
            value={slotDetails.name}
            onChange={handleChange}
            placeholder="Enter Name"
            sx={{ borderColor: "black" }}
            name="name"
          />
          <TextField
            id="outlined-size-small"
            size="small"
            value={slotDetails.email}
            onChange={handleChange}
            placeholder="Enter Email"
            sx={{ borderColor: "black" }}
            name="email"
          />
          <TextField
            id="outlined-size-small"
            size="small"
            value={slotDetails.address}
            onChange={handleChange}
            // sx={{ borderColor: "black" }}
            placeholder="Enter Address"
            name="address"
          />
          <TextField
            id="outlined-size-small"
            size="small"
            value={slotDetails.mobile}
            onChange={handleChange}
            sx={{ borderColor: "black" }}
            placeholder="Enter Mobile"
            name="mobile"
          />
        </Box>
        <Button
          variant="contained"
          sx={{
            background: "black",
            color: "#ffffff",
            ":hover": { background: "green" }
          }}
          onClick={reserveSlot}
        >
          Book Now
        </Button>
      </Box>
    </Box>
  );
};

export default Bookslot;
