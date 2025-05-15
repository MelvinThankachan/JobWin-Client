import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { toggleUserActivation } from "@/services/adminService";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import type { Employer as EmployerType } from "@/services/adminService";

type EmployerTableProps = {
  data: EmployerType[];
  onStatusToggle: (userId: number) => void;
};

const EmployerTable: React.FC<EmployerTableProps> = ({
  data,
  onStatusToggle,
}) => {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleViewUser = (userId: number) => {
    navigate(`/winadmin/user/${userId}`);
  };

  const handleToggleStatus = async (userId: number, isActive: boolean) => {
    try {
      setLoadingId(userId);
      await toggleUserActivation(userId);
      onStatusToggle(userId);
      toast.success(
        `User ${isActive ? "disapproved" : "approved"} successfully`
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
      toast.error("Failed to update user status");
    } finally {
      setLoadingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Table className="text-xl">
      <TableCaption>A list of employers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-center">Joined At</TableHead>
          <TableHead className="text-center">Verified</TableHead>
          <TableHead className="text-center">Approved</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center py-8 text-muted-foreground"
            >
              No employers found
            </TableCell>
          </TableRow>
        ) : (
          data.map((employer) => (
            <TableRow
              key={employer.id}
              className={!employer.is_active ? "opacity-60" : ""}
            >
              <TableCell className="font-medium">{employer.id}</TableCell>
              <TableCell
                className="cursor-pointer hover:text-primary hover:underline"
                onClick={() => handleViewUser(employer.id)}
              >
                {employer.email}
              </TableCell>
              <TableCell className="text-center">
                {formatDate(employer.created_at)}
              </TableCell>
              <TableCell className="text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xl ${
                    employer.is_verified
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {employer.is_verified ? "Verified" : "Unverified"}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xl ${
                    employer.is_active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {employer.is_active ? "Approved" : "Disapproved"}
                </span>
              </TableCell>
              <TableCell className="flex justify-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleViewUser(employer.id)}
                >
                  View
                </Button>
                <Button
                  variant={employer.is_active ? "destructive" : "outline"}
                  size="sm"
                  onClick={() =>
                    handleToggleStatus(employer.id, employer.is_active)
                  }
                  disabled={loadingId === employer.id}
                >
                  {loadingId === employer.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : employer.is_active ? (
                    "Disapprove"
                  ) : (
                    "Approve"
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default EmployerTable;
