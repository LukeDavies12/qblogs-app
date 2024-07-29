import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GetTeamUsers } from '@/data/teams/GetAllUsers';
import { TeamUser } from "@/data/teams/TeamUser";
import { GetUser } from "@/data/users/GetUser";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from 'react';

// Separate component for the table to allow for suspense
async function TeamTable({ teamId }: { teamId: string }) {
  const teamUsers = await GetTeamUsers(teamId);

  return (
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
        {teamUsers.map((user: TeamUser) => (
          <TableRow key={user.fullName}>
            <TableCell className="px-4 py-2">{user.fullName}</TableCell>
            <TableCell className="px-4 py-2">{user.type}</TableCell>
            <TableCell className="px-4 py-2">{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default async function Page() {
  const user = await GetUser();
  if (!user) redirect('/login');
  
  const currentTeamId = user.user.teamId;
  if (!currentTeamId) redirect('/error');

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold">My Team</h1>
      <h2 className="font-medium">Members</h2>
      <Suspense fallback={<div>Loading team members...</div>}>
        <TeamTable teamId={currentTeamId} />
      </Suspense>
      <Link href={"team/members/new"}>
        <Button variant={"link"} className="md:w-1/2">
          Create New Member
        </Button>
      </Link>
    </div>
  );
}