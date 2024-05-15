import Link from "next/link"

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold">My Team</h1>
      <h2 className="font-medium">Members</h2>
      <Link href={"team/members/new"}>
        <button>Create New Member</button>
      </Link>
    </div>
  )
}