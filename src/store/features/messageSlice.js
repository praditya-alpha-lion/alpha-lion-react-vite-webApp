import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
    updateMessage: (state, { payload }) => {
      // state.messages.
      state.messages = state.messages.map((ele) => {
        if (ele.message_id === payload.message_id) {
          ele = payload;
        }
        return ele;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMessage, updateMessage } = messageSlice.actions;

export default messageSlice.reducer;
