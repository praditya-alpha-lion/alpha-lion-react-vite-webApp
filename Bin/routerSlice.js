import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  router: [
    {
      to: "",
      active: false,
      subRoute: [
        {
          to: "",
          active: false,
        },
      ],
    },
  ],
};

export const routerSlice = createSlice({
  name: "router",
  initialState,
  reducers: {
    handleActiveRoute: (state, { payload }) => {
      state.router = state.router.map((route) => {
        if (route.to === payload.to) {
          route.active = true;
        } else {
          route.active = false;
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleActiveRoute } = routerSlice.actions;

export default routerSlice.reducer;
