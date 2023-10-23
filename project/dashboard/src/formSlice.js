import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    step: 0,
    details: {
      name: "",
      age: "",
      profession: "",
    },
    address: {
      address1: "",
      address2: "",
      city: "",
    },
    review: {},
    areRequiredFieldsFilled: false,
  },
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setInput: (state, action) => {
      const { key, value } = action.payload;
      state[key] = { ...state[key], ...value };
    },

    setRequiredFieldsFilled: (state, action) => {
      state.areRequiredFieldsFilled = action.payload;
    },
  },
});

export const { setStep, setInput, setRequiredFieldsFilled } = formSlice.actions;

export const selectStep = (state) => state.form.step;
export const selectDetails = (state) => state.form.details;
export const selectAddress = (state) => state.form.address;
export const selectRequiredFieldsFilled = (state) =>
  state.form.areRequiredFieldsFilled;

export default formSlice.reducer;
