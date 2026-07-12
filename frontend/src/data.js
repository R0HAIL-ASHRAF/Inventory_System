import { Laptop2, Printer, Server, Monitor } from "lucide-react";

// device.status breakdown
export const STATUS_BREAKDOWN = [
  { label: "In-use", pct: 68 },
  { label: "Spare", pct: 22 },
  { label: "Faulty", pct: 10 },
];

export const TREND = [40, 55, 47, 62, 58, 70, 66, 74]; // last 8 weeks, total devices

export const HEALTH_DATA = [
  { name: "In-use", value: 145, color: "#C9A227" }, // ACCENT
  { name: "Spare", value: 47, color: "#E7CB7A" }, // ACCENT_SOFT
  { name: "Faulty", value: 22, color: "#B8503A" }, // DANGER
];

// device_logs event counts per day
export const WEEKLY_ACTIVITY = [
  { day: "M", events: 12, trend: 8 },
  { day: "T", events: 18, trend: 11 },
  { day: "W", events: 14, trend: 13 },
  { day: "T", events: 27, trend: 15 },
  { day: "F", events: 16, trend: 17 },
  { day: "S", events: 9, trend: 12 },
  { day: "S", events: 7, trend: 9 },
];

export const RECENT_DEVICES = [
  { icon: Laptop2, name: "ThinkPad X1 Carbon", sub: "Asset #DV-1042", dept: "Engineering", stat: "3d ago", change: -4 },
  { icon: Printer, name: "HP LaserJet M428", sub: "Asset #DV-0887", dept: "Front Office", stat: "1w ago", change: 5 },
  { icon: Server, name: "Dell PowerEdge R450", sub: "Asset #DV-0231", dept: "IT Infra", stat: "2d ago", change: 6 },
  { icon: Monitor, name: "Dell UltraSharp U2723", sub: "Asset #DV-1190", dept: "Design", stat: "5d ago", change: 8 },
];

export const RECENT_PEOPLE = [
  { icon: Laptop2, name: "Bilal Ahmed", sub: "Software Engineer", dept: "Engineering", stat: "2 devices", change: 0 },
  { icon: Laptop2, name: "Sana Tariq", sub: "UI Designer", dept: "Design", stat: "1 device", change: 0 },
  { icon: Laptop2, name: "Usman Khalid", sub: "IT Support", dept: "IT Infra", stat: "3 devices", change: 0 },
  { icon: Laptop2, name: "Mehak Fatima", sub: "HR Executive", dept: "Front Office", stat: "1 device", change: 0 },
];

export const ACTIVITY_LOG = [
  { id: 1, type: "attach", title: "ThinkPad X1 Carbon assigned", detail: "to Bilal Ahmed · Engineering", time: "10m ago" },
  { id: 2, type: "fault", title: "HP LaserJet M428 flagged faulty", detail: "Paper jam sensor error", time: "42m ago" },
  { id: 3, type: "transfer", title: "Dell PowerEdge R450 transferred", detail: "IT Infra → Data Center", time: "1h ago" },
  { id: 4, type: "detach", title: 'MacBook Pro 14" unassigned', detail: "from Sana Tariq", time: "3h ago" },
  { id: 5, type: "status_change", title: "Status changed to spare", detail: "Dell UltraSharp U2723", time: "5h ago" },
  { id: 6, type: "attach", title: "Canon imageCLASS assigned", detail: "to Front Office · Room 2B", time: "Yesterday" },
  { id: 7, type: "fault", title: "Switch SW-014 flagged faulty", detail: "Port failure reported", time: "Yesterday" },
  { id: 8, type: "transfer", title: "Projector EPS-02 transferred", detail: "Design → Conference Room A", time: "2d ago" },
];

export const NOTIFICATIONS = [
  { id: 1, title: "6 devices flagged faulty", body: "Review and schedule repairs", time: "12m ago", unread: true, tone: "danger" },
  { id: 2, title: "12 pending transfers", body: "Awaiting department approval", time: "1h ago", unread: true, tone: "accent" },
  { id: 3, title: "New employee onboarded", body: "Mehak Fatima needs a device assignment", time: "3h ago", unread: false, tone: "success" },
  { id: 4, title: "Weekly report ready", body: "214 devices tracked this week", time: "Yesterday", unread: false, tone: "muted" },
];
 


export const DEVICES = [
  { id: "DV-1042", icon: Laptop2, type: "Laptop", manufacturer: "Lenovo", model: "ThinkPad X1 Carbon", status: "in-use", dept: "Engineering", assignedTo: "Bilal Ahmed", shared: false, updated: "3d ago" },
  { id: "DV-0887", icon: Printer, type: "Printer", manufacturer: "HP", model: "LaserJet M428", status: "faulty", dept: "Front Office", assignedTo: "Shared", shared: true, updated: "1w ago" },
  { id: "DV-0231", icon: Server, type: "Server", manufacturer: "Dell", model: "PowerEdge R450", status: "in-use", dept: "IT Infra", assignedTo: "Shared", shared: true, updated: "2d ago" },
  { id: "DV-1190", icon: Monitor, type: "Monitor", manufacturer: "Dell", model: "UltraSharp U2723", status: "spare", dept: "Design", assignedTo: "—", shared: false, updated: "5d ago" },
  { id: "DV-0654", icon: Laptop2, type: "Laptop", manufacturer: "Apple", model: 'MacBook Pro 14"', status: "dispatched", dept: "Design", assignedTo: "Sana Tariq", shared: false, updated: "6h ago" },
  { id: "DV-0399", icon: Printer, type: "Printer", manufacturer: "Canon", model: "imageCLASS MF445", status: "in-use", dept: "Front Office", assignedTo: "Shared", shared: true, updated: "Yesterday" },
  { id: "DV-0112", icon: Laptop2, type: "Laptop", manufacturer: "Lenovo", model: "ThinkPad T14", status: "retired", dept: "IT Infra", assignedTo: "—", shared: false, updated: "3w ago" },
  { id: "DV-0788", icon: Server, type: "Server", manufacturer: "HPE", model: "ProLiant DL380", status: "in-use", dept: "IT Infra", assignedTo: "Shared", shared: true, updated: "4d ago" },
];

export const DEPARTMENTS = ["Engineering", "Design", "IT Infra", "Front Office", "HR"];