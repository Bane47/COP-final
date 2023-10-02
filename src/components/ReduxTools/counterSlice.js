import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
      userEmail: "",
    },
    reducers: {
      setUserEmail: (state, action) => {
        state.userDetails = action.payload;
      },
    },
  });
  

export const { setUserEmail } = counterSlice.actions;
export default counterSlice.reducer;
