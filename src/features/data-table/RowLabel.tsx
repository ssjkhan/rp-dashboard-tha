import { useAppSelector } from "../../app/hooks";
import { selectDataSize } from "../api/dataSlice";

type RowLabelProps = {};

function RowLabel(props: RowLabelProps) {
  const { rowCount } = useAppSelector(selectDataSize);
  const labelArr = Array.from({ length: rowCount });

  return (
    <div>
      <div className="bg-transparent w-16 h-6 lg:w-24 lg:h-12">&nbsp;</div>

      {labelArr.map((_, index: number) => {
        return (
          <div className="w-16 h-8 lg:w-24 lg:h-16 border-y-2 border-r-2 flex place-content-center items-center bg-slate-900 text-white rounded-l">
            {`R${index}`}
          </div>
        );
      })}
    </div>
  );
}

export default RowLabel;
