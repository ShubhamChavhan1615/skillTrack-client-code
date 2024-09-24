import { configureStore } from '@reduxjs/toolkit';
import userProfileSlice from './features/user/userSlice';
import coursesSlice from './features/coursesSlice';
import instructorsSlice from './features/Instructors/instructorsSlice';
import usersSlice from './features/admin/usersSlice';

export const store = configureStore({
  reducer: {
    userProfileData: userProfileSlice,
    coursesData: coursesSlice,
    instructorsData: instructorsSlice,
    usersData: usersSlice
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
