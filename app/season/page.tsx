import { createClient } from "@/utils/supabase/server";
import CreateSpringGame from "../games/createSpringGame";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DeleteGame from "../game/deleteGame";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';


export default async function Page() {
  const supabase = createClient();

  const { data: publicUser } = await supabase.from("users").select("*").eq("auth_id", (await supabase.auth.getUser()).data.user?.id).single();
  const { data: currentSeason } = await supabase.from("seasons").select("*").eq("id", publicUser?.current_season_id).single();

  if (currentSeason.type == "Spring") {
    const { data: springGame } = await supabase.from("games").select("*").eq("season_id", currentSeason.id).single();

    if (springGame) {
      return (
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl">{currentSeason.type} {currentSeason.year}</h1>
          <Table>
            <TableCaption>All Games for your current season.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">{currentSeason.type} {currentSeason.year}</h1>
          <h2 className="font-medium">Game</h2>
          <CreateSpringGame />
        </div>
      )
    }
  } else {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">{currentSeason.type} {currentSeason.year}</h1>
        <h2 className="font-medium">Game</h2>
      </div>
    )
  }
}