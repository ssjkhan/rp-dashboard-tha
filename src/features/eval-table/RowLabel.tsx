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
              <div className="flex">
                <div className="text-white flex-col">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 lg:w-6 h-4 lg:h-6 fill-slate-900"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 lg:w-6 h-4 lg:h-6 flex-no-shrink fill-lime-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
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
