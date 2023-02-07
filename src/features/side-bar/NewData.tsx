import { useId, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadData, newData, selectDataCount } from "../api/dataSlice";
import Modal from "../../components/modal/Modal";

export default function NewData() {
  const id = useId();
  const [dim, setDim] = useState({ row: 5, col: 7 });
  const dispatch = useAppDispatch();
  const dataCount = useAppSelector(selectDataCount);

  function handleSubmit(e: any) {
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
            New Data
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
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
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
            <label
              htmlFor={id}
            >
              <div
                className="w-auto h-auto mx-1 my-1 py-1 px-1 text-white bg-primary border-2 border-primary rounded"
                onClick={handleSubmit}
              >
                Submit
              </div>
            </label>
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
