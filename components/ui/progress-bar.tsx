import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
}

export function ProgressBar({ value, max, className }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div
      className={cn(
        "w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700",
        className
      )}
    >
      <div
        className={cn(
          "h-1.5 rounded-full transition-all",
          percentage > 90
            ? "bg-red-500"
            : percentage > 70
            ? "bg-yellow-500"
            : "bg-green-500"
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
