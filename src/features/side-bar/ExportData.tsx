import { useId } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  delData,
  loadData,
  newData,
  selectDataAll,
  selectDataIndex,
} from "../api/dataSlice";
import Modal from "../../components/modal/Modal";

type DataLoadoutProps = {};

function DataLoadout(props: DataLoadoutProps) {
  const id = useId();
  const dataIndex = useAppSelector(selectDataIndex);
  const data = useAppSelector(selectDataAll);
  const dispatch = useAppDispatch();

  function handleNewData() {
  }

  function handleDeleteData(index: number) {
    dispatch(delData({ index: index }));
  }

  function handleSelectData(index: number) {
    dispatch(loadData(index));
  }
  return (
    <>
      <label htmlFor={id} className="hover:underline">
        <div className="flex justify-between">
          <div>
            Export Data to Sheets
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
              d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </label>
      <Modal id={id}>
        <div>
          <div className="flex justify-around">
            <div className="mx-1 my-1 text-lg text-slate-900 font-bold flex items-center">
              Current DataSet: {dataIndex}
            </div>
          </div>
          <div>
            {data.map((data, index) => {
              return (
                <div
                  key={index}
                  className="flex my-1 items-center"
                >
                  <div className="mr-auto">
                    Data Set #{index} {`(${data.rowCount} x ${data.colCount})`}
                  </div>
                  <div
                    className="w-auto h-auto mx-1 my-1 py-1 px-1 text-white bg-primary border-2 border-primary rounded"
                    onClick={() => handleSelectData(index)}
                  >
                    <label htmlFor={id}>
                      Select
                    </label>
                  </div>
                  <div
                    onClick={(e) => handleDeleteData(index)}
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

export default DataLoadout;
