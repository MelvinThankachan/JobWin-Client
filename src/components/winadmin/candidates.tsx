import { useState, useEffect } from "react";
import { Candidate, fetchCandidates } from "@/services/adminService";
import CandidateTable from "./candidate-table";
import { Loader2 } from "lucide-react";

const WinAdminCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        setLoading(true);
        const data = await fetchCandidates();
        setCandidates(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setError("Failed to load candidates. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadCandidates();
  }, []);

  const handleUserStatusToggle = (userId: number) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === userId
          ? { ...candidate, is_active: !candidate.is_active }
          : candidate
      )
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="text-5xl">Candidates List</div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-destructive text-center p-4">{error}</div>
        ) : (
          <CandidateTable
            data={candidates}
            onStatusToggle={handleUserStatusToggle}
          />
        )}
      </div>
    </div>
  );
};

export default WinAdminCandidates;
