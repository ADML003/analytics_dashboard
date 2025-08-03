import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";
import {
  CampaignData,
  ChartDataPoint,
  MetricCard,
  TrafficSource,
} from "./marketing-data";

// Extend jsPDF type to include autoTable properties
declare module "jspdf" {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
    };
  }
}

export interface ExportData {
  metrics: MetricCard[];
  chartData: ChartDataPoint[];
  campaignData: CampaignData[];
  trafficSources: TrafficSource[];
}

export type ExportFormat = "pdf" | "csv";

// Export campaign data to CSV
export const exportCampaignDataToCSV = (campaignData: CampaignData[]): void => {
  const csvData = campaignData.map((campaign) => ({
    Campaign: campaign.campaign,
    Platform: campaign.platform,
    Status: campaign.status,
    Budget: campaign.budget,
    Spent: campaign.spent,
    Impressions: campaign.impressions,
    Clicks: campaign.clicks,
    Conversions: campaign.conversions,
    Revenue: campaign.revenue,
    CTR: `${campaign.ctr}%`,
    CPC: `$${campaign.cpc}`,
    ROAS: `${campaign.roas}x`,
    "Start Date": campaign.startDate,
    "End Date": campaign.endDate,
  }));

  const csv = Papa.unparse(csvData);
  downloadFile(csv, "campaign-data.csv", "text/csv");
};

// Export chart data to CSV
export const exportChartDataToCSV = (chartData: ChartDataPoint[]): void => {
  const csvData = chartData.map((point) => ({
    Date: point.date,
    Revenue: point.revenue,
    Users: point.users,
    Conversions: point.conversions,
    Impressions: point.impressions,
    Clicks: point.clicks,
    CTR: `${point.ctr}%`,
    CPC: `$${point.cpc}`,
    ROAS: `${point.roas}x`,
  }));

  const csv = Papa.unparse(csvData);
  downloadFile(csv, "analytics-data.csv", "text/csv");
};

// Export all dashboard data to CSV
export const exportAllDataToCSV = (data: ExportData): void => {
  // Create multiple sheets in a zip-like format (multiple CSV files)
  const timestamp = new Date().toISOString().split("T")[0];

  // Export metrics
  const metricsCSV = Papa.unparse(
    data.metrics.map((metric) => ({
      ID: metric.id,
      Title: metric.title,
      Value: metric.value,
      Change: `${metric.change}%`,
      "Change Type": metric.changeType,
      Color: metric.color,
      Format: metric.format,
    }))
  );
  downloadFile(metricsCSV, `metrics-${timestamp}.csv`, "text/csv");

  // Export campaigns
  setTimeout(() => exportCampaignDataToCSV(data.campaignData), 100);

  // Export chart data
  setTimeout(() => exportChartDataToCSV(data.chartData), 200);

  // Export traffic sources
  const trafficCSV = Papa.unparse(
    data.trafficSources.map((source) => ({
      Source: source.source,
      Visitors: source.visitors,
      Percentage: `${source.percentage}%`,
    }))
  );
  setTimeout(
    () =>
      downloadFile(trafficCSV, `traffic-sources-${timestamp}.csv`, "text/csv"),
    300
  );
};

