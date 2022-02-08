import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slices/customer.js";

const store = configureStore({
  reducer: {
    customers: customerReducer,
  },
});

export default store;
