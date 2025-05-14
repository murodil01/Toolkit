import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: "timer",
  initialState: { seconds: 0, running: false },
  reducers: {
    start: (state) => { state.running = true },
    stop: (state) => { state.running = false },
    reset: (state) => { state.seconds = 0; state.running = false },
    tick: (state) => { if (state.running) state.seconds += 1 },
  },
});

export const { start, stop, reset, tick } = timerSlice.actions;
export default timerSlice.reducer;
