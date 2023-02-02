import { useAppSelector } from "../../app/hooks";
import { selectDataSize } from "../api/dataSlice";
import AddBtn from "../../components/buttons/AddBtn";
import RemoveBtn from "../../components/buttons/RemoveBtn";

type RowLabelProps = {};

function RowLabel(props: RowLabelProps) {
  const { rowCount } = useAppSelector(selectDataSize);
  const labelArr = Array.from({ length: rowCount });

  return (
    <div>
      <div className="h-4 lg:h-6">&nbsp;</div>
      <div className="bg-transparent w-16 h-6 lg:w-24 lg:h-12">&nbsp;</div>

      {labelArr.map((_, index: number) => {
        return (
          <div className="flex" key={`label-dataRow-${index}`}>
            <div className="flex-col justify-between">
              <div className="text-white ">
                <RemoveBtn />
              </div>
              <div className="text-white py-2">
                <AddBtn />
              </div>
            </div>
            <div className="w-16 h-8 lg:w-24 lg:h-16 border-y-2 border-r-2 flex place-content-center items-center bg-slate-900 text-white rounded-l">
              {`R${index + 1}`}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RowLabel;
