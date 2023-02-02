import { useAppDispatch } from "../../app/hooks";
import {
  addCol,
  AddColPayload,
  deleteCol,
  DeleteColPayload,
} from "../api/dataSlice";
import AddBtn from "../../components/buttons/AddBtn";
import RemoveBtn from "../../components/buttons/RemoveBtn";

type HeaderCellProps = {
  index: number;
};

function HeaderCell(props: HeaderCellProps) {
  const { index } = props;
  const dispatch = useAppDispatch();
  const isFirstCol = index === 0;

  const handleAddBtnClick = () => {
    const action: AddColPayload = {
      index: index,
    };
    dispatch(addCol(action));
  };

  const handleRemoveBtnClick = () => {
    const action: DeleteColPayload = {
      index: index,
    };

    dispatch(deleteCol(action));
  };

  return (
    <div>
      {isFirstCol
        ? (
          <div className="text-white flex justify-end px-2">
            <div onClick={() => handleAddBtnClick()}>
              <AddBtn />
            </div>
          </div>
        )
        : (
          <div className="text-white flex justify-between">
            <div className="px-2 " onClick={() => handleRemoveBtnClick()}>
              <RemoveBtn />
            </div>{" "}
            <div className="px-2" onClick={() => handleAddBtnClick()}>
              <AddBtn />
            </div>
          </div>
        )}
      <div className="w-16 lg:w-32 h-6 lg:h-12 flex place-content-center items-center text-center text-center text-white bg-slate-900 border-x-2 border-b-2 rounded-t">
        <div>
          E{index + 1}
        </div>
      </div>
    </div>
  );
}

export default HeaderCell;
