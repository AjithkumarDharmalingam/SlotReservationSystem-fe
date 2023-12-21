import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Date from "../Date/Date";
import HomeappBar from "../Navbar/Home";
import { useDispatch, useSelector } from "react-redux";
import { getReservationData } from "../../Reducers/Reservation";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import axios from "axios";

const Home = () => {
  var currentdate = new window.Date()
  const [timeSlot, settimeSlot] = useState([
    "1:00 AM",
    "1:15 AM",
    "1:30 AM",
    "1:45 AM",
    "2:00 AM",
    "2:15 AM",
    "2:30 AM",
    "2:45 AM",
    "3:00 AM",
    "3:15 AM",
    "3:30 AM",
    "3:45 AM",
    "4:00 AM",
    "4:15 AM",
    "4:30 AM",
    "4:45 AM",
    "5:00 AM",
    "5:15 AM",
    "5:30 AM",
    "5:45 AM",
    "6:00 AM",
    "6:15 AM",
    "6:30 AM",
    "6:45 AM",
    "7:00 AM",
    "7:15 AM",
    "7:30 AM",
    "7:45 AM",
    "8:00 AM",
    "8:15 AM",
    "8:30 AM",
    "8:45 AM",
    "9:00 AM",
    "9:15 AM",
    "9:30 AM",
    "9:45 AM",
    "10:00 AM",
    "10:15 AM",
    "10:30 AM",
    "10:45 AM",
    "11:00 AM",
    "11:15 AM",
    "11:30 AM",
    "11:45 AM",
    "12:00 AM",
    "12:15 AM",
    "12:30 AM",
    "12:45 AM",
    "13:00 PM",
    "13:15 PM",
    "13:30 PM",
    "13:45 PM",
    "14:00 PM",
    "14:15 PM","14:30 PM","14:45 PM","15:00 PM","15:15 PM","15:30 PM","15:45 PM","16:00 PM","16:15 PM","16:30 PM","16:45 PM","17:00 PM","17:15 PM","17:30 PM","17:45 PM","18:00 PM","18:15 PM","18:30 PM","18:45 PM","19:00 PM","19:15 PM","19:30 PM","19:45 PM","20:00 PM","20:15 PM","20:30 PM","20:45 PM","21:00 PM","21:15 PM","21:30 PM","21:45 PM","22:00 PM","22:15 PM","22:30 PM","22:45 PM","23:00 PM","23:15 PM","23:30 PM","23:45 PM","24:00 PM"
  ]);
  const [slotData, setslotData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(state => state.reservation.value);
  function getData() {
    axios.get(API_BASE_URL + "getbookings/").then(res => {
      setslotData(res.data);
    });
  }
  function checkSlot(date, time) {
    console.log(date, time);
    return slotData.find(
      object => object["slotDate"] == date && object["slotTime"] == time
    );
  }
  
  useEffect(() => {
    getData();
  }, []);
  return (
    <Box>
      <HomeappBar />
    
      <Container sx={{ display: "flex",flexWrap:"wrap", alignItems: "center",mt:6,p:5,boxShadow:"0 3px 10px rgb(0 0 0 / 0.2)"            
 }}>
        <Box sx={{ width: {lg:"70%",md:"50%",sm:"100%",xs:"100%"} }}>
          
          <Date />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "13px",
            width: {lg:"30%",md:"50%",sm:"100%",xs:"100%"},
            maxHeight: "300px",
            overflowY: "auto"
          }}
        >
                        <Typography variant="h6"sx={{textAlign:"center"}}>PICK TIME</Typography>

          {timeSlot.map(e => {
            console.log(e.substring(0, e.indexOf(':')) , new window.Date().getHours());
            return (
              <>
                {checkSlot(data.slotDate, e) != undefined ||  e.substring(0, e.indexOf(':')) < currentdate.getHours() && data.slotDate == currentdate.getDate()+"-"+parseInt(currentdate.getMonth()+1)+"-"+currentdate.getFullYear()
                  ? ""
                  : <Button
                    variant="outlined"
                    sx={{ ":hover": { background: "green", color: "#fff" } }}
                    onClick={() => {
                      if (data.slotDate == "") {
                        alert("please choose date");
                      } else {
                        dispatch(
                          getReservationData({
                            id: "",
                            name: "",
                            email: "",
                            address: "",
                            mobile: "",
                            slotDate: data.slotDate,
                            slotTime: e,
                            paymentStatus: "paid",
                            requestStatus: "pending",
                            requestCreationDate: new window.Date()
                              .toISOString()
                              .slice(0, 10)
                          })
                        );
                        navigate("/bookslot");
                      }
                    } }
                  >
                    {e}
                  </Button>}
              </>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
