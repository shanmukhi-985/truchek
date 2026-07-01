import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle } from "../ui/Card";
import {
  WEEKLY_ACTIVITY,
  MONTHLY_SCANS,
  THREAT_DISTRIBUTION,
  COMMUNITY_GROWTH,
} from "../../data/dashboardData";
import { cn } from "../../utils/cn";

const tooltipStyle = {
  backgroundColor: "#0f172a",
  border: "1px solid rgba(148,163,184,0.15)",
  borderRadius: "12px",
  fontSize: "12px",
  color: "#e2e8f0",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatK = (v: any) => {
  if (v == null) return "";
  return typeof v === "number" && v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v);
};

export function WeeklyActivityChart() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle description="Scan volume vs detected threats per day">
          Weekly Activity
        </CardTitle>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 dark:text-slate-400 text-slate-500">
            <span className="h-2 w-2 rounded-full bg-violet-500" />
            Scans
          </span>
          <span className="flex items-center gap-1.5 dark:text-slate-400 text-slate-500">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            Threats
          </span>
        </div>
      </CardHeader>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={WEEKLY_ACTIVITY} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="threatGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={formatK} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "rgba(139,92,246,0.2)", strokeWidth: 1 }} />
          <Area type="monotone" dataKey="scans" stroke="#8b5cf6" strokeWidth={2} fill="url(#scanGrad)" dot={false} />
          <Area type="monotone" dataKey="threats" stroke="#f43f5e" strokeWidth={2} fill="url(#threatGrad)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function ThreatDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle description="Breakdown by threat category">
          Threat Distribution
        </CardTitle>
      </CardHeader>
      <div className="flex flex-col items-center gap-4">
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie
              data={THREAT_DISTRIBUTION}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={3}
              dataKey="value"
            >
              {THREAT_DISTRIBUTION.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="w-full grid grid-cols-2 gap-1.5">
          {THREAT_DISTRIBUTION.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-xs">
              <span
                className="h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="dark:text-slate-400 text-slate-600 truncate">{item.name}</span>
              <span className="ml-auto font-semibold dark:text-slate-300 text-slate-700">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function MonthlyScanChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle description="Total scans per month">
          Monthly Scans
        </CardTitle>
      </CardHeader>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={MONTHLY_SCANS} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={formatK} />
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ fill: "rgba(139,92,246,0.08)" }}
          />
          <Bar dataKey="scans" fill="#8b5cf6" radius={[6, 6, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function CommunityGrowthChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle description="Registered community members">
          Community Growth
        </CardTitle>
      </CardHeader>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={COMMUNITY_GROWTH} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="commGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={formatK} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "rgba(139,92,246,0.2)", strokeWidth: 1 }} />
          <Line
            type="monotone"
            dataKey="members"
            stroke="url(#commGrad)"
            strokeWidth={2.5}
            dot={{ fill: "#8b5cf6", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#8b5cf6" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function ChartsGrid() {
  return (
    <div className={cn("grid grid-cols-1 gap-4 lg:grid-cols-3")}>
      <WeeklyActivityChart />
      <ThreatDistributionChart />
      <MonthlyScanChart />
      <CommunityGrowthChart />
    </div>
  );
}
