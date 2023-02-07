import DataTable from "./features/data-table/DataTable";
import SideBar from "./features/side-bar/SideBar";
import EvalTable from "./features/eval-table/EvalTable";

function App() {
  return (
    <div className="App">
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <SideBar />
        </div>
        <div className="col-span-10 ml-5 mr-auto mt-12 justify-center">
          <div className="">
            <DataTable />
          </div>
          <div className="mt-4 flex">
            <EvalTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
