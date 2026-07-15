import { LayoutGrid, Laptop, Users, Building2, ClipboardList, Bell } from "lucide-react";


export const NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutGrid, roles: ["admin", "it_manager"] },
  { label: "Devices", path: "/devices", icon: Laptop, roles: ["admin", "it_manager"] },
  { label: "Employees", path: "/employees", icon: Users, roles: ["admin"] },
  { label: "Departments", path: "/departments", icon: Building2, roles: ["admin"] },
  { label: "Activity Logs", path: "/activity-logs", icon: ClipboardList, roles: ["admin", "it_manager"] },
  { label: "Notifications", path: "/notifications", icon: Bell, roles: ["admin", "it_manager"] },
];

