'use client';

import { Button } from "@/components/ui/button";
import { DeletePlayAction } from "./deletePlay";
import { useRef, FormEvent } from "react";

export default function DeletePlay({ playId, fromGameId }: { playId: string, fromGameId: string }) {
  const ref = useRef<HTMLFormElement>(null);

  async function handleDelete(event: FormEvent) {
    event.preventDefault();
    const confirmDelete = window.confirm("Are you sure you want to delete this play?");
    if (confirmDelete) {
      try {
        await DeletePlayAction(playId, fromGameId);
        console.log("Play deleted successfully");
        // Optionally, you can add any additional logic after deletion here
      } catch (error) {
        console.error("Error deleting play:", error);
      }
    }
  }

  return (
    <form action={handleDelete} ref={ref}>
      <Button variant={"outline"} type="submit" className="w-full text-red-700 bg-red-100 hover:text-red-700">
        Delete
      </Button>
    </form>
  );
}
