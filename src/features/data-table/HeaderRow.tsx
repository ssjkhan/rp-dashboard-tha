import HeaderCell from "./HeaderCell";
import { useAppSelector } from "../../app/hooks";
import { selectDataIndex, selectDataRow } from "../api/dataSlice";
type HeaderRowProps = {};

function HeaderRow(props: HeaderRowProps) {
  const dataIndex = useAppSelector(selectDataIndex);
  const data = useAppSelector((state) => selectDataRow(state, dataIndex, 0));

  return (
    <div className="flex">
      {data.map((_: number, index: number) => (
        <HeaderCell key={`headerCell-${index}`} index={index} />
      ))}
    </div>
  );
}

export default HeaderRow;
