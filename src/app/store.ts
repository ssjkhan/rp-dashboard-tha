import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import dataReducer from "../features/api/dataSlice";
import evalStatementReducer from "../features/api/evalSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    evalState: evalStatementReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const getState = store.getState;
