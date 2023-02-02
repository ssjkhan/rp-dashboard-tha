import HeaderCell from "./HeaderCell";
import { useAppSelector } from "../../app/hooks";
import { selectDataRow } from "../api/dataSlice";
type HeaderRowProps = {};

function HeaderRow(props: HeaderRowProps) {
  const data = useAppSelector((state) => selectDataRow(state, 0));

  return (
    <div className="flex">
      {data.map((_: string, index: number) => <HeaderCell index={index} />)}
    </div>
  );
}

export default HeaderRow;
