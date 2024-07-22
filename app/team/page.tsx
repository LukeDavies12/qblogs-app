import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllTeamUsersDTO } from "@/data/users/teamUsersDTO";
import Link from "next/link";

export default async function Page() {
  const users = await getAllTeamUsersDTO();
  console.log(users);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold">My Team</h1>
      <h2 className="font-medium">Members</h2>
      <Table className="md:w-1/2">
        <TableCaption>(List of all team members.)</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>App Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any) => (
            <TableRow key={user.full_name}>
              <TableCell className="px-4 py-2">{user.full_name}</TableCell>
              <TableCell className="px-4 py-2">{user.type}</TableCell>
              <TableCell className="px-4 py-2">{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link href={"team/members/new"}>
        <Button variant={"link"} className="md:w-1/2">
          Create New Member
        </Button>
      </Link>
    </div>
  );
}
