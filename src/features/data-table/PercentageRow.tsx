import { selectData, selectDataIndex, selectDataSize } from "../api/dataSlice";
import { useAppSelector } from "../../app/hooks";
import PercentageCell from "./PercentCell";

type PercentageRowProps = {};

function PercentageRow(props: PercentageRowProps) {
  const dataIndex = useAppSelector(selectDataIndex);
  const data = useAppSelector((state) => selectData(state, dataIndex));
  const { rowCount, colCount } = useAppSelector((state) =>
    selectDataSize(state, dataIndex)
  );
  const percentArr: number[] = Array(colCount).fill(0);
  // linear scan and percentage match calculations
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      percentArr[j] += data[i][j];
    }
  }

  for (let i = 0; i < colCount; i++) {
    percentArr[i] = Math.floor((percentArr[i] / rowCount) * 100);
  }

  return (
    <div className="flex mt-1">
      {percentArr.map((_, index) => {
        return (
          <PercentageCell
            key={`percentageCell-${index}`}
            val={percentArr[index]}
          />
        );
      })}
    </div>
  );
}

export default PercentageRow;
