import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../../store"; // adjust the path as per your project structure
import { getUsersApi } from "../../../../services"; // ensure this API points to the correct endpoint to get all users

// Define a type for individual user
interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    instructor: [];
    courses: [];
}

// Define the initial state type as an array of User objects or empty array
type UsersState = User[];

// Set the initial state
const initialState: UsersState = [];

const usersSlice = createSlice({
    name: "usersData",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state
            return action.payload; // Replace current state with the new users array
        },
        clearUsers: () => {
            return []; // Clear the users state by returning an empty array
        },
    },
});

export const { setUsers, clearUsers } = usersSlice.actions;

// Thunk function to fetch all users
export const fetchUsers = () => async (dispatch: AppDispatch) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
        return;
    }
    try {
        const response = await axios.get(getUsersApi, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        dispatch(setUsers(response.data.users)); // Assuming API returns a users array
    } catch (error) {
        console.error('Error fetching users data:', error);
    }
};

export default usersSlice.reducer;
