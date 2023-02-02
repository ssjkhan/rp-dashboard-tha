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

type RowLabelPropsType = {};

function RowLabel(props: RowLabelPropsType) {
  const countStatements = useAppSelector(selectStatementsSize);
  const dispatch = useAppDispatch();

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
        {Array.from({ length: countStatements }).map(
          (_: unknown, index: number) => {
            const isFirst = index === 0;

            return (
              <div className="flex">
                {isFirst
                  ? (
                    <div className="flex">
                      <div
                        className="text-white flex items-end py-1"
                        onClick={() => handleAddBtnClick(index)}
                      >
                        <AddBtn />
                      </div>
                    </div>
                  )
                  : (
                    <div className="text-white flex-col justofy-between">
                      <div
                        className="text-white py-1"
                        onClick={() => handleDelBtnClick(index)}
                      >
                        <RemoveBtn />
                      </div>
                      <div
                        className="py-1"
                        onClick={() => handleAddBtnClick(index)}
                      >
                        <AddBtn />
                      </div>
                    </div>
                  )}
                <div
                  key={`evalRowLabel-${index}`}
                  className="w-16 h-8 lg:w-24 lg:h-16 border-y-2 border-r-2 flex place-content-center items-center bg-slate-900 text-white rounded-lg"
                >
                  <EvalOperand evalIndex={index} position={1} />
                  <div>&nbsp;+&nbsp;</div>
                  <EvalOperand evalIndex={index} position={2} />
                </div>
              </div>
            );
          },
        )}
      </div>
    </>
  );
}

export default RowLabel;
