# 📊 Analytics Dashboard

A modern, responsive analytics dashboard built with Next.js 15, React 19, and TypeScript. Features comprehensive data visualization, advanced filtering, and beautiful chart components with dark mode support.

## ✨ Features

### 📈 **Performance Analytics**

- Interactive area, line, and bar charts with Recharts
- Dynamic metric selection (Revenue, Users, Conversions)
- Time range filtering (7d, 30d, 90d)
- Color-coded chart type buttons with theme support
- Real-time data visualization with smooth animations

### 🔍 **Advanced Analytics & Filtering**

- Multi-dimensional filtering system:
  - Date range picker with preset options
  - Budget range filters ($1K - $100K+)
  - ROAS (Return on Ad Spend) filtering
  - Platform-based filtering (Google Ads, Facebook, etc.)
  - Campaign status filtering (Active, Paused, Completed)
- Pagination system (10 items per page)
- Real-time filter application with instant results

### 🥧 **Traffic Sources Analysis**

- Interactive pie chart visualization
- Comprehensive source breakdown (Organic Search, Social Media, Email, etc.)
- Detailed legend with visitor counts and percentages
- Color-coded source identification

### 📤 **Export Functionality**

- Multiple export formats: CSV, Excel, PDF
- Filtered data export capability
- Professional formatting with proper headers
- Real-time export progress indicators

### 🎨 **UI/UX Excellence**

- Modern shadcn/ui component library
- Full dark/light mode support with theme persistence
- Responsive design for all screen sizes
- Beautiful gradient backgrounds and hover effects
- Professional color scheme with accessibility focus

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/ADML003/analytics_dashboard.git
cd analytics_dashboard
```

2. **Install dependencies:**

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm (recommended)
pnpm install
```

3. **Run the development server:**

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 🛠️ Tech Stack

### **Core Framework**

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features and optimizations
- **TypeScript** - Type-safe development experience

### **Styling & UI**

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Lucide React** - Beautiful icon library
- **CSS Modules** - Scoped styling for components

### **Data Visualization**

- **Recharts** - Powerful charting library for React
- **Custom Chart Components** - Themed and interactive visualizations

### **Development Tools**

- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization

## 📁 Project Structure

```
analytics_dashboard/
├── app/                          # Next.js App Router
│   ├── dashboard/               # Dashboard pages
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/                  # React components
│   ├── ui/                     # shadcn/ui components
│   ├── providers/              # Context providers
│   ├── advanced-analytics.tsx  # Advanced filtering component
│   ├── analytics-charts.tsx    # Chart visualization component
│   ├── marketing-dashboard.tsx # Main dashboard component
│   └── ...                    # Other dashboard components
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
│   ├── marketing-data.ts       # Data management
│   ├── export-utils.ts         # Export functionality
│   └── utils.ts                # General utilities
├── types/                      # TypeScript type definitions
└── public/                     # Static assets
```

## 🎯 Key Components

### **AnalyticsCharts**

- Multi-chart visualization (Area, Line, Bar)
- Dynamic metric switching
- Color-themed buttons with dark mode support
- Interactive tooltips and legends

### **AdvancedAnalytics**

- Comprehensive filtering interface
- Real-time data filtering
- Pagination with customizable page sizes
- Export functionality integration

### **MarketingDashboard**

- Main dashboard orchestration
- Responsive layout management
- Theme provider integration
- Component composition and data flow

## 🎨 Theme System

The dashboard features a sophisticated theming system:

- **Light Mode**: Clean, professional appearance
- **Dark Mode**: Eye-friendly dark interface
- **Color Schemes**:
  - 🟢 Emerald (Area Charts)
  - 🔵 Blue (Line Charts)
  - 🟡 Amber (Bar Charts)
- **Automatic Theme Detection**: Respects system preferences
- **Manual Theme Toggle**: User-controlled theme switching

## 📊 Data Management

### **Sample Data Structure**

```typescript
interface ChartDataPoint {
  date: string;
  revenue: number;
  users: number;
  conversions: number;
  impressions: number;
  clicks: number;
}

interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
}
```

### **Marketing Campaign Data**

- Campaign performance metrics
- Budget allocation tracking
- ROAS calculations
- Platform-specific analytics

## 🚀 Deployment

### **Vercel (Recommended)**

```bash
npm i -g vercel
vercel
```

### **Other Platforms**

- **Netlify**: Deploy via Git integration
- **Railway**: Simple deployment with railway.app
- **Self-hosted**: Build and serve static files

### **Build for Production**

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Recharts** for powerful data visualization
- **Next.js team** for the excellent framework
- **Tailwind CSS** for the utility-first approach

---

**Built with ❤️ using AI-assisted development**

For questions or support, please open an issue in the GitHub repository.
analytics_dashboard/
├── app/
│ ├── dashboard/
│ │ └── page.tsx # Main dashboard page
│ ├── globals.css # Global styles with custom animations
│ ├── layout.tsx # Root layout with theme provider
│ └── page.tsx # Landing page
├── components/
│ ├── ui/ # shadcn/ui components
│ ├── analytics-charts.tsx # Interactive chart components
│ ├── campaign-table.tsx # Advanced data table
│ ├── marketing-dashboard.tsx # Main dashboard container
│ ├── metrics-overview.tsx # KPI cards component
│ ├── loading-skeletons.tsx # Loading state components
│ └── app-sidebar.tsx # Navigation sidebar
├── lib/
│ ├── marketing-data.ts # Mock data generation and types
│ └── utils.ts # Utility functions
└── package.json

