"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/forms/submit-btn"
import { CreateTeamAction } from "./team-action"
import { useFormState, useFormStatus } from "react-dom"
import FormError from "@/components/forms/form-error"

export default function CreateTeam({
  uid,
}: {
  uid: string
}) {
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
                <Input id="city" placeholder="Sioux City" name="city" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="IA" maxLength={2} name="state" required />
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
              <div className="space-y-2">
                <Label htmlFor="name">Team Name</Label>
                <Input id="name" placeholder="Briar Cliff Chargers" name="name" required />
              </div>
            </div>
            <SubmitButton />
          </div>
        </form>
      </div>
    </>
  )
}