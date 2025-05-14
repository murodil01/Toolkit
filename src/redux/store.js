import { configureStore } from "@reduxjs/toolkit";
import debtReducer from "./debtSlice";
import timerReducer from "./timerSlice";
import notificationReducer from "./notificationSlice";

export const store = configureStore({
  reducer: {
    debt: debtReducer,
    timer: timerReducer,
    notification: notificationReducer,
  },
});
