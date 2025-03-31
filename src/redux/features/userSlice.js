import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};

const initialState = {
    isUserAuth: !!userFromStorage.role,  // True if role exists
    userData: userFromStorage || {},
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.isUserAuth = true;
            state.userData = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));  // Save user to local storage
        },
        clearUser: (state) => {
            state.isUserAuth = false;
            state.userData = {};
            localStorage.removeItem("user");  // Clear storage on logout
        }
        
    },
});

// Action creators are generated for each case reducer function
export const { saveUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

