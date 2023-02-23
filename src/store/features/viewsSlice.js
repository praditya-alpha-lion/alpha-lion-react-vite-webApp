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
      // console.log(payload.view);
      // state[payload.view] = payload.data;
      // console.log(state);
      state.driver = payload;
    },
  },
});

export const { handleAddViews } = viewsSlice.actions;

export default viewsSlice.reducer;
