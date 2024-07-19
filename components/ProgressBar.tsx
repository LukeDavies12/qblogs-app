import React from 'react';

interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value, max, size = 58, strokeWidth = 6 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / max) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        stroke="currentColor"
        className="text-neutral-300 dark:text-neutral-700"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke="currentColor"
        className="text-neutral-800 dark:text-neutral-300"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
      />
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        fontSize="14"
        className="fill-current text-neutral-900 dark:text-white font-mono"
      >
        {`${((value / max) * 100).toFixed(0)}%`}
      </text>
    </svg>
  );
};

export default CircularProgress;
