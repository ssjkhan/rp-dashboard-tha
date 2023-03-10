type MissingElCellPropsType = {
  elList: number[];
};

function MissingElCell(props: MissingElCellPropsType) {
  const { elList } = props;
  const isComplete = elList.length === 0;

  return (
    <div className="flex">
      {isComplete
        ? (
          <div className="w-8 h-6 lg:w-16 lg:h-12 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 fill-blue-600 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          </div>
        )
        : (
          <>
            <div className="w-8 h-6 lg:w-16 lg:h-12 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 fill-amber-400 text-white "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <div className="w-auto h-6 lg:w-auto lg:h-12 flex items-center justify-start">
              {elList.length} feature{elList.length > 1 ? <>s</> : null}{" "}
              missing:
              {elList.map((el: number) => {
                return <span key={`missingEl-${el}`}>E{el + 1}&nbsp;</span>;
              })}
            </div>
          </>
        )}
    </div>
  );
}

export default MissingElCell;
