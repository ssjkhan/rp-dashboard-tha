import { useAppSelector } from "../../app/hooks";
import { selectStatementsAll } from "../api/evalSlice";
import { selectDataAll, selectDataSize } from "../api/dataSlice";
import MissingElCell from "./MissingElementCell";

type MissingElementsPropsType = {};

function MissingElements(props: MissingElementsPropsType) {
  const statements = useAppSelector(selectStatementsAll);
  const data = useAppSelector(selectDataAll);
  const { colCount } = useAppSelector(selectDataSize);

  // calculate missing elements

  // missingArr safe as number[] due to intialization
  const missingArr = [] as number[][];

  statements.forEach((statement, index) => {
    // initialize array for new row
    // [] is safe as number[] from intialization
    missingArr.push([] as number[]);
    const { rowIndex1, rowIndex2 } = statement;

    // check each element combination
    for (let col = 0; col < colCount; col++) {
      let val1 = data[rowIndex1][col];
      let val2 = data[rowIndex2][col];

      if (val1 === 0 && val2 === 0) missingArr[index].push(col);
    }
  });

  return (
    <div>
      <div className="flex">
      </div>
      {missingArr.map((elList: number[], index) => {
        return <MissingElCell key={`missingElCell-${index}`} elList={elList} />;
      })}
    </div>
  );
}

export default MissingElements;
