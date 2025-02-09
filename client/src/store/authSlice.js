import { createSlice } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'

export const AuthSlice = createSlice({
    name: "Auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        loading: true,
    },

    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;  
            state.loading = false;
            storage.removeItem("persist:root"); // ✅ Clear persisted storage on logout
        },
        setLoading: (state, action) =>{
            state.loading = action.payload;
        }
    }

});

export const { login, logout, setLoading } = AuthSlice.actions;
export default AuthSlice.reducer;   