import { useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { selectData, selectDataIndex } from "../api/dataSlice";
import HeaderRow from "./HeaderRow";
import DataRow from "./DataRow";
import PercentageRow from "./PercentageRow";
import RowLabel from "./RowLabel";

type DataTableProps = {};

function DataTable({}: DataTableProps) {
  const dataIndex = useAppSelector(selectDataIndex);
  const data = useAppSelector((state) => selectData(state, dataIndex));

  return (
    <div>
      <div className="flex">
        <RowLabel />
        <div>
          <HeaderRow />
          {data.map((_: number[], rowIndex: number) => (
            <DataRow key={`data-row-${rowIndex}`} rowIndex={rowIndex} />
          ))}
          <PercentageRow />
        </div>
      </div>
    </div>
  );
}

export default DataTable;
