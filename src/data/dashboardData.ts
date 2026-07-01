export const STAT_CARDS = [
  {
    id: "total-scans",
    label: "Total Scans",
    value: "12,847",
    change: "+18.2%",
    trend: "up" as const,
    description: "vs last month",
    color: "violet",
  },
  {
    id: "threats-blocked",
    label: "Threats Blocked",
    value: "3,291",
    change: "+6.4%",
    trend: "up" as const,
    description: "vs last month",
    color: "rose",
  },
  {
    id: "community-reports",
    label: "Community Reports",
    value: "8,104",
    change: "+24.1%",
    trend: "up" as const,
    description: "vs last month",
    color: "amber",
  },
  {
    id: "trust-score",
    label: "Trust Score",
    value: "94",
    change: "+2",
    trend: "up" as const,
    description: "points this week",
    color: "emerald",
  },
];

export const WEEKLY_ACTIVITY = [
  { day: "Mon", scans: 1420, threats: 312 },
  { day: "Tue", scans: 1890, threats: 401 },
  { day: "Wed", scans: 2100, threats: 298 },
  { day: "Thu", scans: 1654, threats: 380 },
  { day: "Fri", scans: 2340, threats: 512 },
  { day: "Sat", scans: 1190, threats: 201 },
  { day: "Sun", scans: 980, threats: 187 },
];

export const MONTHLY_SCANS = [
  { month: "Jul", scans: 8200 },
  { month: "Aug", scans: 9400 },
  { month: "Sep", scans: 10200 },
  { month: "Oct", scans: 9800 },
  { month: "Nov", scans: 11400 },
  { month: "Dec", scans: 12847 },
];

export const THREAT_DISTRIBUTION = [
  { name: "Phishing", value: 38, color: "#f43f5e" },
  { name: "Malware", value: 22, color: "#8b5cf6" },
  { name: "Scam Texts", value: 19, color: "#f59e0b" },
  { name: "Fake Sites", value: 14, color: "#3b82f6" },
  { name: "Other", value: 7, color: "#6b7280" },
];

export const COMMUNITY_GROWTH = [
  { month: "Jul", members: 3200 },
  { month: "Aug", members: 4100 },
  { month: "Sep", members: 5800 },
  { month: "Oct", members: 7200 },
  { month: "Nov", members: 9400 },
  { month: "Dec", members: 11800 },
];

export const RECENT_SCANS = [
  {
    id: "s1",
    target: "paypal.com",
    type: "URL",
    score: 98,
    status: "safe" as const,
    time: "2 min ago",
  },
  {
    id: "s2",
    target: "secure-update-required.net",
    type: "URL",
    score: 12,
    status: "threat" as const,
    time: "18 min ago",
  },
  {
    id: "s3",
    target: "Your account has been suspended...",
    type: "Text",
    score: 8,
    status: "threat" as const,
    time: "45 min ago",
  },
  {
    id: "s4",
    target: "amazon.com/orders",
    type: "URL",
    score: 96,
    status: "safe" as const,
    time: "1 hr ago",
  },
  {
    id: "s5",
    target: "QR Code #2847",
    type: "QR",
    score: 74,
    status: "warning" as const,
    time: "2 hr ago",
  },
  {
    id: "s6",
    target: "Congratulations! You've won a prize...",
    type: "Text",
    score: 5,
    status: "threat" as const,
    time: "3 hr ago",
  },
];

export const RECENT_ACTIVITY = [
  {
    id: "a1",
    action: "Threat Blocked",
    detail: "Phishing URL detected and blocked",
    time: "2 min ago",
    type: "threat",
  },
  {
    id: "a2",
    action: "Scan Complete",
    detail: "URL scan for paypal.com — Safe",
    time: "18 min ago",
    type: "success",
  },
  {
    id: "a3",
    action: "Community Report",
    detail: "You reported a new scam pattern",
    time: "1 hr ago",
    type: "info",
  },
  {
    id: "a4",
    action: "Trust Score Updated",
    detail: "Score increased by 2 points",
    time: "3 hr ago",
    type: "success",
  },
  {
    id: "a5",
    action: "Bookmark Added",
    detail: "Added scan result to bookmarks",
    time: "5 hr ago",
    type: "info",
  },
];

export const THREAT_ALERTS = [
  {
    id: "t1",
    title: "Active Phishing Campaign",
    description:
      "Mass phishing texts impersonating USPS package delivery notifications",
    severity: "critical" as const,
    reports: 2841,
    time: "Active now",
  },
  {
    id: "t2",
    title: "Fake IRS Website",
    description: "Fraudulent IRS tax refund portal collecting SSN and banking info",
    severity: "high" as const,
    reports: 1204,
    time: "3 hr ago",
  },
  {
    id: "t3",
    title: "Crypto Giveaway Scam",
    description: "Twitter/X accounts impersonating Elon Musk offering Bitcoin giveaway",
    severity: "medium" as const,
    reports: 847,
    time: "6 hr ago",
  },
  {
    id: "t4",
    title: "Tech Support Fraud",
    description: "Pop-up scams claiming PC is infected, demanding $299 for 'repairs'",
    severity: "medium" as const,
    reports: 412,
    time: "1 day ago",
  },
];

export const SECURITY_TIPS = [
  {
    id: "tip1",
    title: "Check URLs Before Clicking",
    description:
      "Always verify the domain name carefully. Scammers use look-alike domains like 'paypa1.com'.",
    icon: "Link",
    category: "URLs",
  },
  {
    id: "tip2",
    title: "Never Share OTPs",
    description:
      "Legitimate companies will never ask for one-time passwords over call or text.",
    icon: "KeyRound",
    category: "Passwords",
  },
  {
    id: "tip3",
    title: "Verify Sender Identity",
    description:
      "Check the actual email address, not just the display name shown in your inbox.",
    icon: "Mail",
    category: "Email",
  },
];

export const POPULAR_SCAM_TYPES = [
  { name: "Phishing Emails", count: "38%", icon: "Mail", trend: "up" as const },
  { name: "Fake Online Stores", count: "22%", icon: "ShoppingCart", trend: "up" as const },
  { name: "Romance Scams", count: "15%", icon: "Heart", trend: "stable" as const },
  { name: "Tech Support", count: "13%", icon: "Monitor", trend: "down" as const },
  { name: "Investment Fraud", count: "12%", icon: "TrendingUp", trend: "up" as const },
];

export const COMMUNITY_UPDATES = [
  {
    id: "cu1",
    user: "Sarah K.",
    avatar: null,
    action: "reported a new scam",
    target: "fake-amazon-gift.com",
    time: "5 min ago",
    upvotes: 24,
  },
  {
    id: "cu2",
    user: "Marcus T.",
    avatar: null,
    action: "verified safe",
    target: "github.com/truchek",
    time: "12 min ago",
    upvotes: 18,
  },
  {
    id: "cu3",
    user: "Priya N.",
    avatar: null,
    action: "reported phishing text",
    target: "USPS delivery scam template",
    time: "28 min ago",
    upvotes: 41,
  },
  {
    id: "cu4",
    user: "James L.",
    avatar: null,
    action: "flagged malware",
    target: "free-vpn-download.ru",
    time: "1 hr ago",
    upvotes: 67,
  },
];
