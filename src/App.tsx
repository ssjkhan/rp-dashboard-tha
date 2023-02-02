import DataTable from "./features/data-table/DataTable";
import SideBar from "./components/side-bar/SideBar";
import EvalTable from "./features/eval-table/EvalTable";
import MissingElements from "./features/missing-elements/MissingTable";

function App() {
  return (
    <div className="App">
      <div className="flex">
        <SideBar />
        <div className="mx-auto mt-12 justify-center">
          <div className="">
            <DataTable />
          </div>
          <div className="flex justify-end p-y-0 mt-3 underline">
            Missing Features
          </div>
          <div className="flex">
            <EvalTable />
            <MissingElements />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
