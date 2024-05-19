'use client'

import { Button } from "@/components/ui/button";
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
    <Button variant={"ghost"} className="text-red-500" onClick={handleDelete}>Delete</Button>
  );
}
