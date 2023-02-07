import DataTable from "./features/data-table/DataTable";
import SideBar from "./components/side-bar/SideBar";
import EvalTable from "./features/eval-table/EvalTable";
import MissingElements from "./features/missing-elements/MissingTable";
import DataLoadout from "./features/dataStore/DataLoadout";

function App() {
  return (
    <div className="App">
      <div className="flex">
        <SideBar />
        <div className="ml-5 mr-auto mt-12 justify-center">
          <div className="">
            <DataTable />
          </div>
          <div className="mt-4 flex">
            <EvalTable />
            <MissingElements />
          </div>
          <div className="mt-4 flex">
            <DataLoadout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
