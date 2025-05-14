import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  const storedData = localStorage.getItem("debtData");
  if (storedData) {
    return JSON.parse(storedData);
  }
  return {
    debtors: [],
    total: 0,
  };
};

const updateLocalStorage = (state) => {
  localStorage.setItem("debtData", JSON.stringify(state));
};

const debtSlice = createSlice({
  name: "debt",
  initialState: getInitialState(),
  reducers: {
    addDebtor: (state, action) => {
      const newDebtor = {
        id: Date.now(),
        name: action.payload.name,
        amount: parseFloat(action.payload.amount),
        paid: false,
      };
      state.debtors.push(newDebtor);
      state.total += newDebtor.amount;
      updateLocalStorage(state);
    },
    toggleDebtorStatus: (state, action) => {
      const debtor = state.debtors.find((d) => d.id === action.payload);
      if (debtor) {
        debtor.paid = !debtor.paid;
        updateLocalStorage(state);
      }
    },
    deleteDebtor: (state, action) => {
      const deleted = state.debtors.find((d) => d.id === action.payload);
      state.debtors = state.debtors.filter((d) => d.id !== action.payload);
      if (deleted && !deleted.paid) {
        state.total -= deleted.amount;
      }
      updateLocalStorage(state);
    },
  },
});

export const { addDebtor, toggleDebtorStatus, deleteDebtor } =
  debtSlice.actions;
export default debtSlice.reducer;
