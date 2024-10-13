// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { AppDispatch } from "../store";
// import axios from "axios";
// import { getCourses } from "../../../services";

// interface Course {
//     enrollments: any;
//     _id: string; // String type as per your provided data
//     title: string;
//     description: string;
//     thumbnail?: string; // Optional as thumbnail is not provided in the object
//     instructor: {
//         [x: string]: any;
//         _id: string;
//         name: string;
//     };
//     ratings: { userId: string[]; value: number }[];
//     price: string;
//     category: string;
// }

// interface CoursesState {
//     courses: Course[];
// }

// const initialState: CoursesState = {
//     courses: []
// };

// const coursesSlice = createSlice({
//     name: "courses",
//     initialState,
//     reducers: {
//         setCourses: (state, action: PayloadAction<Course[]>) => {
//             state.courses = action.payload;
//         }
//     },
// });

// export const { setCourses } = coursesSlice.actions;

// export default coursesSlice.reducer;

// export const fetchCourses = () => async (dispatch: AppDispatch) => {
//     try {
//         const response = await axios.get(getCourses);
//         dispatch(setCourses(response.data.courses));
//     } catch (error) {
//         console.error("Failed to fetch courses:", error);
//     }
// };
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";
import { getCourses } from "../../../services";

// Define the Course interface
interface Course {
  enrollments: any;
  _id: string; // String type as per your provided data
  title: string;
  description: string;
  thumbnail?: string; // Optional as thumbnail is not provided in the object
  instructor: {
    _id: string;
    name: string;
  };
  ratings: { userId: string[]; value: number }[];
  price: string;
  category: string;
}

// Define the initial state interface
interface CoursesState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: CoursesState = {
  courses: [],
  loading: false,
  error: null,
};

// Create the slice
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
      state.loading = false; // Set loading to false when courses are successfully fetched
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload; // Update loading state
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload; // Update error state
      state.loading = false; // Stop loading if there's an error
    },
  },
});

// Export the actions
export const { setCourses, setLoading, setError } = coursesSlice.actions;

// Export the reducer
export default coursesSlice.reducer;

// Define the async thunk to fetch courses
export const fetchCourses = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true)); // Set loading to true before the API call
    const response = await axios.get(getCourses);
    dispatch(setCourses(response.data.courses)); // Dispatch fetched courses
  } catch (error) {
    dispatch(setError("Failed to fetch courses")); // Dispatch error message
    console.error("Failed to fetch courses:", error);
  } finally {
    dispatch(setLoading(false)); // Set loading to false after the API call completes
  }
};
