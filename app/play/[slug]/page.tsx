import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient();

  const { data: play, error: playError } = await supabase
    .from('plays')
    .select('*')
    .eq('id', params.slug)
    .single();

  const { data: qb, error: qbError } = await supabase
    .from('team_qbs')
    .select('full_name')
    .eq('id', play?.qb_id as string)
    .single();

  const { data: gameDrive, error: gameDriveError } = await supabase
    .from('game_drives')
    .select('game_id, drive_in_game')
    .eq('id', play?.game_drive_id as string)
    .single();

  const { data: game, error: gameError2 } = await supabase
    .from('games')
    .select('name, id')
    .eq('id', gameDrive?.game_id as string)
    .single();

  if (!play || playError) return <div>Error loading play details.</div>;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-xl">
        Drive {gameDrive?.drive_in_game} Play {play?.num_in_drive} from {game?.name}
      </h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Play Details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="md:flex md:gap-2">
            <div className="md:w-1/6">
              <Label className="text-muted-foreground">Play # in Drive</Label>
              <div>{play.num_in_drive}</div>
            </div>
            <div className="md:w-1/6">
              <Label className="text-muted-foreground">Down</Label>
              <div>{play.down}</div>
            </div>
            <div className="md:w-1/6">
              <Label className="text-muted-foreground">Distance</Label>
              <div>{play.distance}</div>
            </div>
            <div className="md:w-1/6">
              <Label className="text-muted-foreground">Hash</Label>
              <div>{play.hash}</div>
            </div>
            <div className="md:w-1/6">
              <Label className="text-muted-foreground">Yard Line</Label>
              <div>{play.yard_line}</div>
            </div>
            <div className="md:w-1/6">
              <Label className="text-muted-foreground">Qb In</Label>
              <div>{qb?.full_name}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-9">
            <div>
              <Label className="text-muted-foreground">Personnel</Label>
              <div>{play.personnel}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">Formation</Label>
              <div>{play.formation}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">Back Tag</Label>
              <div>{play.back_tag}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">Strength</Label>
              <div>{play.strength}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">Motion</Label>
              <div>{play.motion}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">Pass Pro</Label>
              <div>{play.pass_pro}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">Play Call</Label>
              <div>{play.call}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">Tags</Label>
              <div>{play.call_tag}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">Play Family</Label>
              <div>{play.call_family}</div>
            </div>
          </div>

          <div className="md:grid md:grid-cols-9 md:gap-2">
            <div>
              <Label className="text-muted-foreground">Result</Label>
              <div>{play.type}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">Yards</Label>
              <div>{play.yards}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">QB Pressured</Label>
              <div>{play.qb_pressured}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">QB Read Correct</Label>
              <div>{play.qb_read_yn}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">QB Maxed Execution</Label>
              <div>{play.qb_play_yn}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">QB Accurate</Label>
              <div>{play.qb_ball_placement_good}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">Turnover Worthy Play</Label>
              <div>{play.turnover_worthy_play}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">Defense Front</Label>
              <div>{play.defense_front}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">Defense Coverage</Label>
              <div>{play.defense_coverage}</div>
            </div>
          </div>

          <div className="md:flex md:gap-2">
            <div className="md:w-1/2">
              <Label className="text-muted-foreground">Notes</Label>
              <div>{play.notes}</div>
            </div>
            <div className="md:w-1/2">
              <Label className="text-muted-foreground">Bad Play Reason</Label>
              <div>{play.bad_play_reason}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Link href={`/play/${play.id}/update`}>
        <Button variant={"outline"} className="w-full">Update Play</Button>
      </Link>
      <Link href={`/game/plays/${game?.id}`}><Button variant={"link"} className="w-full">View All Plays from {game?.name}</Button></Link>
    </div>
  );
}