// Export dashboard data to PDF
export const exportDashboardToPDF = (data: ExportData): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Title
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text("Marketing Analytics Dashboard Report", pageWidth / 2, 20, {
    align: "center",
  });

  // Date
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  const reportDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`Generated on: ${reportDate}`, pageWidth / 2, 30, {
    align: "center",
  });

  let yPosition = 50;

  // Metrics Overview
  doc.setFontSize(16);
  doc.setTextColor(40, 40, 40);
  doc.text("Key Metrics Overview", 20, yPosition);
  yPosition += 10;

  const metricsTableData = data.metrics.map((metric) => [
    metric.title,
    typeof metric.value === "string"
      ? metric.value
      : metric.value.toLocaleString(),
    `${metric.change > 0 ? "+" : ""}${metric.change}%`,
    metric.changeType === "increase" ? "↗" : "↘",
  ]);

  autoTable(doc, {
    head: [["Metric", "Value", "Change", "Trend"]],
    body: metricsTableData,
    startY: yPosition,
    theme: "grid",
    headStyles: { fillColor: [41, 128, 185] },
    styles: { fontSize: 10 },
  });

  yPosition = doc.lastAutoTable.finalY + 20;

  // Campaign Performance
  if (yPosition > pageHeight - 60) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFontSize(16);
  doc.text("Campaign Performance", 20, yPosition);
  yPosition += 10;

  const campaignTableData = data.campaignData.map((campaign) => [
    campaign.campaign,
    campaign.platform,
    campaign.status,
    `$${campaign.budget.toLocaleString()}`,
    `$${campaign.spent.toLocaleString()}`,
    campaign.conversions.toString(),
    `$${campaign.revenue.toLocaleString()}`,
    `${campaign.roas}x`,
  ]);

  autoTable(doc, {
    head: [
      [
        "Campaign",
        "Platform",
        "Status",
        "Budget",
        "Spent",
        "Conversions",
        "Revenue",
        "ROAS",
      ],
    ],
    body: campaignTableData,
    startY: yPosition,
    theme: "grid",
    headStyles: { fillColor: [46, 204, 113] },
    styles: { fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 20 },
      2: { cellWidth: 15 },
      3: { cellWidth: 20 },
      4: { cellWidth: 20 },
      5: { cellWidth: 15 },
      6: { cellWidth: 20 },
      7: { cellWidth: 15 },
    },
  });

  yPosition = doc.lastAutoTable.finalY + 20;

  // Traffic Sources
  if (yPosition > pageHeight - 40) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFontSize(16);
  doc.text("Traffic Sources", 20, yPosition);
  yPosition += 10;

  const trafficTableData = data.trafficSources.map((source) => [
    source.source,
    source.visitors.toLocaleString(),
    `${source.percentage}%`,
  ]);

  autoTable(doc, {
    head: [["Source", "Visitors", "Percentage"]],
    body: trafficTableData,
    startY: yPosition,
    theme: "grid",
    headStyles: { fillColor: [155, 89, 182] },
    styles: { fontSize: 10 },
  });

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, {
      align: "center",
    });
  }

  // Save the PDF
  const timestamp = new Date().toISOString().split("T")[0];
  doc.save(`marketing-dashboard-report-${timestamp}.pdf`);
};

// Utility function to download files
const downloadFile = (
  content: string,
  filename: string,
  contentType: string
): void => {
  const blob = new Blob([content], { type: contentType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Export specific data types
export const exportMetricsToCSV = (metrics: MetricCard[]): void => {
  const csvData = metrics.map((metric) => ({
    ID: metric.id,
    Title: metric.title,
    Value: metric.value,
    Change: `${metric.change}%`,
    "Change Type": metric.changeType,
    Color: metric.color,
    Format: metric.format,
  }));

  const csv = Papa.unparse(csvData);
  const timestamp = new Date().toISOString().split("T")[0];
  downloadFile(csv, `metrics-${timestamp}.csv`, "text/csv");
};

export const exportTrafficSourcesToCSV = (
  trafficSources: TrafficSource[]
): void => {
  const csvData = trafficSources.map((source) => ({
    Source: source.source,
    Visitors: source.visitors,
    Percentage: `${source.percentage}%`,
  }));

  const csv = Papa.unparse(csvData);
  const timestamp = new Date().toISOString().split("T")[0];
  downloadFile(csv, `traffic-sources-${timestamp}.csv`, "text/csv");
};

// Export filtered analytics data
export const exportFilteredAnalyticsToCSV = (
  filteredCampaigns: CampaignData[],
  analytics: {
    totalBudget: number;
    totalSpent: number;
    totalRevenue: number;
    totalConversions: number;
    avgROAS: number;
    avgCTR: number;
    avgCPC: number;
    conversionRate: number;
    budgetUtilization: number;
  }
): void => {
  // Export summary analytics
  const summaryData = [
    {
      "Total Budget": analytics.totalBudget,
      "Total Spent": analytics.totalSpent,
      "Total Revenue": analytics.totalRevenue,
      "Total Conversions": analytics.totalConversions,
      "Average ROAS": analytics.avgROAS.toFixed(2),
      "Average CTR (%)": analytics.avgCTR.toFixed(2),
      "Average CPC": analytics.avgCPC.toFixed(2),
      "Conversion Rate (%)": analytics.conversionRate.toFixed(2),
      "Budget Utilization (%)": analytics.budgetUtilization.toFixed(2),
    },
  ];

  const summaryCSV = Papa.unparse(summaryData);
  const timestamp = new Date().toISOString().split("T")[0];
  downloadFile(summaryCSV, `analytics-summary-${timestamp}.csv`, "text/csv");

  // Export filtered campaign data
  setTimeout(() => exportCampaignDataToCSV(filteredCampaigns), 100);
};
