import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: [],
  food: [],
};

const customerSlice = createSlice({
  // An unique name of a slice
  name: "customer",

  // Initial state value of the reducer
  initialState,

  // Reducer methods
  reducers: {
    addCustomer: (state, { payload }) => {
      state.name.push(payload);
    },

    orderFood: (state, { payload }) => {
      state.food.push(payload);
    },
  },
});

// Action creators for each reducer method
export const { addCustomer, orderFood } = customerSlice.actions;

export default customerSlice.reducer;
