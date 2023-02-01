import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

// Type and initial state
type dataState = {
  data: string[][];
};

const initialState: dataState = {
  // data is string[][], due to intialization
  data: [] as string[][],
};

// Action types

export type AddCol = {
  index: number;
};

export type DeleteCol = {
  index: number;
};

export type EditData = {
  rowIndex: number;
  colIndex: number;
  value: string;
};

// State slice
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = [];
    },
    editData: (state, action: PayloadAction<EditData>) => {
      const { rowIndex, colIndex, value } = action.payload;
      state.data[rowIndex][colIndex] = value;
    },
    addCol: (state, action: PayloadAction<AddCol>) => {
      const { index } = action.payload;
      state.data.splice(index - 1, 0, []);
    },
    deleteCol: (state, action: PayloadAction<DeleteCol>) => {
      const { index } = action.payload;
      for (let row = 0; row < state.data.length; row++) {
        state.data[row].splice(index, 1);
      }
    },
  },
});

// export actions and reducer
export const { resetData, editData, addCol, deleteCol } = dataSlice.actions;
export default dataSlice.reducer;

// export selectors
