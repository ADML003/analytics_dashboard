"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  BarChart3,
  TrendingUp,
  DollarSign,
  Target,
} from "lucide-react";
import {
  CampaignData,
  formatCurrency,
  formatNumber,
  formatPercentage,
} from "@/lib/marketing-data";
import { exportFilteredAnalyticsToCSV } from "@/lib/export-utils";
import { toast } from "sonner";

interface AdvancedAnalyticsProps {
  campaignData: CampaignData[];
}

interface DateRange {
  startDate: string;
  endDate: string;
}

interface Filters {
  platform: string;
  status: string;
  dateRange: DateRange;
  minBudget: string;
  maxBudget: string;
  minROAS: string;
  maxROAS: string;
}

const ITEMS_PER_PAGE = 10;

export function AdvancedAnalytics({ campaignData }: AdvancedAnalyticsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    platform: "all",
    status: "all",
    dateRange: {
      startDate: "",
      endDate: "",
    },
    minBudget: "",
    maxBudget: "",
    minROAS: "",
    maxROAS: "",
  });

  // Filter campaigns based on criteria
  const filteredCampaigns = useMemo(() => {
    return campaignData.filter((campaign) => {
      // Platform filter
      if (
        filters.platform !== "all" &&
        campaign.platform !== filters.platform
      ) {
        return false;
      }

      // Status filter
      if (filters.status !== "all" && campaign.status !== filters.status) {
        return false;
      }

      // Date range filter
      if (filters.dateRange.startDate) {
        const campaignStart = new Date(campaign.startDate);
        const filterStart = new Date(filters.dateRange.startDate);
        if (campaignStart < filterStart) return false;
      }

      if (filters.dateRange.endDate) {
        const campaignEnd = new Date(campaign.endDate);
        const filterEnd = new Date(filters.dateRange.endDate);
        if (campaignEnd > filterEnd) return false;
      }

      // Budget range filter
      if (
        filters.minBudget &&
        campaign.budget < parseFloat(filters.minBudget)
      ) {
        return false;
      }

      if (
        filters.maxBudget &&
        campaign.budget > parseFloat(filters.maxBudget)
      ) {
        return false;
      }

      // ROAS range filter
      if (filters.minROAS && campaign.roas < parseFloat(filters.minROAS)) {
        return false;
      }

      if (filters.maxROAS && campaign.roas > parseFloat(filters.maxROAS)) {
        return false;
      }

      return true;
    });
  }, [campaignData, filters]);

  // Calculate analytics from filtered data
  const analytics = useMemo(() => {
    const totalBudget = filteredCampaigns.reduce((sum, c) => sum + c.budget, 0);
    const totalSpent = filteredCampaigns.reduce((sum, c) => sum + c.spent, 0);
    const totalRevenue = filteredCampaigns.reduce(
      (sum, c) => sum + c.revenue,
      0
    );
    const totalConversions = filteredCampaigns.reduce(
      (sum, c) => sum + c.conversions,
      0
    );
    const totalClicks = filteredCampaigns.reduce((sum, c) => sum + c.clicks, 0);
    const totalImpressions = filteredCampaigns.reduce(
      (sum, c) => sum + c.impressions,
      0
    );

    const avgROAS = totalSpent > 0 ? totalRevenue / totalSpent : 0;
    const avgCTR =
      totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const avgCPC = totalClicks > 0 ? totalSpent / totalClicks : 0;
    const conversionRate =
      totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

    return {
      totalBudget,
      totalSpent,
      totalRevenue,
      totalConversions,
      totalClicks,
      totalImpressions,
      avgROAS,
      avgCTR,
      avgCPC,
      conversionRate,
      budgetUtilization: totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0,
    };
  }, [filteredCampaigns]);

  // Pagination
  const totalPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCampaigns = filteredCampaigns.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const clearFilters = () => {
    setFilters({
      platform: "all",
      status: "all",
      dateRange: { startDate: "", endDate: "" },
      minBudget: "",
      maxBudget: "",
      minROAS: "",
      maxROAS: "",
    });
    setCurrentPage(1);
  };

  const handleExport = () => {
    try {
      exportFilteredAnalyticsToCSV(filteredCampaigns, analytics);
      toast.success("Filtered analytics data exported to CSV!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export data. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(analytics.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(analytics.totalSpent)} spent
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. ROAS</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.avgROAS.toFixed(2)}x
            </div>
            <p className="text-xs text-muted-foreground">
              {analytics.budgetUtilization.toFixed(1)}% budget used
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(analytics.totalConversions)}
            </div>
            <p className="text-xs text-muted-foreground">
              {analytics.conversionRate.toFixed(2)}% rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. CTR</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.avgCTR.toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(analytics.avgCPC)} CPC
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="text-center sm:text-left">
              <CardTitle className="flex items-center justify-center sm:justify-start gap-2">
                <Filter className="h-5 w-5" />
                Advanced Filters
              </CardTitle>
              <CardDescription>
                Filter campaigns by platform, dates, budget, and performance
                metrics
              </CardDescription>
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="w-full sm:w-auto"
              >
                Clear Filters
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                className="w-full sm:w-auto"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Platform Filter */}
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select
                value={filters.platform}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, platform: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Platforms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="Google Ads">Google Ads</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="TikTok">TikTok</SelectItem>
                  <SelectItem value="YouTube">YouTube</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={filters.status}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={filters.dateRange.startDate}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, startDate: e.target.value },
                  }))
                }
              />
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={filters.dateRange.endDate}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, endDate: e.target.value },
                  }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Budget Range */}
            <div className="space-y-2">
              <Label htmlFor="minBudget">Min Budget</Label>
              <Input
                id="minBudget"
                type="number"
                placeholder="0"
                value={filters.minBudget}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, minBudget: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxBudget">Max Budget</Label>
              <Input
                id="maxBudget"
                type="number"
                placeholder="100000"
                value={filters.maxBudget}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, maxBudget: e.target.value }))
                }
              />
            </div>

            {/* ROAS Range */}
            <div className="space-y-2">
              <Label htmlFor="minROAS">Min ROAS</Label>
              <Input
                id="minROAS"
                type="number"
                step="0.1"
                placeholder="0"
                value={filters.minROAS}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, minROAS: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxROAS">Max ROAS</Label>
              <Input
                id="maxROAS"
                type="number"
                step="0.1"
                placeholder="10"
                value={filters.maxROAS}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, maxROAS: e.target.value }))
                }
              />
            </div>
          </div>

          {/* Active Filters Display */}
          {(filters.platform !== "all" ||
            filters.status !== "all" ||
            filters.dateRange.startDate ||
            filters.dateRange.endDate ||
            filters.minBudget ||
            filters.maxBudget ||
            filters.minROAS ||
            filters.maxROAS) && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium">Active Filters:</span>
              {filters.platform !== "all" && (
                <Badge variant="secondary">{filters.platform}</Badge>
              )}
              {filters.status !== "all" && (
                <Badge variant="secondary">{filters.status}</Badge>
              )}
              {filters.dateRange.startDate && (
                <Badge variant="secondary">
                  From: {filters.dateRange.startDate}
                </Badge>
              )}
              {filters.dateRange.endDate && (
                <Badge variant="secondary">
                  To: {filters.dateRange.endDate}
                </Badge>
              )}
              {filters.minBudget && (
                <Badge variant="secondary">Budget ≥ ${filters.minBudget}</Badge>
              )}
              {filters.maxBudget && (
                <Badge variant="secondary">Budget ≤ ${filters.maxBudget}</Badge>
              )}
              {filters.minROAS && (
                <Badge variant="secondary">ROAS ≥ {filters.minROAS}</Badge>
              )}
              {filters.maxROAS && (
                <Badge variant="secondary">ROAS ≤ {filters.maxROAS}</Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Table with Pagination */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Filtered Results</CardTitle>
              <CardDescription>
                Showing {startIndex + 1}-
                {Math.min(
                  startIndex + ITEMS_PER_PAGE,
                  filteredCampaigns.length
                )}{" "}
                of {filteredCampaigns.length} campaigns
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Spent</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>ROAS</TableHead>
                  <TableHead>Conversions</TableHead>
                  <TableHead>CTR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">
                      {campaign.campaign}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{campaign.platform}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          campaign.status === "Active"
                            ? "default"
                            : campaign.status === "Completed"
                            ? "secondary"
                            : campaign.status === "Paused"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(campaign.budget)}</TableCell>
                    <TableCell>{formatCurrency(campaign.spent)}</TableCell>
                    <TableCell>{formatCurrency(campaign.revenue)}</TableCell>
                    <TableCell>{campaign.roas.toFixed(2)}x</TableCell>
                    <TableCell>{formatNumber(campaign.conversions)}</TableCell>
                    <TableCell>{formatPercentage(campaign.ctr)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
