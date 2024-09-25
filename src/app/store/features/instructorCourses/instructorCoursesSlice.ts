import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import axios from "axios";
import { getInstructorCourses } from "../../../../services";

interface InstructorCourse {
    enrollments: any;
    _id: string;
    title: string;
    description: string;
    thumbnail?: string;
    instructor: {
        _id: string;
        name: string;
    };
    rating: number[];
    price: string;
    category: string;
}

interface InstructorCoursesState {
    instructorCourses: InstructorCourse[];
}

const initialState: InstructorCoursesState = {
    instructorCourses: []
};

const instructorCoursesSlice = createSlice({
    name: "instructorCourses",
    initialState,
    reducers: {
        setInstructorCourses: (state, action: PayloadAction<InstructorCourse[]>) => {
            state.instructorCourses = action.payload;
        },
    },
    
});

export const { setInstructorCourses } = instructorCoursesSlice.actions;

export default instructorCoursesSlice.reducer;

export const fetchInstructorCourses = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(getInstructorCourses, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        if (response.data.courses) {
            dispatch(setInstructorCourses(response.data.courses));
        } else {
            console.error("No courses found in API response.");
        }
    } catch (error) {
        console.error("Failed to fetch instructor's courses:", error);
    }
};
