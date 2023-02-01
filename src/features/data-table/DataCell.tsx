import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectDataCell, updateData, UpdateDataPayload } from "./dataSlice";

type DataCellProps = {
  rowIndex: number;
  colIndex: number;
};

function DataCell(props: DataCellProps) {
  const { rowIndex: row, colIndex: col } = props;
  const [isEdit, setEdit] = useState(false);
  const cellData = useAppSelector((state) => selectDataCell(state, row, col));
  const [val, setVal] = useState(cellData);
  const dispatch = useAppDispatch();

  // Variable tailwind styling
  const cellClass =
    "w-16 h-8 lg:w-32 lg:h-16 place-content-center flex items-center text-center border-x-2 border-y-2 rounded";
  const colorClass = (data: string) => {
    if (data === "X") return " bg-primary";
    return " bg-red-400";
  };

  // handlers for events
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    function cellFormValidation(input: any) {
      if (input === "X" || input === "x") return "X";
      return "";
    }

    const val = cellFormValidation(e.currentTarget.value);
    setVal(val);
  };

  const handleOnFocus = (e: SyntheticEvent) => {
    setEdit(true);
  };

  const handleOnBlur = (e: any) => {
    const updateAction: UpdateDataPayload = {
      rowIndex: row,
      colIndex: col,
      value: val,
    };

    dispatch(updateData(updateAction));
    setEdit(false);
  };

  return (
    <>
      {isEdit
        ? (
          <input
            className={cellClass}
            type="text"
            value={val}
            onChange={handleChange}
            onBlur={handleOnBlur}
          >
          </input>
        )
        : (
          <input
            className={cellClass +
              colorClass(cellData)}
            value={val}
            onFocus={handleOnFocus}
            onChange={handleChange}
            onBlur={handleOnBlur}
          >
          </input>
        )}
    </>
  );
}

export default DataCell;
