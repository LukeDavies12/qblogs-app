'use client'

import Link from "next/link";
import { DeleteGameAction } from "./gameAction";

export default function DeleteGame({ gameId }: { gameId: string }) {
  function handleDelete() {
    const confirmDelete = window.confirm("Are you sure you want to delete this game?");
    if (confirmDelete) {
      // Call the delete function here
      // Example: deleteGame(gameId);
      console.log("Deleting game with ID:", gameId);
      // After deletion, you may want to redirect or perform other actions
      DeleteGameAction(gameId)
    }
  }

  return (
    <button className="text-red-500" onClick={handleDelete}>Delete</button>
  );
}
