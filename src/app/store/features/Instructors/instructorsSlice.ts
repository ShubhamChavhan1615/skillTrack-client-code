import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../../store";
import { getAllInstructors } from "../../../../services";

interface Course {
  _id: string;
  title: string;
  description: string;
}

interface Instructor {
  _id: string;
  name: string;
  email: string;
  role: string;
  courses: Course[];
}

type InstructorProfileState = Instructor[] | null;

const initialState: InstructorProfileState = null;

const instructorProfilesSlice = createSlice({
  name: "instructorProfiles",
  initialState,
  reducers: {
    setInstructorProfiles: (state, action: PayloadAction<Instructor[]> | any) => {
      state
      return action.payload;
    },
    clearInstructorProfiles: () => {
      return null;
    },
  },
});

export const { setInstructorProfiles, clearInstructorProfiles } = instructorProfilesSlice.actions;
export default instructorProfilesSlice.reducer;

// Async action to fetch all instructors
export const fetchInstructorProfiles = () => async (dispatch: AppDispatch) => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    console.error("No auth token found");
    return;
  }

  try {
    const response = await axios.get(getAllInstructors);

    dispatch(setInstructorProfiles(response.data.instructors));
  } catch (error) {
    console.error("Error fetching instructor profiles:", error);
  }
};
