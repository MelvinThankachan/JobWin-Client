import { dummyEmployerData } from "@/data/dummy-table-data";
import EmployerTable from "./employer-table";

const WinAdminEmployers = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="text-5xl">Candidates List</div>
        <EmployerTable data={dummyEmployerData} />
      </div>
    </div>
  );
};

export default WinAdminEmployers;
