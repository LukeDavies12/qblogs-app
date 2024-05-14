"use client"

import Image from "next/image"
import { useFormStatus } from "react-dom";
import { CreateSeasonAction } from "./sznAction";
import "../(auth)/auth.css"

export default function CreateSeason() {
  return (
    <>
      <div className="flex flex-col items-center gap-4 mt-4">
        <div className="flex gap-2 items-center select-none cursor-default">
          <Image src="/qblogs_logo_lightmode.svg" alt="logo" width={44} height={44} />
          <span className="font-bold text-lg">QB Logs</span>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-lg">It looks like you are just setting up QB Logs, let&apos;s create a season to work with.</p>
          <h1 className="font-bold text-2xl text-center">New Season</h1>
        </div>
        <div>
          <form action={CreateSeasonAction}>
            <div className="flex flex-col gap-1">
              <label htmlFor="year">Year</label>
              <input type="number" name="year" id="year" placeholder="2024" required />
              <label htmlFor="type">Type</label>
              <select name="type" id="type" className="w-full mb-4" required>
                <option disabled selected hidden>Choose Fall/Spring</option>
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
              </select>
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button className="w-full font-medium bg-emerald-700 text-white rounded-sm px-8 py-2" type="submit" disabled={pending}>
      {pending ? "Creating" : "Create"} Season
    </button>
  );
};