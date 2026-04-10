import { createSlice } from "@reduxjs/toolkit";

import { ProfileResponse } from "../../Profile/models/types";

export interface ProfileState {
  profile: ProfileResponse | null;
}

const initialState: ProfileState = {
  profile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserProfileData(state, action) {
      state.profile = action.payload;
    },
  },
});

export const { setUserProfileData } = profileSlice.actions;
export default profileSlice.reducer;
