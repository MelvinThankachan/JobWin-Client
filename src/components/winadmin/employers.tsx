import { useState, useEffect } from "react";
import { Employer, fetchEmployers } from "@/services/adminService";
import EmployerTable from "./employer-table";
import { Loader2 } from "lucide-react";

const WinAdminEmployers = () => {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEmployers = async () => {
      try {
        setLoading(true);
        const data = await fetchEmployers();
        setEmployers(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching employers:", err);
        setError("Failed to load employers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadEmployers();
  }, []);

  const handleUserStatusToggle = (userId: number) => {
    setEmployers(prev => 
      prev.map(employer => 
        employer.id === userId 
          ? { ...employer, is_active: !employer.is_active } 
          : employer
      )
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="text-5xl">Employers List</div>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-destructive text-center p-4">{error}</div>
        ) : (
          <EmployerTable 
            data={employers} 
            onStatusToggle={handleUserStatusToggle} 
          />
        )}
      </div>
    </div>
  );
};

export default WinAdminEmployers;
