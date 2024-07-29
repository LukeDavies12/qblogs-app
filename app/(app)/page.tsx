import { LinkButton } from "@/components/ui/LinkButton";
import { UserInfo } from "@/components/user/UserInfo";
import { GetUser } from "@/data/users/GetUser";

export default async function Page() {
  const user = await GetUser();

  return (
    <>
      <UserInfo user={user} />
      <h2>{user?.currentGameName}</h2>
      <LinkButton href={`/game/plays/${user?.currentGameId}`} label="View/Update Plays" />
    </>
  );
}