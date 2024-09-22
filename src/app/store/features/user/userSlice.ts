import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../../store";
import { getUserProfileApi } from "../../../../services";

// Define a type for the user profile state
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  instructor:[];
  courses: [];
}

// Define the initial state with a proper type
type UserProfileState = UserProfile | null;

const initialState: UserProfileState = null;

const userProfileSlice = createSlice({
  name: "userProfileData",
  initialState,
  reducers: {
    setUserProfile:  (state, action: PayloadAction<UserProfile>|any) => {
      state
      return action.payload; // return the new state
    },
    clearUserProfile: () => {
      return null; // return null to clear the user profile
    },
  },
});

export const { setUserProfile, clearUserProfile } = userProfileSlice.actions;

export const fetchUserProfile = () => async (dispatch: AppDispatch) => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    return;
  }
  try {
    const response = await axios.get(getUserProfileApi, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    dispatch(setUserProfile(response.data.user));
  } catch (error) {
    console.error('Error fetching user profile data:', error);
  }
};

export default userProfileSlice.reducer;
