import DataCell from "./DataCell";
import { selectDataRow } from "./dataSlice";
import { useAppSelector } from "../../app/hooks";

type DataRowProps = {
  rowIndex: number;
};

function DataRow(props: DataRowProps) {
  const { rowIndex } = props;
  const data = useAppSelector((state) => selectDataRow(state, rowIndex));

  return (
    <div className="flex">
      {data.map((_, colIndex) => (
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
