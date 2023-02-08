import { useId } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectDataAll, selectDataIndex } from "../api/dataSlice";
import {
  delEvalSet,
  loadEvalSet,
  selectEvalIndex,
  selectStatementsAll,
} from "../api/evalSlice";
import Modal from "../../components/modal/Modal";

function LoadTests() {
  const id = useId();
  const evalIndex = useAppSelector(selectEvalIndex);
  const evalSets = useAppSelector(selectStatementsAll);
  const dispatch = useAppDispatch();

  function handleDeleteEvalSet(index: number) {
    dispatch(delEvalSet({ index: index }));
  }

  function handleSelectEvalSet(index: number) {
    dispatch(loadEvalSet({ index: index }));
  }
  return (
    <>
      <label htmlFor={id} className="hover:underline">
        <div className="flex justify-between">
          <div>
            Load Tests
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
              d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
            />
          </svg>
        </div>
      </label>
      <Modal id={id}>
        <div>
          <div className="flex justify-around">
            <div className="mx-1 my-1 text-lg text-slate-900 font-bold flex items-center">
              Current Test Suite: {evalIndex}
            </div>
          </div>
          <div>
            {evalSets.map((evalSet, index) => {
              return (
                <div
                  key={index}
                  className="flex my-1 items-center"
                >
                  <div className="mr-auto">
                    Test Suite #{index} {`Test Count (${evalSet.count})`}
                  </div>
                  <div
                    className="w-auto h-auto mx-1 my-1 py-1 px-1 text-white bg-primary border-2 border-primary rounded"
                    onClick={() => handleSelectEvalSet(index)}
                  >
                    <label htmlFor={id}>
                      Select
                    </label>
                  </div>
                  <div
                    onClick={(e) => handleDeleteEvalSet(index)}
                    className="w-auto h-auto mx-1 my-1 py-1 px-1 text-white bg-red-500 border-2 border-red-500 rounded"
                  >
                    <label htmlFor={id}>
                      Delete
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default LoadTests;
