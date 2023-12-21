import { createSlice } from "@reduxjs/toolkit";

const reservationSlice = createSlice({
  name: "reservation",
  initialState: {
    value: {
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
    }
  },
  reducers: {
    getReservationData: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { getReservationData } = reservationSlice.actions;

export default reservationSlice.reducer;
