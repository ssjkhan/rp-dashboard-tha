import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { selectDataAll } from "./dataSlice";
import HeaderRow from "./HeaderRow";
import DataRow from "./DataRow";
import PercentageRow from "./PercentageRow";
import RowLabel from "./RowLabel";

type DataTableProps = {};

function DataTable({}: DataTableProps) {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectDataAll);

  return (
    <div>
      <div className="flex">
        <RowLabel />
        <div>
          <HeaderRow />
          {data.map((_, rowIndex) => (
            <DataRow key={`data-row-${rowIndex}`} rowIndex={rowIndex} />
          ))}
          <PercentageRow />
        </div>
      </div>
    </div>
  );
}

export default DataTable;
