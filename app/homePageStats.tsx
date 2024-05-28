import CircularProgress from "@/components/ProgressBar";

interface StatDisplayProps {
  value: number;
  max: number;
  text: string;
  subtext: string;
}

export const StatDisplay = ({ value, max, text, subtext }: StatDisplayProps) => (
  <div className="flex gap-2 items-center md:w-1/2">
    <CircularProgress value={value} max={max} />
    <div>
      <p>{text}</p>
      <p className="text-muted-foreground">{subtext}</p>
    </div>
  </div>
);

interface TextStatProps {
  value: number; // or string, depending on what `value` is expected to be
  subtext: string;
}

export const TextStat = ({ value, subtext }: TextStatProps) => (
  <div className="flex gap-2 items-center md:w-1/3">
    <p className="text-4xl font-bold">{value}</p>
    <p className="text-muted-foreground">{subtext}</p>
  </div>
);