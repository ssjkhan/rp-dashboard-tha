import React from "react";
import DataLoadOut from "./DataLoadout";
import NewData from "./NewData";
import NewTests from "./NewTests";
import LoadTests from "./LoadTests";
import ExportDataToSheets from "./ExportData";

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
          <div>
            <NewData />
          </div>
          <div>
            <NewTests />
          </div>
          <div>
            <DataLoadOut />
          </div>
          <div>
            <LoadTests />
          </div>
          <div>
            <ExportDataToSheets />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
