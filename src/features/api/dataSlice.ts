import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
// Type and initial state

export type Data = {
  data: number[][];
  rowCount: number;
  colCount: number;
};

export type DataState = {
  dataStore: Data[];
  dataCount: number;
  dataIndex: number;
};

const initialDataState: Data = {
  // intialize array with 7 elements and 5 rows
  data: Array.from({ length: 5 }).fill(
    Array.from({ length: 7 }).fill(0),
  ) as number[][],
  rowCount: 5,
  colCount: 7,
};

const initialState: DataState = {
  dataStore: [initialDataState],
  dataCount: 1,
  dataIndex: 0,
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

export type AddRowPayload = {
  index: number;
};

export type DelRowPayload = {
  index: number;
};

// todo
export type AddDataPayload = {};

export type DelDataPayload = {
  index: number;
};

export type LoadDataPayload = {
  index: number;
};

// State slice
export const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    resetData: (state) => {
      state.dataStore[state.dataIndex].data = [];
    },
    updateData: (state, action: PayloadAction<UpdateDataPayload>) => {
      const { rowIndex, colIndex, value } = action.payload;
      const { dataIndex } = state;
      state.dataStore[dataIndex].data[rowIndex][colIndex] = value;
    },
    addCol: (state, action: PayloadAction<AddColPayload>) => {
      const { index } = action.payload;
      const { dataIndex } = state;

      state.dataStore[dataIndex].data.forEach((col) => {
        col.splice(index + 1, 0, 0);
      });
      state.dataStore[dataIndex].colCount += 1;
    },
    deleteCol: (state, action: PayloadAction<DeleteColPayload>) => {
      const { index } = action.payload;
      const { dataIndex } = state;
      const currData = state.dataStore[dataIndex];

      for (let row = 0; row < currData.rowCount; row++) {
        if (currData.rowCount > 1) {
          currData.data[row].splice(index, 1);
        }
      }

      currData.colCount -= 1;
    },
    addRow: (state, action: PayloadAction<AddRowPayload>) => {
      const { index } = action.payload;
      const data = state.dataStore[state.dataIndex];

      data.data.splice(
        index + 1,
        0,
        Array.from({ length: data.colCount }).fill(0) as number[],
      );

      data.rowCount += 1;
    },
    delRow: (state, action: PayloadAction<DelRowPayload>) => {
      const { index } = action.payload;
      const data = state.dataStore[state.dataIndex];

      data.data.splice(index, 1);
      data.rowCount -= 1;
    },
    newData: (state, action: PayloadAction<{ row: number; col: number }>) => {
      const { row, col } = action.payload;
      const data = Array.from({ length: row }).map(() =>
        Array.from({ length: col }).map(() => 0)
      );
      console.log(data);
      const newData: Data = {
        data: data,
        rowCount: row,
        colCount: col,
      };
      state.dataStore.push(newData);
      state.dataCount += 1;
    },
    delData: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      const { dataCount } = state;
      if (dataCount < 2) return;
      state.dataStore.splice(index, 1);

      if (index === state.dataIndex) {
        state.dataIndex = 0;
      }

      if (state.dataIndex > index) {
        state.dataIndex -= 1;
      }
      state.dataCount -= 1;
    },
    internalLoadData: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      state.dataIndex = index;
    },
  },
});

// export actions and reducer
export const {
  resetData,
  updateData,
  addCol,
  deleteCol,
  addRow,
  delRow,
  newData,
  delData,
  internalLoadData,
} = dataSlice.actions;
export default dataSlice.reducer;

// Thunks for middleware

export function loadData(index: number) {
  return (dispatch: Function, getState: Function) => {
    dispatch(internalLoadData({ index: index }));
  };
}

// export selectors
export const selectDataAll = (state: RootState) => {
  return state.data.dataStore;
};

export const selectDataIndex = (state: RootState) => state.data.dataIndex;
export const selectDataCount = (state: RootState) => state.data.dataCount;

export const selectData = (state: RootState, index: number) => {
  return state.data.dataStore[index].data;
};

export const selectDataCell = (
  state: RootState,
  index: number,
  row: number,
  col: number,
) => {
  const data = state.data.dataStore[index];
  return data.data[row][col];
};

export const selectDataRow = (state: RootState, index: number, row: number) => {
  const currData = state.data.dataStore[index];
  return currData.data[row];
};

export const selectDataSize = (state: RootState, index: number) => {
  const currData = state.data.dataStore[index];
  return { rowCount: currData.rowCount, colCount: currData.colCount };
};
