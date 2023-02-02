import React from "react";
import DataTable from "./features/data-table/DataTable";
import SideBar from "./components/side-bar/SideBar";
import EvalTable from "./features/eval-table/EvalTable";
function App() {
  return (
    <div className="App">
      <div className="flex">
        <SideBar />
        <div className="mx-auto mt-12 justify-center">
          <div className="">
            <DataTable />
          </div>
          <div className="mt-4">
            <EvalTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
