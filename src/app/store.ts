import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/api/dataSlice";
import evalStatementReducer from "../features/api/evalSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    evalState: evalStatementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
