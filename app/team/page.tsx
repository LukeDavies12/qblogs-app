import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Page() {
  const supabase = createClient();

  // Retrieve the current user's team ID
  const { data: currentUser } = await supabase.auth.getUser();
  const { data: currentUserData } = await supabase
    .from("users")
    .select("current_team_id")
    .eq("auth_id", currentUser.user?.id as string)
    .single();

  // If the current user doesn't belong to any team, handle it accordingly
  if (!currentUserData || !currentUserData.current_team_id) {
    return <div>You are not a member of any team.</div>;
  }

  // Retrieve all members of the current team
  const { data: members } = await supabase
    .from("members")
    .select("user_id")
    .eq("team_id", currentUserData.current_team_id);

  // If there are no members in the team, handle it accordingly
  if (!members || members.length === 0) {
    return <div>No members found in your team.</div>;
  }

  // Extract member IDs
  const memberIDs = members.map((member) => member.user_id);

  // Retrieve user data for each member
  const { data: publicUsers, error } = await supabase
    .from("users")
    .select("type, full_name")
    .in("auth_id", memberIDs);

  // Handle errors, if any
  if (error) {
    return <div>Error fetching user data: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold">My Team</h1>
      <h2 className="font-medium">Members</h2>
      <Table className="md:w-1/2">
        <TableCaption>(List of all team members.)</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Full Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {publicUsers.map((user) => (
            <TableRow key={user.full_name}>
              <TableCell className="px-4 py-2">{user.type}</TableCell>
              <TableCell className="px-4 py-2">{user.full_name}</TableCell>
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
