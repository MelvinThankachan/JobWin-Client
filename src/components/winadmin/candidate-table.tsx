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

type Candidate = {
  id: number;
  name: string;
  email: string;
  joinedAt: string;
};

type CandidateTableProps = {
  data: Candidate[];
};

const CandidateTable: React.FC<CandidateTableProps> = ({ data }) => {
  return (
    <Table className="text-xl">
      <TableCaption>A list of candidates.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-center">Joined At</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((candidate) => (
          <TableRow key={candidate.id}>
            <TableCell className="font-medium">{candidate.id}</TableCell>
            <TableCell className="cursor-pointer hover:text-primary hover:underline">
              {candidate.name}
            </TableCell>
            <TableCell>{candidate.email}</TableCell>
            <TableCell className="text-center">{candidate.joinedAt}</TableCell>
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

export default CandidateTable;
