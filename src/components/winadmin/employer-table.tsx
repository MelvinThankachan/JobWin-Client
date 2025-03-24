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

type Employer = {
  id: number;
  company_name: string;
  email: string;
  joinedAt: string;
};

type EmployerTableProps = {
  data: Employer[];
};

const EmployerTable: React.FC<EmployerTableProps> = ({ data }) => {
  return (
    <Table className="text-xl">
      <TableCaption>A list of employers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Company Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-center">Joined At</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((employer) => (
          <TableRow key={employer.id}>
            <TableCell className="font-medium">{employer.id}</TableCell>
            <TableCell className="cursor-pointer hover:text-primary hover:underline">
              {employer.company_name}
            </TableCell>
            <TableCell>{employer.email}</TableCell>
            <TableCell className="text-center">{employer.joinedAt}</TableCell>
            <TableCell className="flex justify-center gap-2">
              <Button variant="secondary">View</Button>
              <Button variant="destructive">Block</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployerTable;
