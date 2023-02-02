import { useAppSelector } from "../../app/hooks";
import { EvalStatement, selectStatementsSize } from "../api/evalSlice";
import EvalOperand from "./EvalOperand";
type RowLabelPropsType = {};

function RowLabel(props: RowLabelPropsType) {
  const countStatements = useAppSelector(selectStatementsSize);

  return (
    <>
      <div>
        {Array.from({ length: countStatements }).map(
          (_: unknown, index: number) => {
            return (
              <div
                key={`evalRowLabel-${index}`}
                className="w-16 h-8 lg:w-24 lg:h-16 border-y-2 border-r-2 flex place-content-center items-center bg-slate-900 text-white rounded-lg"
              >
                <EvalOperand evalIndex={index} position={1} />
                <div>&nbsp;+&nbsp;</div>
                <EvalOperand evalIndex={index} position={2} />
              </div>
            );
          },
        )}
      </div>
    </>
  );
}

export default RowLabel;
