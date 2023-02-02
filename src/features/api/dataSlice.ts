import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {} from "../../app/hooks";

// Type and initial state
type dataState = {
  data: number[][];
  rowCount: number;
  colCount: number;
};

const initialState: dataState = {
  // intialize array with 7 elements and 5 rows
  data: (function () {
    // initArray safe as number[][] from intialization
    const initArray = [] as number[][];
    for (let i = 0; i < 5; i++) {
      initArray.push(Array.from({ length: 7 }, (v, j) => {
        if ((i + j) % 2 === 0) return 0;
        return 1;
      }));
    }
    return initArray;
  })(),
  rowCount: 5,
  colCount: 7,
};

// Payload action types
export type AddColPayload = {
  index: number;
};

export type DeleteColPayload = {
  index: number;
};

export type UpdateDataPayload = {
  rowIndex: number;
  colIndex: number;
  value: number;
};

// State slice
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = [];
    },
    updateData: (state, action: PayloadAction<UpdateDataPayload>) => {
      const { rowIndex, colIndex, value } = action.payload;
      state.data[rowIndex][colIndex] = value;
    },
    addCol: (state, action: PayloadAction<AddColPayload>) => {
      const { index } = action.payload;
      state.data.splice(index - 1, 0, []);
    },
    deleteCol: (state, action: PayloadAction<DeleteColPayload>) => {
      const { index } = action.payload;
      for (let row = 0; row < state.data.length; row++) {
        if (state.data.length > 1) {
          state.data[row].splice(index, 1);
        }
      }
    },
  },
});

// export actions and reducer
export const { resetData, updateData, addCol, deleteCol } = dataSlice.actions;
export default dataSlice.reducer;

// export selectors
export const selectDataAll = (state: RootState) => {
  return state.data.data;
};

export const selectDataCell = (state: RootState, row: number, col: number) => {
  return state.data.data[row][col];
};

export const selectDataRow = (state: RootState, row: number) => {
  return state.data.data[row];
};

export const selectDataSize = (state: RootState) => {
  return { rowCount: state.data.rowCount, colCount: state.data.colCount };
};
