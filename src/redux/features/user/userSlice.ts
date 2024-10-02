import { RootState } from "@/redux/store";
import { TUserData } from "@/types/user.types";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  userData: null | TUserData;
};

const initialState: TInitialState = {
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;

export const currentUserData = (state: RootState) => state.user.userData;
