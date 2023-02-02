type MissingElCellPropsType = {
  elList: number[];
};

function MissingElCell(props: MissingElCellPropsType) {
  const { elList } = props;

  return (
    <div className="flex">
      <div className="w-8 h-8 lg:w-16 lg:h-16 flex items-center justify-center">
        {elList.length}:
      </div>
      <div className="w-auto h-8 lg:w-16 lg:h-16 flex items-center justify-start">
        {elList.map((el: number) => {
          return <span key={`missingEl-${el}`}>E{el + 1}&nbsp;</span>;
        })}
      </div>
    </div>
  );
}

export default MissingElCell;
