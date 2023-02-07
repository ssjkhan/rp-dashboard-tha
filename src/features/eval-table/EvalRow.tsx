import { useAppSelector } from "../../app/hooks";
import { selectStatementsIndex } from "../api/evalSlice";
import { selectData, selectDataIndex, selectDataSize } from "../api/dataSlice";

type EvalRowType = {
  index: number;
};

function EvalRow(props: EvalRowType) {
  const { index } = props;
  const dataIndex = useAppSelector(selectDataIndex);
  const { colCount } = useAppSelector((state) =>
    selectDataSize(state, dataIndex)
  );
  const data = useAppSelector((state) => selectData(state, dataIndex));
  const { rowIndex1, rowIndex2 } = useAppSelector((state) =>
    selectStatementsIndex(state, index)
  );

  function getSum(row1: number, row2: number, col: number) {
    return data[row1][col] + data[row2][col];
  }

  return (
    <div className="flex">
      {Array.from({ length: colCount }).map((_: unknown, colIndex: number) => {
        var sum;
        try {
          sum = getSum(rowIndex1, rowIndex2, colIndex);
        } catch (e) {
        }
        var className =
          "w-16 h-6 lg:w-32 lg:h-12 place-content-center flex items-center text-center border-2 rounded-md ";

        if (sum === 2) {
          className += " bg-lime-500 text-white";
        } else if (sum === 1) {
          className += " bg-yellow-400 text-white";
        } else {
          className += " bg-red-600 text-red-600";
        }
        return (
          <div
            key={`EvalRow-${colIndex}`}
            className={className}
          >
            {sum}
          </div>
        );
      })}
    </div>
  );
}

export default EvalRow;
