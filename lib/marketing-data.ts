// Marketing Analytics Data Types and Mock Data

export interface MetricCard {
  id: string;
  title: string;
  value: number | string;
  change: number;
  changeType: "increase" | "decrease";
  icon: string;
  color: "blue" | "green" | "purple" | "orange" | "red";
  format: "currency" | "number" | "percentage";
}

export interface ChartDataPoint {
  date: string;
  revenue: number;
  users: number;
  conversions: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  roas: number;
}

export interface CampaignData {
  id: string;
  campaign: string;
  platform:
    | "Google Ads"
    | "Facebook"
    | "Instagram"
    | "LinkedIn"
    | "TikTok"
    | "YouTube";
  status: "Active" | "Paused" | "Completed" | "Draft";
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  ctr: number;
  cpc: number;
  roas: number;
  startDate: string;
  endDate: string;
}

export interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
  color: string;
}

// Mock Data Generation
export const generateMetrics = (): MetricCard[] => [
  {
    id: "revenue",
    title: "Total Revenue",
    value: 284750,
    change: 12.5,
    changeType: "increase",
    icon: "DollarSign",
    color: "green",
    format: "currency",
  },
  {
    id: "users",
    title: "Total Users",
    value: 48920,
    change: 8.2,
    changeType: "increase",
    icon: "Users",
    color: "blue",
    format: "number",
  },
  {
    id: "conversions",
    title: "Conversions",
    value: 2847,
    change: 15.8,
    changeType: "increase",
    icon: "Target",
    color: "purple",
    format: "number",
  },
  {
    id: "growth",
    title: "Growth Rate",
    value: "23.4%",
    change: 5.2,
    changeType: "increase",
    icon: "TrendingUp",
    color: "orange",
    format: "percentage",
  },
];

export const generateChartData = (): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const baseRevenue = 8000 + Math.random() * 4000;
    const baseUsers = 1200 + Math.random() * 800;
    const weekendMultiplier =
      date.getDay() === 0 || date.getDay() === 6 ? 0.7 : 1;

    data.push({
      date: date.toISOString().split("T")[0],
      revenue: Math.round(baseRevenue * weekendMultiplier),
      users: Math.round(baseUsers * weekendMultiplier),
      conversions: Math.round(
        baseUsers * weekendMultiplier * (0.05 + Math.random() * 0.03)
      ),
      impressions: Math.round(baseUsers * weekendMultiplier * 15),
      clicks: Math.round(baseUsers * weekendMultiplier * 2.5),
      ctr: Number(((2.5 / 15) * 100 + Math.random() * 2).toFixed(2)),
      cpc: Number((1.2 + Math.random() * 0.8).toFixed(2)),
      roas: Number((3.2 + Math.random() * 1.8).toFixed(1)),
    });
  }

  return data;
};

export const generateCampaignData = (): CampaignData[] => [
  {
    id: "1",
    campaign: "Summer Sale 2024",
    platform: "Google Ads",
    status: "Active",
    budget: 15000,
    spent: 12450,
    impressions: 125000,
    clicks: 3750,
    conversions: 187,
    revenue: 28050,
    ctr: 3.0,
    cpc: 3.32,
    roas: 2.25,
    startDate: "2024-07-01",
    endDate: "2024-08-31",
  },
  {
    id: "2",
    campaign: "Brand Awareness Q3",
    platform: "Facebook",
    status: "Active",
    budget: 8000,
    spent: 6750,
    impressions: 89000,
    clicks: 2670,
    conversions: 134,
    revenue: 16080,
    ctr: 3.0,
    cpc: 2.53,
    roas: 2.38,
    startDate: "2024-07-01",
    endDate: "2024-09-30",
  },
  {
    id: "3",
    campaign: "LinkedIn B2B Lead Gen",
    platform: "LinkedIn",
    status: "Active",
    budget: 5000,
    spent: 4200,
    impressions: 25000,
    clicks: 750,
    conversions: 45,
    revenue: 13500,
    ctr: 3.0,
    cpc: 5.6,
    roas: 3.21,
    startDate: "2024-06-15",
    endDate: "2024-08-15",
  },
  {
    id: "4",
    campaign: "Instagram Stories Promo",
    platform: "Instagram",
    status: "Completed",
    budget: 3000,
    spent: 3000,
    impressions: 67000,
    clicks: 2010,
    conversions: 98,
    revenue: 11760,
    ctr: 3.0,
    cpc: 1.49,
    roas: 3.92,
    startDate: "2024-06-01",
    endDate: "2024-06-30",
  },
  {
    id: "5",
    campaign: "YouTube Video Ads",
    platform: "YouTube",
    status: "Active",
    budget: 10000,
    spent: 7500,
    impressions: 150000,
    clicks: 4500,
    conversions: 225,
    revenue: 31500,
    ctr: 3.0,
    cpc: 1.67,
    roas: 4.2,
    startDate: "2024-07-15",
    endDate: "2024-08-31",
  },
  {
    id: "6",
    campaign: "TikTok Gen Z Campaign",
    platform: "TikTok",
    status: "Paused",
    budget: 4000,
    spent: 2800,
    impressions: 95000,
    clicks: 3800,
    conversions: 152,
    revenue: 9120,
    ctr: 4.0,
    cpc: 0.74,
    roas: 3.26,
    startDate: "2024-06-20",
    endDate: "2024-07-20",
  },
];

export const generateTrafficSources = (): TrafficSource[] => [
  {
    source: "Organic Search",
    visitors: 18420,
    percentage: 42.1,
    color: "hsl(var(--chart-1))",
  },
  {
    source: "Paid Search",
    visitors: 12680,
    percentage: 29.0,
    color: "hsl(var(--chart-2))",
  },
  {
    source: "Social Media",
    visitors: 7350,
    percentage: 16.8,
    color: "hsl(var(--chart-3))",
  },
  {
    source: "Direct",
    visitors: 3920,
    percentage: 9.0,
    color: "hsl(var(--chart-4))",
  },
  {
    source: "Email",
    visitors: 1380,
    percentage: 3.1,
    color: "hsl(var(--chart-5))",
  },
];

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("en-US").format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const getChangeIcon = (changeType: "increase" | "decrease") => {
  return changeType === "increase" ? "TrendingUp" : "TrendingDown";
};

export const getChangeColor = (changeType: "increase" | "decrease") => {
  return changeType === "increase"
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";
};

// Real-time simulation
export const simulateRealTimeUpdates = (
  data: ChartDataPoint[]
): ChartDataPoint[] => {
  return data.map((point) => ({
    ...point,
    revenue: point.revenue + Math.round((Math.random() - 0.5) * 200),
    users: point.users + Math.round((Math.random() - 0.5) * 50),
    conversions: point.conversions + Math.round((Math.random() - 0.5) * 5),
  }));
};
