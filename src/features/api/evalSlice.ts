import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { addRow, AddRowPayload, delRow, DelRowPayload } from "./dataSlice";
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

export type EvalState2 = {
  evalStore: EvalState[];
  evalCount: number;
  evalIndex: number;
};

const initialEvalState: EvalState = {
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

const initialState: EvalState2 = {
  evalStore: [initialEvalState],
  evalCount: 1,
  evalIndex: 0,
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
      const { evalIndex } = state;
      const evalStatements = state.evalStore[evalIndex].evalStatements;
      state.evalStore[evalIndex].evalStatements = evalStatements.filter((
        _,
        index,
      ) => delIndex != index);

      state.evalStore[evalIndex].count -= 1;
    },
    updateStatement: (state, action: PayloadAction<UpdateStatementAction>) => {
      const { index, statement } = action.payload;
      const { evalIndex } = state;
      state.evalStore[evalIndex].evalStatements[index] = statement;
    },
    addStatement: (state, action: PayloadAction<AddStatementAction>) => {
      const { index, statement } = action.payload;
      const { evalIndex } = state;

      state.evalStore[evalIndex].evalStatements.push(statement);
      state.evalStore[evalIndex].count += 1;
    },
    validateStatements: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      const { evalIndex } = state;
      const evalStatements = state.evalStore[evalIndex].evalStatements;

      state.evalStore[evalIndex].evalStatements = evalStatements.map(
        (statement, _) => {
          if (statement.rowIndex1 > index) {
            statement.rowIndex1 = 0;
          }
          if (statement.rowIndex2 > index) {
            statement.rowIndex2 = 0;
          }

          return statement;
        },
      );
    },
    newEvalSet: (
      state,
      action: PayloadAction<{ count: number }>,
    ) => {
      const { count } = action.payload;
      const newEvalSet: EvalState = {
        evalStatements: Array.from({ length: count }),
        count: count,
      };
      state.evalStore.push(newEvalSet);
    },
    delEvalSet: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      const { evalCount } = state;

      if (evalCount < 2) return;
      state.evalStore.splice(index, 1);
      if (index === state.evalIndex) {
        state.evalIndex = 0;
      }

      if (state.evalIndex > index) {
        state.evalIndex -= 1;
      }

      state.evalCount -= 1;
    },
    loadEvalSet: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      state.evalIndex = index;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(delRow, (state, action: PayloadAction<DelRowPayload>) => {
      // handle cascading deletes
      const { index } = action.payload;
      const { evalIndex } = state;
      const evalStatements = state.evalStore[evalIndex].evalStatements;
      state.evalStore[evalIndex].evalStatements = evalStatements.map(
        (statement, _) => {
          if (statement.rowIndex1 > index) {
            statement.rowIndex1 -= 1;
          }
          if (statement.rowIndex2 > index) {
            statement.rowIndex2 -= 1;
          }

          return statement;
        },
      );
    });

    builder.addCase(addRow, (state, action: PayloadAction<AddRowPayload>) => {
      const { index } = action.payload;
      const { evalIndex } = state;

      const evalSet = state.evalStore[evalIndex];

      evalSet.evalStatements = evalSet.evalStatements.map((statement) => {
        const { rowIndex1, rowIndex2 } = statement;

        if (rowIndex1 >= index) statement.rowIndex1 += 1;
        if (rowIndex2 >= index) statement.rowIndex2 += 1;

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
  newEvalSet,
  delEvalSet,
  loadEvalSet,
} = evalSlice.actions;
export default evalSlice.reducer;

// export selectors
export const selectStatementsAll = (state: RootState) => {
  return state.evalState.evalStore;
};

export const selectEvalIndex = (state: RootState) => {
  return state.evalState.evalIndex;
};

export const selectEvalCount = (state: RootState) => {
  return state.evalState.evalCount;
};

export const selectStatements = (state: RootState) => {
  const { evalIndex } = state.evalState;
  return state.evalState.evalStore[evalIndex];
};

export const selectStatementsIndex = (state: RootState, index: number) => {
  const { evalIndex } = state.evalState;
  return state.evalState.evalStore[evalIndex].evalStatements[index];
};

export const selectStatementsSize = (state: RootState) => {
  const { evalIndex } = state.evalState;
  return state.evalState.evalStore[evalIndex].count;
};
