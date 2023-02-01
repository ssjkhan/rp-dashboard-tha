type HeaderCellProps = {
  index: number;
};

function HeaderCell(props: HeaderCellProps) {
  const { index } = props;
  return (
    <div className="w-16 lg:w-32 h-6 lg:h-12 flex place-content-center items-center text-center text-white bg-slate-900 border-x-2 border-b-2 rounded-t">
      E{index + 1}
    </div>
  );
}

export default HeaderCell;
