import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  delData,
  loadData,
  newData,
  selectDataAll,
  selectDataIndex,
} from "../api/dataSlice";

type DataLoadoutProps = {};

function DataLoadout(props: DataLoadoutProps) {
  const dataIndex = useAppSelector(selectDataIndex);
  const data = useAppSelector(selectDataAll);
  const dispatch = useAppDispatch();

  function handleNewData() {
    dispatch(newData());
  }

  function handleDeleteData(index: number) {
    dispatch(delData({ index: index }));
  }

  function handleSelectData(index: number) {
    dispatch(loadData(index));
  }
  return (
    <div>
      <div className="flex justify-around">
        <div className="mx-1 flex items-center">Current Data #{dataIndex}</div>
        <div
          onClick={() => handleNewData()}
          className="btn w-auto h-8 mx-1 my-1 bg-teal-500 border-0"
        >
          Add new Data
        </div>
      </div>
      <div>
        {data.map((data, index) => {
          return (
            <div
              key={index}
              className="flex my-1 items-center mr-auto"
            >
              <div className="mr-2">
                Data Set #{index}
              </div>
              <div
                className="btn mx-1 h-8"
                onClick={() => handleSelectData(index)}
              >
                Select
              </div>
              <div className="btn mx-1">Edit</div>
              <div
                onClick={(e) => handleDeleteData(index)}
                className="btn mx-1"
              >
                Delete
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DataLoadout;
