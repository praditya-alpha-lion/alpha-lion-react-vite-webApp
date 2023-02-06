import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const messageAuthSlice = createSlice({
  name: "messageAuth",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: "" };
    },
  },
});

const { reducer, actions } = messageAuthSlice;

export const { setMessage, clearMessage } = actions;
export default reducer;
