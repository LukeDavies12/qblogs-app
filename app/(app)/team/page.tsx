import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GetUser, TeamMember } from "@/data/users/GetUser";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from 'react';

async function TeamTable({ teamMembers }: { teamMembers: TeamMember[] }) {
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
        {teamMembers.map((member, index) => (
          <TableRow key={index}>
            <TableCell className="px-4 py-2">{member.fullName}</TableCell>
            <TableCell className="px-4 py-2">{member.type}</TableCell>
            <TableCell className="px-4 py-2">{member.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default async function Page() {
  const user = await GetUser();

  if (!user) redirect('/login');
  if (!user.team) redirect('/error');

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold">My Team</h1>
      <h2 className="font-medium">Members</h2>
      <Suspense fallback={<div>Loading team members...</div>}>
        <TeamTable teamMembers={user.team.teamMembers} />
      </Suspense>
      <Link href={"team/members/new"}>
        <Button variant={"link"} className="md:w-1/2">
          Create New Member
        </Button>
      </Link>
    </div>
  );
}