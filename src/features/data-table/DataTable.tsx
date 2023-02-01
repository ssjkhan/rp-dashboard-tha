import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { selectDataAll } from "./dataSlice";
import DataRow from "./DataRow";
import PercentageRow from "./PercentageRow";

type DataTableProps = {};

function DataTable({}: DataTableProps) {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectDataAll);

  return (
    <>
      {data.map((_, rowIndex) => (
        <DataRow key={`data-row-${rowIndex}`} rowIndex={rowIndex} />
      ))}
      <PercentageRow />
    </>
  );
}

export default DataTable;