````

## 🎯 Marketing-Focused Analytics

### Key Metrics Tracked

- **Revenue** - Total revenue with growth indicators
- **Users** - Total users and user growth
- **Conversions** - Conversion count and rates
- **Growth Rate** - Overall business growth percentage

### Campaign Management

- **Multi-Platform Support** - Google Ads, Facebook, Instagram, LinkedIn, TikTok, YouTube
- **Budget Tracking** - Visual budget utilization with progress bars
- **Performance Metrics** - CTR, CPC, ROAS, impressions, clicks
- **Status Management** - Active, Paused, Completed, Draft campaigns

### Data Visualization

- **Area Charts** - Revenue and user trends over time
- **Line Charts** - Multiple metric comparisons
- **Bar Charts** - Period-over-period comparisons
- **Pie Charts** - Traffic source distribution
- **Interactive Tooltips** - Detailed data on hover

## 🛠️ Getting Started

1. **Install Dependencies**

   ```bash
   pnpm install
````

2. **Run Development Server**

   ```bash
   pnpm dev
   ```

3. **Open in Browser**
   ```
   http://localhost:3000
   ```

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints optimized for:

- **Mobile** (320px+) - Stacked layout with touch-friendly interactions
- **Tablet** (768px+) - Grid layouts with sidebar navigation
- **Desktop** (1024px+) - Full dashboard with side-by-side components
- **Large Desktop** (1440px+) - Optimized spacing and typography

## 🎨 Design System

### Color Palette

- **Primary Blue** - #2563eb (dashboard highlights)
- **Success Green** - #16a34a (positive metrics)
- **Warning Orange** - #ea580c (attention items)
- **Error Red** - #dc2626 (negative metrics)
- **Purple Accent** - #9333ea (secondary highlights)

### Typography

- **Headings** - Inter font family, various weights
- **Body Text** - System font stack with fallbacks
- **Monospace** - Fira Code for data display

### Components

- **Cards** - Elevated surfaces with subtle shadows
- **Buttons** - Multiple variants (primary, secondary, outline)
- **Badges** - Status indicators with semantic colors
- **Tables** - Zebra striping with hover states

## 🔄 Real-time Features

### Live Data Updates

- Toggle real-time updates on/off
- 30-second update intervals
- Visual indicators for live status
- Toast notifications for updates

### Simulated Data

- Realistic marketing data generation
- Time-series data with trends
- Campaign performance variations
- Traffic source distributions

## 📊 Export Capabilities

### Supported Formats

- **PDF Reports** - Formatted dashboard snapshots
- **CSV Data** - Raw campaign and performance data
- **Excel Workbooks** - Multi-sheet analytics reports

## 🌙 Theme Support

### Dark Mode

- System preference detection
- Manual toggle override
- Persistent user preference
- Optimized color contrast

### Light Mode

- Clean, professional appearance
- High contrast ratios
- Accessible color combinations

## 🚀 Performance Optimizations

### Loading Strategies

- **Skeleton Loading** - Immediate visual feedback
- **Progressive Enhancement** - Core content first
- **Lazy Loading** - Chart components loaded on demand
- **Code Splitting** - Optimized bundle sizes

### Animations

- **Micro-interactions** - Subtle hover effects
- **State Transitions** - Smooth data updates
- **Page Transitions** - Seamless navigation
- **Loading States** - Engaging wait experiences

## 🎯 Award-Winning Features

### Innovation

- **Real-time Analytics** - Live data streaming simulation
- **Interactive Visualizations** - Multi-chart type support
- **Advanced Filtering** - Sophisticated data exploration
- **Mobile-First Design** - Touch-optimized interactions

### User Experience

- **Intuitive Navigation** - Clear information hierarchy
- **Consistent Design Language** - Cohesive visual system
- **Accessibility** - WCAG compliant interactions
- **Performance** - Sub-second load times

### Technical Excellence

- **Type Safety** - Full TypeScript implementation
- **Component Architecture** - Reusable, composable components
- **Modern Framework** - Latest Next.js features
- **Best Practices** - Industry-standard patterns

## 📈 Future Enhancements

### Planned Features

- **Advanced Attribution** - Multi-touch attribution analysis
- **Predictive Analytics** - ML-powered forecasting
- **Custom Dashboards** - User-configurable layouts
- **API Integration** - Real data source connections
- **Collaboration Tools** - Team sharing and commenting
- **Advanced Filtering** - Date ranges, custom segments

## 🏆 Awards & Recognition

This dashboard demonstrates best practices in:

- **UI/UX Design** - Modern, intuitive interface
- **Frontend Development** - Clean, maintainable code
- **Data Visualization** - Clear, actionable insights
- **Performance** - Fast, responsive experience
- **Accessibility** - Inclusive design principles

---

Built with ❤️ using Next.js, TypeScript, and shadcn/ui
