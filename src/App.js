import "./App.css";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Bookslot from "./Components/Booking/Bookslot";
import Viewbooking from "./Components/Booking/Viewbooking";

function App() {
  return (
    <Box>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/bookslot" element={<Bookslot />} />
        <Route exact path="/bookinghistory" element={<Viewbooking />} />
      </Routes>
    </Box>
  );
}

export default App;
