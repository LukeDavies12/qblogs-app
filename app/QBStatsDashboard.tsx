import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QBStat, fetchQBStats } from "@/utils/qbStatsHelpers";
import { SupabaseClient } from '@supabase/supabase-js';

type QBStatsDashboardProps = {
  supabase: SupabaseClient;
};

export async function QBStatsDashboard({ supabase }: QBStatsDashboardProps) {
  const qbStats = await fetchQBStats(supabase);

  return (
    <div>
      <h1 className="font-bold">Dashboard</h1>
      <h2 className="font-medium">For All Games this Season</h2>
      <div className="space-y-4 md:grid grid-cols-2 gap-2 w-full">
        {qbStats?.map(stat => (
          <QBStatCard key={stat.qbId} stat={stat} />
        ))}
      </div>
    </div>
  );
}

type QBStatCardProps = {
  stat: QBStat;
};

function QBStatCard({ stat }: QBStatCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-bold">{stat.qbName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 -mt-4">
        <YardageAndPointsStats stat={stat} />
        <ExecutionAndReadStats stat={stat} />
        <CompletionStats stat={stat} />
        <ExplosiveAndTurnoverStats stat={stat} />
        <PassingAndRushingStats stat={stat} />
      </CardContent>
    </Card>
  );
}

// Create separate components for each stat section with appropriate prop types
// Example:
type StatSectionProps = {
  stat: QBStat;
};

function YardageAndPointsStats({ stat }: StatSectionProps) {
  // Component implementation
}

// Repeat for other stat sections