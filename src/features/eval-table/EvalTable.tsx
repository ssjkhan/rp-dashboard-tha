import RowLabel from "./RowLabel";
import EvalRow from "./EvalRow";
import { useAppSelector } from "../../app/hooks";
import { selectStatementsSize } from "../api/evalSlice";

type EvalTableProps = {};

function EvalTable({}: EvalTableProps) {
  const countStatements = useAppSelector(selectStatementsSize);

  return (
    <div className="flex">
      <RowLabel />
      <div>
        {Array.from({ length: countStatements }).map(
          (_: unknown, index: number) => {
            return <EvalRow key={`evalRow=${index}`} index={index} />;
          },
        )}
      </div>
    </div>
  );
}

export default EvalTable;
