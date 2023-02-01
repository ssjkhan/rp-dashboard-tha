import React from "react";
import DataTable from "./features/data-table/DataTable";
import SideBar from "./components/side-bar/SideBar";

function App() {
  return (
    <div className="App">
      <div className="flex">
        <SideBar />
        <div className="mx-auto mt-12 justify-center">
          <DataTable />
        </div>
      </div>
    </div>
  );
}

export default App;
