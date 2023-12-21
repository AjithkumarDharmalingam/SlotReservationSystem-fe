import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { getReservationData } from "../../Reducers/Reservation";
import { useDispatch } from "react-redux";

const Date = () => {
  const [date, setdate] = useState(null);
  const dispatch = useDispatch();
  return (
    <Box sx={{ mt: 4 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          disablePast
          // orientation="landscape"
          value={date}
          onChange={e => {
            setdate(e);
            console.log(e);
            dispatch(
              getReservationData({
                id: "",
                name: "",
                email: "",
                address: "",
                mobile: "",
                slotDate:
                  e.$d.getDate() +
                  "-" +
                  parseInt(e.$d.getMonth() + 1) +
                  "-" +
                  e.$y,
                slotTime: "",
                paymentStatus: "",
                requestStatus: "",
                requestCreationDate: ""
              })
            );
          }}
          sx={{ width: { lg: "320px", md: "320px", sm: "320px", xs: "auto" } }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default Date;
