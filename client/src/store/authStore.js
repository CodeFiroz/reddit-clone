import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
    key: "root",
    storage, // Store in localStorage
};

const rootReducer = combineReducers({
    auth: authReducer, // ✅ Add persistable reducers
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
})

export const persistor = persistStore(store); // ✅ Create persistor
export default store;