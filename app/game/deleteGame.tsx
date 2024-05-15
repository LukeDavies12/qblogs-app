'use client'

import { DeleteGameAction } from "./gameAction";

export default function DeleteGame({ gameId }: { gameId: string }) {
  function handleDelete() {
    const confirmDelete = window.confirm("Are you sure you want to delete this game?");
    if (confirmDelete) {
      console.log("Deleting game with ID:", gameId);
      DeleteGameAction(gameId)
    }
  }

  return (
    <button className="text-red-500" onClick={handleDelete}>Delete</button>
  );
}
