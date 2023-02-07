import { useId, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { loadData, newData, selectDataCount } from "../api/dataSlice";
import Modal from "../../components/modal/Modal";

export default function NewTests() {
  const id = useId();
  const [dim, setDim] = useState({ row: 5, col: 7 });
  const dispatch = useAppDispatch();
  const dataCount = useAppSelector(selectDataCount);

  function handleSubmit(e: any) {
    e.preventDefault();

    dispatch(newData(dim));
    dispatch(loadData(dataCount));
  }

  function handleChange(e: any) {
    e.preventDefault();
    setDim({ ...dim, [e.target.name]: Number(e.target.value) });
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
          Add New Data
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex items-center">
                <label htmlFor={`${id}-row`}>Rows</label>
                <input
                  id={`${id}-row`}
                  type="text"
                  name="row"
                  onChange={handleChange}
                  value={dim.row}
                  className="border-2 border-slate-900 rounded mx-1 w-16"
                  placeholder="5"
                />
              </div>
              <div className="flex items-center">
                <label htmlFor={`${id}-col`}>Col</label>

                <input
                  id={`${id}-col`}
                  type="text"
                  name="col"
                  onChange={handleChange}
                  value={dim.col}
                  className="border-2 border-slate-900 rounded mx-1 w-16"
                  placeholder="7"
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
          {Array.from({ length: dim.row }).map((_, index) => {
            return (
              <div key={index} className="my-1 flex justify-center">
                {Array.from({ length: dim.col }).map((_, index) => {
                  return (
                    <div key={index} className="mx-1 bg-slate-900 w-4 h-4">
                      &nbsp;
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
}

export {};
