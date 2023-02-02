import { useAppSelector } from "../../app/hooks";
import { selectStatementsIndex } from "../api/evalSlice";
import { selectDataAll, selectDataSize } from "../api/dataSlice";

type EvalRowType = {
  index: number;
};

function EvalRow(props: EvalRowType) {
  const { index } = props;
  const { colCount } = useAppSelector(selectDataSize);
  const data = useAppSelector(selectDataAll);
  const { rowIndex1, rowIndex2 } = useAppSelector((state) =>
    selectStatementsIndex(state, index)
  );

  function getSum(row1: number, row2: number, col: number) {
    return data[row1][col] + data[row2][col];
  }

  return (
    <div className="flex">
      {Array.from({ length: colCount }).map((_: unknown, colIndex: number) => {
        const sum = getSum(rowIndex1, rowIndex2, colIndex);
        var className =
          "w-16 h-8 lg:w-32 lg:h-16 place-content-center flex items-center text-center border-2 rounded-lg ";

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
