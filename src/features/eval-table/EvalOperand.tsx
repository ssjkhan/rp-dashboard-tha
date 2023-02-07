import { MouseEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useComponentVisible } from "../../utils/useComponentVisible";
import {
  EvalStatement,
  selectStatementsIndex,
  selectStatementsSize,
  updateStatement,
  UpdateStatementAction,
} from "../api/evalSlice";
import { selectDataIndex, selectDataSize } from "../api/dataSlice";

type EvalOperandType = {
  evalIndex: number;
  position: number;
};

function EvalOperandBtn(props: EvalOperandType) {
  // deconstruct props
  const { evalIndex, position } = props;
  const dispatch = useAppDispatch();
  // visibility hook
  const { ref, isVisible, setVisible } = useComponentVisible<HTMLDivElement>(
    false,
  );
  //get data from state
  const dataIndex = useAppSelector(selectDataIndex);
  const { rowIndex1, rowIndex2 } = useAppSelector((state) =>
    selectStatementsIndex(state, evalIndex)
  );
  const { rowCount: dataSize } = useAppSelector((state) =>
    selectDataSize(state, dataIndex)
  );

  // handler functions
  const handleClick = (_: MouseEvent<HTMLDivElement>, index: number) => {
    setVisible(true);
  };

  const updateOperand = (e: MouseEvent<HTMLElement>) => {
    const updatedVal = (e.target as HTMLElement).getAttribute("data-value");

    // construct updated Eval Statement
    if (position === 1) {
      var evalStatement: EvalStatement = {
        rowIndex1: Number(updatedVal),
        rowIndex2: rowIndex2,
      };
    } else {
      var evalStatement: EvalStatement = {
        rowIndex1: rowIndex1,
        rowIndex2: Number(updatedVal),
      };
    }

    // construct and dispatch updated Action
    const updateAction: UpdateStatementAction = {
      index: evalIndex,
      statement: evalStatement,
    };

    dispatch(updateStatement(updateAction));
    setVisible(false);
  };

  return (
    <>
      <div
        className="bg-white px-0 mx-0 lg:px-0.5 rounded text-xs lg:text-base text-slate-900"
        onClick={(e) => handleClick(e, 1)}
      >
        R{position === 1 ? rowIndex1 + 1 : rowIndex2 + 1}
      </div>
      {isVisible
        ? (
          <div
            ref={ref}
            className="absolute z-10 w-32 lg:max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              {Array.from({ length: dataSize }).map(
                (_: unknown, index: number) => {
                  return (
                    <li
                      key={`Dropdown-${evalIndex}-${index}`}
                      data-value={index}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={(e) => updateOperand(e)}
                    >
                      R{index + 1}
                    </li>
                  );
                },
              )}
            </ul>
          </div>
        )
        : null}
    </>
  );
}

export default EvalOperandBtn;
