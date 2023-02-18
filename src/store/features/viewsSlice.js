import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  driver: {},
  trucks: {},
  trailers: {},
};

const viewsSlice = createSlice({
  name: 'views',
  initialState,
  reducers: {
    handleAddViews: (state, { payload }) => {
      console.log(payload);
      state[payload.view] = payload.data;
    },
  },
});

export const { handleAddViews } = viewsSlice.actions;

export default viewsSlice.reducer;
