import { useAppSelector } from "../../app/hooks";
import { selectStatementsIndex } from "../api/evalSlice";
import { selectData, selectDataIndex, selectDataSize } from "../api/dataSlice";
import RowLabel from "./RowLabel";
import MissingElCell from "./MissingElementCell";

type EvalRowType = {
  index: number;
};

function EvalRow(props: EvalRowType) {
  const { index } = props;
  const dataIndex = useAppSelector(selectDataIndex);
  const { rowCount, colCount } = useAppSelector((state) =>
    selectDataSize(state, dataIndex)
  );
  const data = useAppSelector((state) => selectData(state, dataIndex));

  const { rowIndex1, rowIndex2 } = useAppSelector((state) =>
    selectStatementsIndex(state, index)
  );
  const invalidRowRefs = rowCount - 1 < rowIndex1 || rowCount - 1 < rowIndex2;

  function getSum(row1: number, row2: number, col: number) {
    return data[row1][col] + data[row2][col];
  }

  const missingElements: number[] = [] as number[];

  return (
    <div className="flex">
      <RowLabel index={index} />
      {invalidRowRefs
        ? (
          <div className="w-128 flex justify-center items-center mx-5 underline">
            Invalid Row Refs for this data set
          </div>
        )
        : (
          <>
            <div className="flex">
              {Array.from({ length: colCount }).map(
                (_: unknown, colIndex: number) => {
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
                    missingElements.push(colIndex);
                  }
                  return (
                    <div
                      key={`EvalRow-${colIndex}`}
                      className={className}
                    >
                      {sum}
                    </div>
                  );
                },
              )}
            </div>
            <MissingElCell elList={missingElements} />
          </>
        )}
    </div>
  );
}

export default EvalRow;
