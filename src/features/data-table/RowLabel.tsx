import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectDataSize } from "../api/dataSlice";
import { addRow, AddRowPayload, delRow, DelRowPayload } from "../api/dataSlice";
import AddBtn from "../../components/buttons/AddBtn";
import RemoveBtn from "../../components/buttons/RemoveBtn";

type RowLabelProps = {};

function RowLabel(props: RowLabelProps) {
  const { rowCount } = useAppSelector(selectDataSize);
  const labelArr = Array.from({ length: rowCount });
  const dispatch = useAppDispatch();

  const handleAddBtnClick = (index: number) => {
    const action: AddRowPayload = {
      index: index,
    };

    dispatch(addRow(action));
  };

  const handleRemoveBtnClick = (index: number) => {
    const action: DelRowPayload = {
      index: index,
    };

    dispatch(delRow(action));
  };

  return (
    <div>
      <div className="h-4 lg:h-6">&nbsp;</div>
      <div className="bg-transparent w-16 h-6 lg:w-24 lg:h-12">&nbsp;</div>

      {labelArr.map((_, index: number) => {
        const isFirst = index === 0;

        return (
          <div className="flex" key={`label-dataRow-${index}`}>
            {isFirst
              ? (
                <div className="flex items-end ">
                  <div
                    className="text-white py-1 "
                    onClick={() => handleAddBtnClick(index)}
                  >
                    <AddBtn />
                  </div>
                </div>
              )
              : (
                <>
                  <div className="flex-col justify-between">
                    <div
                      className="text-white "
                      onClick={() => handleRemoveBtnClick(index)}
                    >
                      <RemoveBtn />
                    </div>
                    <div
                      className="text-white py-2"
                      onClick={() => handleAddBtnClick(index)}
                    >
                      <AddBtn />
                    </div>
                  </div>
                </>
              )}
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
