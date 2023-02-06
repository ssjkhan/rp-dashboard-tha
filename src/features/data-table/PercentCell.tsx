type PercentCellPropsType = {
  val: number;
};

function PercentCell(props: PercentCellPropsType) {
  const { val } = props;
  return (
    <div className="w-16 lg:w-32 h-6 lg:h-12 place-content-center flex items-center text-center text-white bg-slate-500 rounded-lg border-2 text-xs lg:text-basis ">
      {val} %
    </div>
  );
}

export default PercentCell;
