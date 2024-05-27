'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { DeletePlayAction } from './deletePlayAction'

export default function DeletePlay({ playId, gameId }: { playId: string, gameId: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <>
      <Button
        onClick={async () => {
          const confirmDelete = window.confirm("Are you sure you want to delete this play?");
          if (confirmDelete) {
            console.log("Deleting play with ID:", playId);
            setIsDeleting(true);
            try {
              await DeletePlayAction(playId, gameId);
            } catch (error) {
              console.error("Failed to delete play:", error);
            }
          }
        }}
        className='text-red-700 bg-red-100 hover:text-red-700'
        variant={"outline"}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting" : "Delete"} Play
      </Button>
    </>
  )
}