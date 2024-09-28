import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";
import { getCourses } from "../../../services";

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

interface CoursesState {
    courses: Course[];
}

const initialState: CoursesState = {
    courses: []
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        setCourses: (state, action: PayloadAction<Course[]>) => {
            state.courses = action.payload;
        }
    },
});

export const { setCourses } = coursesSlice.actions;

export default coursesSlice.reducer;

export const fetchCourses = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(getCourses);
        dispatch(setCourses(response.data.courses));
    } catch (error) {
        console.error("Failed to fetch courses:", error);
    }
};
