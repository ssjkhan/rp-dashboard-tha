import { useId, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  EvalSet,
  EvalStatement,
  loadEvalSet,
  newEvalSet,
  selectEvalCount,
} from "../api/evalSlice";
import Modal from "../../components/modal/Modal";

const initialStatement: EvalStatement[] = [{
  rowIndex1: 0,
  rowIndex2: 1,
}];

const initialEvalSet: EvalSet = {
  evalStatements: initialStatement,
  count: 1,
};

export default function NewTests() {
  const id = useId();
  const [evalSet, setEvalSet] = useState(initialEvalSet);
  const dispatch = useAppDispatch();
  const evalCount = useAppSelector(selectEvalCount);

  function handleSubmit(e: any) {
    e.preventDefault();

    dispatch(newEvalSet(evalSet));
    dispatch(loadEvalSet({ index: evalCount }));
  }

  function handleChangeStatement(e: any, index: number, key: any) {
    console.log(index, key);
    const updatedVal = Number(e.target.value) - 1;
    const updatedEvalStatements = [...evalSet.evalStatements];
    const updatedStatement = { ...updatedEvalStatements[index] };

    updatedStatement[key as keyof EvalStatement] = updatedVal;
    updatedEvalStatements[index] = updatedStatement;

    setEvalSet({
      ...evalSet,
      evalStatements: updatedEvalStatements,
    });
  }

  function handleChangeCount(e: any) {
    const re = /^(\s*|\d+)$/;

    if (!re.test(e.target.value)) {
      return;
    }

    const updatedCount = Number(e.target.value);
    if (updatedCount < 0) return;

    const updatedStatements = [...evalSet.evalStatements];

    while (updatedCount > updatedStatements.length) {
      updatedStatements.push({ rowIndex1: 1, rowIndex2: 2 });
    }

    while (updatedCount < updatedStatements.length) {
      updatedStatements.pop();
    }

    const updatedEvalSet: EvalSet = {
      evalStatements: updatedStatements,
      count: updatedCount,
    };

    setEvalSet(updatedEvalSet);
  }

  return (
    <>
      <label htmlFor={id} className="hover:underline">
        <div className="flex justify-between">
          <div>
            New Tests
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
            />
          </svg>
        </div>
      </label>
      <Modal id={id}>
        <div className="flex justify-center text-lg text-slate-900 font-bold">
          New Test Suite
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex items-center">
                <label htmlFor={`${id}-row`}>Rows</label>
                <input
                  id={`${id}-row`}
                  type="text"
                  name="count"
                  onChange={handleChangeCount}
                  value={evalSet.count}
                  className="border-2 border-slate-900 rounded mx-1 w-16"
                  placeholder="5"
                />
              </div>
            </div>
            <button
              className="w-auto h-auto mx-1 my-1 py-1 px-1 text-white bg-primary border-2 border-primary rounded"
              type="submit"
            >
              <label
                htmlFor={id}
              >
                Submit
              </label>
            </button>
          </div>
        </form>
        <div>
          {evalSet.evalStatements.map((statement, index) => {
            return (
              <div key={index} className="my-1 flex justify-between">
                <div className="flex">
                  <div className="mr-4 underline">Evaluation {index + 1}</div>
                  <div className="w-auto">
                    Row
                  </div>
                  <input
                    type="text"
                    onChange={(e) =>
                      handleChangeStatement(e, index, "rowIndex1")}
                    className="w-16 border-2 border-slate-500 rounded mx-2"
                    value={statement.rowIndex1 + 1}
                  />
                </div>
                <div className="px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>

                <div className="flex">
                  <div className="w-auto">
                    Row
                  </div>
                  <input
                    type="text"
                    onChange={(e) =>
                      handleChangeStatement(e, index, "rowIndex2")}
                    className="w-16 border-2 border-slate-500 rounded mx-2"
                    value={statement.rowIndex2 + 1}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
}

export {};
