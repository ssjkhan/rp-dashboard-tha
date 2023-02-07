import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { delRow, DelRowPayload } from "./dataSlice";

// const getState: any = {};
// nested type for EvalStatements
export type EvalStatement = {
  rowIndex1: number;
  rowIndex2: number;
};

export type EvalState = {
  evalStatements: EvalStatement[];
  count: number;
};

const initialState: EvalState = {
  // intialize statements with 5  combinations
  evalStatements: (function () {
    // initArray safe as EvalStatement[] from intialization
    const initArray = [] as EvalStatement[];

    for (let i = 0; i < 5; i++) {
      let rowIdx1 = i;
      let rowIdx2 = Math.floor(i + Math.random() * 5) % 5;

      initArray.push({ rowIndex1: rowIdx1, rowIndex2: rowIdx2 });
    }

    return initArray;
  })(),
  count: 5,
};

export type AddStatementAction = {
  index: number;
  statement: EvalStatement;
};

export type DeleteStatementAction = { index: number };

export type UpdateStatementAction = {
  index: number;
  statement: EvalStatement;
};

export const evalSlice = createSlice({
  name: "eval",
  initialState,
  reducers: {
    deleteStatement: (state, action: PayloadAction<DeleteStatementAction>) => {
      const { index: delIndex } = action.payload;
      state.evalStatements = state.evalStatements.filter((_, index) =>
        delIndex != index
      );

      state.count -= 1;
    },
    updateStatement: (state, action: PayloadAction<UpdateStatementAction>) => {
      const { index, statement } = action.payload;
      state.evalStatements[index] = statement;
    },
    addStatement: (state, action: PayloadAction<AddStatementAction>) => {
      const { index, statement } = action.payload;
      state.evalStatements.push(statement);
      state.count += 1;
    },
    validateStatements: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      state.evalStatements = state.evalStatements.map((statement, _) => {
        if (statement.rowIndex1 > index) {
          statement.rowIndex1 = 0;
        }
        if (statement.rowIndex2 > index) {
          statement.rowIndex2 = 0;
        }

        return statement;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(delRow, (state, action: PayloadAction<DelRowPayload>) => {
      // handle cascading deletes
      const { index } = action.payload;
      state.evalStatements = state.evalStatements.map((statement, _) => {
        if (statement.rowIndex1 === index || statement.rowIndex2 === index) {
          statement.rowIndex1 = 0;
          statement.rowIndex2 = 0;
        }

        if (statement.rowIndex1 > index) {
          statement.rowIndex1 -= 1;
        }
        if (statement.rowIndex2 > index) {
          statement.rowIndex2 -= 1;
        }

        return statement;
      });
    });
  },
});

// export actions and reducer
export const {
  deleteStatement,
  updateStatement,
  addStatement,
  validateStatements,
} = evalSlice.actions;
export default evalSlice.reducer;

// export selectors
export const selectStatementsAll = (state: RootState) => {
  return state.evalState.evalStatements;
};

export const selectStatementsIndex = (state: RootState, index: number) => {
  return state.evalState.evalStatements[index];
};

export const selectStatementsSize = (state: RootState) => {
  return state.evalState.count;
};
