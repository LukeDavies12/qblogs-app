import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();

  // Retrieve the current user's team ID
  const { data: currentUser } = await supabase.auth.getUser();
  const { data: currentUserData } = await supabase
    .from("users")
    .select("current_team_id")
    .eq("auth_id", currentUser.user?.id)
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
      <h1 className="font-bold text-xl">My Team</h1>
      <h2 className="font-medium text-lg">Members</h2>
      <table className="w-full md:w-1/2 border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left font-medium">Type</th>
            <th className="px-4 py-2 text-left font-medium">Full Name</th>
            <th className="px-4 py-2 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {publicUsers.map((user) => (
            <tr key={user.full_name} className="border-b border-gray-200">
              <td className="px-4 py-2">{user.type}</td>
              <td className="px-4 py-2">{user.full_name}</td>
              <td className="px-4 py-2">
                <Link href={`team/members/delete/${user.type}`}>
                  <span className="text-red-500 cursor-pointer">Delete</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href={"team/members/new"} className="px-8 py-2 w-full md:w-1/2 bg-neutral-100 text-emerald-700 underline text-center mt-2">
        Create New Member
      </Link>
    </div>
  );
}
