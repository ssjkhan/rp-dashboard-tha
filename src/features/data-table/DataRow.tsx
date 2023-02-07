import DataCell from "./DataCell";
import { selectDataIndex, selectDataRow } from "../api/dataSlice";
import { useAppSelector } from "../../app/hooks";

type DataRowProps = {
  rowIndex: number;
};

function DataRow(props: DataRowProps) {
  const { rowIndex } = props;
  const dataIndex = useAppSelector(selectDataIndex);
  const data = useAppSelector((state) =>
    selectDataRow(state, dataIndex, rowIndex)
  );

  return (
    <div className="flex">
      {data.map((_: number, colIndex: number) => (
        <DataCell
          key={`data-cell-${rowIndex}-${colIndex}`}
          rowIndex={rowIndex}
          colIndex={colIndex}
        />
      ))}
    </div>
  );
}

export default DataRow;
