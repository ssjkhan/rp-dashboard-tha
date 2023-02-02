import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectDataCell,
  updateData,
  UpdateDataPayload,
} from "../api/dataSlice";
import { DataToSymbol, SymbolToData } from "../../utils/dataDisplay";

type DataCellProps = {
  rowIndex: number;
  colIndex: number;
};

function DataCell(props: DataCellProps) {
  const { rowIndex: row, colIndex: col } = props;
  const [isEdit, setEdit] = useState(false);
  const cellData = useAppSelector((state) => selectDataCell(state, row, col));
  const [val, setVal] = useState(DataToSymbol(cellData));
  const dispatch = useAppDispatch();

  // Variable tailwind styling
  const cellClass =
    "w-16 h-8 lg:w-32 lg:h-16 place-content-center flex items-center text-center border-2 rounded";
  const colorClass = (data: number) => {
    if (data === 1) return " bg-slate-700 text-white";
    return " bg-slate-400";
  };

  // handlers for events
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    function cellFormValidation(input: any) {
      if (input === "X" || input === "x") return 1;
      return 0;
    }

    const val = cellFormValidation(e.currentTarget.value);
    setVal(DataToSymbol(val));
  };

  const handleOnFocus = () => {
    setEdit(true);
  };

  const handleOnBlur = () => {
    const updateAction: UpdateDataPayload = {
      rowIndex: row,
      colIndex: col,
      value: SymbolToData(val),
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
