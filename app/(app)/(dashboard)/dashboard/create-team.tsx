"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { CreateTeamAction } from "./team-action"
import { useFormState } from "react-dom"
import FormError from "@/components/forms/form-error"
import Avatar from "./avatar"

export default function CreateTeam({
  uid,
}: {
  uid: string
}) {
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const [state, action] = useFormState(CreateTeamAction, {
    error: ""
  })

  return (
    <>
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-lg font-bold">Create New Team</h1>
        </div>
        <form action={action}>
          <div className="space-y-4">
            <FormError state={state} />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Sioux City" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="IA" maxLength={2} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Input id="level" name="level" list="levels" placeholder="NAIA" required />
                <datalist id="levels">
                  <option value="High School" />
                  <option value="D3" />
                  <option value="NAIA" />
                  <option value="D2" />
                  <option value="D1 FCS" />
                  <option value="D1 FBS" />
                  <option value="Professional" />
                </datalist>
              </div>
              <Avatar uid={uid} url={avatar_url} size={64} onUpload={(url) => {
                setAvatarUrl(url)
              }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Team Name</Label>
              <Input id="name" placeholder="Briar Cliff Chargers" required />
            </div>
            <Button className="w-full" type="submit">
              Create Team
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}