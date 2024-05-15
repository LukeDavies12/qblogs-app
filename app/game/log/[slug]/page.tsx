export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold">Log Play</h1>
      <h2 className="font-medium">Game Drive - 2024 Spring Game 1</h2>
      {/* button to toggle form to create new game_drive */}
      {/* form to log play, server action takes in game_drive_id from users current set */}
    </div>
  )
}