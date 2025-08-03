import Link from "next/link";

import { BarChart3, TrendingUp, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-black dark:bg-black">
      <div className="relative container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-3 text-slate-300 dark:text-slate-300">
              <BarChart3 className="h-10 w-10" />
              <span className="text-3xl font-bold">ADmyBRAND</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white dark:text-white text-center">
              <span className="bg-gradient-to-r from-slate-200 to-white dark:from-slate-300 dark:to-slate-100 bg-clip-text text-transparent">
                Analytics Dashboard
              </span>
            </h1>
            <p className="text-xl text-slate-300 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Elevate your digital marketing strategy with comprehensive
              analytics, real-time insights, and data-driven decision making for
              your brand&apos;s success.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Card className="border border-slate-700 dark:border-slate-700 shadow-sm hover:shadow-xl hover:shadow-emerald-500/20 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-500 bg-slate-800/90 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-emerald-900/30 dark:hover:bg-emerald-900/20 group cursor-pointer transform hover:scale-105 hover:-translate-y-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">
                  <TrendingUp className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Performance Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 dark:text-slate-300 group-hover:text-slate-200 dark:group-hover:text-slate-200 transition-colors duration-300">
                  Monitor campaign performance, ROI, and conversions with
                  detailed analytics across all your marketing channels and
                  platforms.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-slate-700 dark:border-slate-700 shadow-sm hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-500 bg-slate-800/90 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-blue-900/30 dark:hover:bg-blue-900/20 group cursor-pointer transform hover:scale-105 hover:-translate-y-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                  <BarChart3 className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Data Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 dark:text-slate-300 group-hover:text-slate-200 dark:group-hover:text-slate-200 transition-colors duration-300">
                  Transform complex data into clear, actionable insights with
                  interactive charts, graphs, and comprehensive reporting tools.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-slate-700 dark:border-slate-700 shadow-sm hover:shadow-xl hover:shadow-violet-500/20 hover:border-violet-400 dark:hover:border-violet-600 transition-all duration-500 bg-slate-800/90 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-violet-900/30 dark:hover:bg-violet-900/20 group cursor-pointer transform hover:scale-105 hover:-translate-y-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-violet-600 dark:text-violet-400 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors duration-300">
                  <Target className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Strategic Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 dark:text-slate-300 group-hover:text-slate-200 dark:group-hover:text-slate-200 transition-colors duration-300">
                  Make informed decisions with audience analytics, campaign
                  optimization recommendations, and predictive performance
                  insights.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="space-y-6 mt-20">
            <div className="mb-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-white hover:bg-slate-100 dark:bg-slate-100 dark:hover:bg-white text-slate-900 dark:text-slate-900 px-8 py-4 rounded-lg shadow-lg hover:shadow-2xl hover:shadow-white/30 dark:hover:shadow-slate-300/30 transform hover:scale-105 transition-all duration-300 font-semibold text-lg group cursor-pointer relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-slate-900/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                >
                  <BarChart3 className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  View Dashboard
                </Button>
              </Link>
            </div>
            <p className="text-sm text-slate-400 dark:text-slate-400">
              Access your comprehensive marketing analytics platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
