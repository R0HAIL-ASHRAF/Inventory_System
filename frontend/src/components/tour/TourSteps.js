export const devicesTourSteps = [
  { target: '[data-tour="devices-count"]', title: "Your asset count, at a glance", body: "This shows the total number of devices currently tracked in the system." },
  { target: '[data-tour="devices-search"]', title: "Search across everything", body: "Search by manufacturer, model, asset ID, department, or category — all at once." },
  { target: '[data-tour="devices-filters"]', title: "Narrow it down", body: "Filter by category, department, or status to zero in on what you care about." },
  { target: '[data-tour="devices-new"]', title: "Add a device", body: "Register a new asset here — it appears in the table immediately." },
  { target: '[data-tour="devices-health"]', title: "Health at a glance", body: "This ring shows each device's condition score, so you can spot at-risk hardware without opening it." },
  { target: '[data-tour="devices-row-menu"]', title: "Quick actions", body: "Hover any row to view, edit, or transfer a device — or open the full menu for more options." },
];


export const employeeTourSteps = [
  { target: '[data-tour="employees-count"]', title: "Your headcount, at a glance", body: "This shows the total number of employees currently on record." },
  { target: '[data-tour="employees-search"]', title: "Search across everything", body: "Search by name, employee ID, designation, or department — all at once." },
  { target: '[data-tour="employees-filter"]', title: "Filter by department", body: "Narrow the list down to a single department when you need to focus." },
  { target: '[data-tour="employees-new"]', title: "Add an employee", body: "Register a new person here — they appear in the table immediately." },
  { target: '[data-tour="employees-row-menu"]', title: "Row actions", body: "Open this menu on any row to view, edit, transfer, or remove an employee." },
];import { INK, MUTED, CARD, MONO, FONT_DISPLAY, DANGER, CREAM, ACCENT, BORDER } from "../../theme";


export const dashboardTourSteps = [
  { target: '[data-tour="dashboard-hero"]', title: "Your fleet at a glance", body: "Total device count and trend — the first number to check each morning." },
  { target: '[data-tour="dashboard-donut"]', title: "Device health breakdown", body: "See how your devices split across in-use, spare, and faulty at a glance." },
  { target: '[data-tour="dashboard-faults"]', title: "Open faults", body: "Devices currently flagged as faulty and awaiting action." },
  { target: '[data-tour="dashboard-transfers"]', title: "Pending transfers", body: "Devices mid-transfer between departments or owners." },
  { target: '[data-tour="dashboard-table"]', title: "Recent devices", body: "A quick-scan table of the devices that changed most recently." },
  { target: '[data-tour="dashboard-activity-chart"]', title: "Activity over time", body: "Track device events — assignments, faults, transfers — as they trend week to week." },
  { target: '[data-tour="dashboard-feed"]', title: "Live activity feed", body: "Every recent event across your fleet, newest first." },
];