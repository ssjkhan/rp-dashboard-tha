import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addStatement,
  AddStatementAction,
  deleteStatement,
  DeleteStatementAction,
  selectStatementsSize,
} from "../api/evalSlice";
import AddBtn from "../../components/buttons/AddBtn";
import RemoveBtn from "../../components/buttons/RemoveBtn";
import EvalOperand from "./EvalOperand";

type RowLabelPropsType = {
  index: number;
};

function RowLabel(props: RowLabelPropsType) {
  const { index } = props;
  const countStatements = useAppSelector(selectStatementsSize);
  const dispatch = useAppDispatch();
  const isFirst = index === 0;

  const handleAddBtnClick = (index: number) => {
    const action: AddStatementAction = {
      index: index,
      statement: { rowIndex1: 0, rowIndex2: 0 },
    };
    dispatch(addStatement(action));
  };

  const handleDelBtnClick = (index: number) => {
    const action: DeleteStatementAction = {
      index: index,
    };

    dispatch(deleteStatement(action));
  };

  return (
    <>
      <div>
        <div
          key={`evalTable-rowLable-${index}`}
          className="flex h-6 lg:h-12"
        >
          {isFirst
            ? (
              <div className="flex">
                <div
                  className="text-white flex items-end "
                  onClick={() => handleAddBtnClick(index)}
                >
                  <AddBtn />
                </div>
              </div>
            )
            : (
              <div className="text-white flex-col justify-between">
                <div
                  className="text-white"
                  onClick={() => handleDelBtnClick(index)}
                >
                  <RemoveBtn />
                </div>
                <div
                  className="text-white"
                  onClick={() => handleAddBtnClick(index)}
                >
                  <AddBtn />
                </div>
              </div>
            )}
          <div
            key={`evalRowLabel-${index}`}
            className="w-16 h-6 lg:w-24 lg:h-12 border-y-2 border-r-2 flex place-content-center items-center bg-slate-900 text-white rounded-lg"
          >
            <EvalOperand evalIndex={index} position={1} />
            <div>&nbsp;+&nbsp;</div>
            <EvalOperand evalIndex={index} position={2} />
          </div>
        </div>
      </div>
    </>
  );
}

export default RowLabel;
