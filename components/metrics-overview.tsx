import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Users,
  Target,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  MetricCard,
  formatCurrency,
  formatNumber,
  getChangeColor,
} from "@/lib/marketing-data";
import { cn } from "@/lib/utils";

interface MetricsOverviewProps {
  metrics: MetricCard[];
  className?: string;
}

const iconMap = {
  DollarSign,
  Users,
  Target,
  TrendingUp,
};

const colorMap = {
  blue: "from-blue-500/10 to-blue-600/10 border-blue-200 dark:border-blue-800",
  green:
    "from-green-500/10 to-green-600/10 border-green-200 dark:border-green-800",
  purple:
    "from-purple-500/10 to-purple-600/10 border-purple-200 dark:border-purple-800",
  orange:
    "from-orange-500/10 to-orange-600/10 border-orange-200 dark:border-orange-800",
  red: "from-red-500/10 to-red-600/10 border-red-200 dark:border-red-800",
};

const iconColorMap = {
  blue: "text-blue-600 dark:text-blue-400",
  green: "text-green-600 dark:text-green-400",
  purple: "text-purple-600 dark:text-purple-400",
  orange: "text-orange-600 dark:text-orange-400",
  red: "text-red-600 dark:text-red-400",
};

export function MetricsOverview({ metrics, className }: MetricsOverviewProps) {
  const formatValue = (
    value: number | string,
    format: MetricCard["format"]
  ) => {
    if (typeof value === "string") return value;

    switch (format) {
      case "currency":
        return formatCurrency(value);
      case "number":
        return formatNumber(value);
      case "percentage":
        return `${value}%`;
      default:
        return value.toString();
    }
  };

  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-4", className)}>
      {metrics.map((metric) => {
        const Icon = iconMap[metric.icon as keyof typeof iconMap];
        const ChangeIcon =
          metric.changeType === "increase" ? ArrowUpRight : ArrowDownRight;

        return (
          <Card
            key={metric.id}
            className={cn(
              "relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br",
              colorMap[metric.color]
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div
                className={cn(
                  "p-2 rounded-lg bg-background/50",
                  iconColorMap[metric.color]
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {formatValue(metric.value, metric.format)}
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <ChangeIcon
                      className={cn(
                        "h-3 w-3",
                        getChangeColor(metric.changeType)
                      )}
                    />
                    <span
                      className={cn(
                        "text-xs font-medium",
                        getChangeColor(metric.changeType)
                      )}
                    >
                      {metric.change}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      vs last month
                    </span>
                  </div>
                </div>
              </div>

              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-10">
                <Icon className="h-16 w-16" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
