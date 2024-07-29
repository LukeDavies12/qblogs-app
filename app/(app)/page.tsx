import { LinkButton } from "@/components/ui/LinkButton";
import { UserInfo } from "@/components/user/UserInfo";

export default async function Page() {


  return (
    <>
      <UserInfo user={user.user} />
      <h2>{user.user.currentGameName}</h2>
      <LinkButton href={`/game/plays/${user.user.currentGameId}`} label="View/Update Plays" />
    </>
  );
}