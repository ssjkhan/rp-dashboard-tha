type PercentCellPropsType = {
  val: number;
};

function PercentCell(props: PercentCellPropsType) {
  const { val } = props;
  return (
    <div className="w-16 lg:w-32 h-8 lg:h-16 place-content-center flex items-center text-center text-white bg-transparent   
     ">
      {val} %
    </div>
  );
}

export default PercentCell;
