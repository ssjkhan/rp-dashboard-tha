import React from "react";

type SideBarPropsType = {};

function SideBar({}: SideBarPropsType) {
  return (
    <div className="flex">
      <div className="flex flex-col h-screen p-3 bg-base-200 shadow w-30 lg:w-60">
        <div className="space-y-3">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold">
              <span className="text-primary">Riahi</span> Patents
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
