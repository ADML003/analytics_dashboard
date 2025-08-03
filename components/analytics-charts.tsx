"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  ChartDataPoint,
  TrafficSource,
  formatCurrency,
  formatNumber,
} from "@/lib/marketing-data";
import {
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
} from "lucide-react";
import styles from "./analytics-charts.module.css";

interface AnalyticsChartsProps {
  chartData: ChartDataPoint[];
  trafficSources: TrafficSource[];
}

const chartColors = {
  revenue: "#10b981", // Emerald green for revenue (primary metric)
  users: "#3b82f6", // Blue for users
  conversions: "#f59e0b", // Amber for conversions
  impressions: "#8b5cf6", // Purple for impressions
  clicks: "#ef4444", // Red for clicks
};

// Category-based colors for traffic sources
const trafficSourceColors = {
  "Organic Search": "#22c55e", // Green - natural/organic
  Direct: "#3b82f6", // Blue - direct access
  "Social Media": "#ec4899", // Pink - social platforms
  Email: "#f59e0b", // Orange - email campaigns
  "Paid Search": "#ef4444", // Red - paid advertising
  Referral: "#8b5cf6", // Purple - referral traffic
  Other: "#6b7280", // Gray - miscellaneous
};

export function AnalyticsCharts({
  chartData,
  trafficSources,
}: AnalyticsChartsProps) {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  // Helper function to get color class for traffic sources
  const getTrafficSourceColorClass = (source: string) => {
    const classMap: { [key: string]: string } = {
      "Organic Search": styles.organicSearch,
      Direct: styles.direct,
      "Social Media": styles.socialMedia,
      Email: styles.email,
      "Paid Search": styles.paidSearch,
      Referral: styles.referral,
    };
    return classMap[source] || styles.other;
  };

  // Helper function to get color class for chart metrics
  const getMetricColorClass = (metric: string) => {
    const classMap: { [key: string]: string } = {
      revenue: styles.revenue,
      users: styles.users,
      conversions: styles.conversions,
      impressions: styles.impressions,
      clicks: styles.clicks,
    };
    return classMap[metric] || styles.other;
  };

  // Helper function to get card shadow class for performance metrics
  const getPerformanceCardClass = () => {
    return styles.performanceCard;
  };

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{
      color: string;
      name: string;
      value: number;
      dataKey: string;
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltipContainer}>
          <div className="grid gap-3">
            <div className="font-semibold text-foreground">
              {new Date(label || "").toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            {payload.map((entry, index: number) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className={`${styles.colorDot} ${getMetricColorClass(
                    entry.dataKey
                  )}`}
                />
                <span className="text-sm font-medium text-foreground">
                  {entry.name}:{" "}
                  <span className="font-semibold">
                    {entry.dataKey === "revenue"
                      ? formatCurrency(entry.value)
                      : formatNumber(entry.value)}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      value: number;
      payload: {
        source: string;
        percentage: number;
      };
    }>;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0];

      return (
        <div className={styles.tooltipContainer}>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`${styles.colorDot} ${getTrafficSourceColorClass(
                  data.payload.source
                )}`}
              />
              <div className="font-semibold text-foreground">
                {data.payload.source}
              </div>
            </div>
            <div className={`text-sm ${styles.pieTooltipText}`}>
              {formatNumber(data.value)} visitors ({data.payload.percentage}%)
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Performance Charts */}
      <Card
        className={`border-0 shadow-sm bg-gradient-to-br from-background to-muted/20 ${getPerformanceCardClass()}`}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-6">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              Performance Analytics
            </CardTitle>
            <CardDescription className="text-base">
              Track your marketing performance over time with detailed insights
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-[150px] border-2 hover:border-primary/30 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">💰 Revenue</SelectItem>
                <SelectItem value="users">👥 Users</SelectItem>
                <SelectItem value="conversions">🎯 Conversions</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[100px] border-2 hover:border-primary/30 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 days</SelectItem>
                <SelectItem value="30d">30 days</SelectItem>
                <SelectItem value="90d">90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Tabs defaultValue="area" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-12 p-1 bg-muted/50">
              <TabsTrigger
                value="area"
                className="flex items-center gap-2 h-10 bg-emerald-100 text-emerald-800 border border-emerald-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-500/25 hover:bg-emerald-200 transition-all duration-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-800 dark:hover:bg-emerald-800/50"
              >
                <Activity className="h-4 w-4" />
                Area Chart
              </TabsTrigger>
              <TabsTrigger
                value="line"
                className="flex items-center gap-2 h-10 bg-blue-100 text-blue-800 border border-blue-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/25 hover:bg-blue-200 transition-all duration-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800 dark:hover:bg-blue-800/50"
              >
                <TrendingUp className="h-4 w-4" />
                Line Chart
              </TabsTrigger>
              <TabsTrigger
                value="bar"
                className="flex items-center gap-2 h-10 bg-amber-100 text-amber-800 border border-amber-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-amber-500/25 hover:bg-amber-200 transition-all duration-200 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-800 dark:hover:bg-amber-800/50"
              >
                <BarChart3 className="h-4 w-4" />
                Bar Chart
              </TabsTrigger>
            </TabsList>

            <TabsContent value="area" className="space-y-4">
              <div className="h-[450px] rounded-lg border bg-muted/20 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorUsers"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorConversions"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#f59e0b"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="#f59e0b"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted/30"
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                      tickFormatter={(value) =>
                        new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      }
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                      tickFormatter={(value) =>
                        selectedMetric === "revenue" ? `$${value}` : value
                      }
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey={selectedMetric}
                      stroke={
                        chartColors[selectedMetric as keyof typeof chartColors]
                      }
                      fillOpacity={1}
                      fill={`url(#color${
                        selectedMetric.charAt(0).toUpperCase() +
                        selectedMetric.slice(1)
                      })`}
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="line" className="space-y-4">
              <div className="h-[450px] rounded-lg border bg-muted/20 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted/30"
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                      tickFormatter={(value) =>
                        new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      }
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke={chartColors.revenue}
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        fill: chartColors.revenue,
                        strokeWidth: 2,
                        stroke: "#fff",
                      }}
                      activeDot={{
                        r: 6,
                        fill: chartColors.revenue,
                        strokeWidth: 2,
                        stroke: "#fff",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke={chartColors.users}
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        fill: chartColors.users,
                        strokeWidth: 2,
                        stroke: "#fff",
                      }}
                      activeDot={{
                        r: 6,
                        fill: chartColors.users,
                        strokeWidth: 2,
                        stroke: "#fff",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="conversions"
                      stroke={chartColors.conversions}
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        fill: chartColors.conversions,
                        strokeWidth: 2,
                        stroke: "#fff",
                      }}
                      activeDot={{
                        r: 6,
                        fill: chartColors.conversions,
                        strokeWidth: 2,
                        stroke: "#fff",
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="bar" className="space-y-4">
              <div className="h-[450px] rounded-lg border bg-muted/20 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted/30"
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                      tickFormatter={(value) =>
                        new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      }
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="revenue"
                      fill={chartColors.revenue}
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="users"
                      fill={chartColors.users}
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="conversions"
                      fill={chartColors.conversions}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Traffic Sources Pie Chart */}
      <Card
        className={`border-0 shadow-sm bg-gradient-to-br from-background to-muted/20 ${styles.trafficSourcesCard}`}
      >
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-lg bg-primary/10">
              <PieChartIcon className="h-6 w-6 text-primary" />
            </div>
            Traffic Sources
          </CardTitle>
          <CardDescription className="text-base">
            Comprehensive breakdown of where your visitors are coming from
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[350px] rounded-lg border bg-muted/20 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSources}
                  dataKey="visitors"
                  nameKey="source"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={40}
                  label={({ source, percentage }) =>
                    `${source}: ${percentage}%`
                  }
                  labelLine={false}
                >
                  {trafficSources.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        trafficSourceColors[
                          entry.source as keyof typeof trafficSourceColors
                        ] || "#6b7280"
                      }
                    />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Traffic Sources Legend */}
          <div className="grid grid-cols-1 gap-3 mt-6">
            {trafficSources.map((source) => (
              <div key={source.source} className={styles.legendItem}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`${
                        styles.legendColorDot
                      } ${getTrafficSourceColorClass(source.source)}`}
                    />
                    <span className="text-sm font-medium text-foreground">
                      {source.source}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {formatNumber(source.visitors)} ({source.percentage}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
