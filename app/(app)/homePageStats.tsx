import CircularProgress from "@/components/ui/ProgressBar";

interface StatDisplayProps {
  value: number;
  max: number;
  text: string;
  subtext: string;
}

export const StatDisplay = ({ value, max, text, subtext }: StatDisplayProps) => (
  <div className="flex gap-3 items-center">
    <CircularProgress value={value} max={max} />
    <div>
      <p className="font-mono">{text}</p>
      <p className="text-muted-foreground">{subtext}</p>
    </div>
  </div>
);

interface TextStatProps {
  value: number; // or string, depending on what `value` is expected to be
  subtext: string;
}

export const TextStat = ({ value, subtext }: TextStatProps) => (
  <div className="flex gap-2 items-center">
    <p className="text-3xl font-bold font-mono">{value}</p>
    <p className="text-muted-foreground">{subtext}</p>
  </div>
);