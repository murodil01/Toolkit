import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { start, stop, reset, tick } from "../features/timerSlice";
import { addNotification } from "../features/notificationSlice";

const Timer = () => {
  const { seconds, running } = useSelector(state => state.timer);
  const dispatch = useDispatch();

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        dispatch(tick());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running, dispatch]);

  useEffect(() => {
    if (seconds === 10) {
      dispatch(addNotification({ type: "info", message: "10 soniya o'tdi!" }));
    }
  }, [seconds, dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Timer: {seconds} sekund</h2>
      <div className="flex gap-2">
        <button onClick={() => dispatch(start())} className="bg-green-500 text-white px-4 py-2">Start</button>
        <button onClick={() => dispatch(stop())} className="bg-yellow-500 text-white px-4 py-2">Stop</button>
        <button onClick={() => dispatch(reset())} className="bg-red-500 text-white px-4 py-2">Reset</button>
      </div>
    </div>
  );
};

export default Timer;
