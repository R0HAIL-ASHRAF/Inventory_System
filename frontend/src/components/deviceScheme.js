
export const CATEGORIES = ["Laptop", "Desktop", "Monitor", "Printer", "Server", "Switch", "Router"];

const NETWORK_FIELDS = [
  { key: "ip_address", label: "IP Address", type: "text" },
  { key: "mac_address", label: "MAC Address", type: "text" },
];

export const SPEC_SCHEMAS = {
  Laptop: [
    { key: "cpu", label: "CPU", type: "text" },
    { key: "ram_gb", label: "RAM (GB)", type: "number" },
    { key: "disk_type", label: "Disk Type", type: "select", options: ["SSD", "HDD"] },
    { key: "storage_gb", label: "Storage (GB)", type: "number" },
    { key: "os", label: "OS", type: "text" },
    ...NETWORK_FIELDS,
  ],
  Desktop: [
    { key: "cpu", label: "CPU", type: "text" },
    { key: "ram_gb", label: "RAM (GB)", type: "number" },
    { key: "disk_type", label: "Disk Type", type: "select", options: ["SSD", "HDD"] },
    { key: "storage_gb", label: "Storage (GB)", type: "number" },
    { key: "os", label: "OS", type: "text" },
    ...NETWORK_FIELDS,
  ],
  Monitor: [
    { key: "panel_type", label: "Panel Type", type: "select", options: ["IPS", "VA", "TN"] },
    { key: "size_inches", label: "Size (in)", type: "number" },
    { key: "resolution", label: "Resolution", type: "text" },
  ],
  Printer: [
    { key: "technology", label: "Technology", type: "select", options: ["Laser", "Inkjet"] },
    { key: "color", label: "Color", type: "boolean" },
    { key: "ppm_speed", label: "Speed (ppm)", type: "text" },
    { key: "paper_capacity", label: "Paper Capacity", type: "number" },
    { key: "duplex", label: "Duplex", type: "boolean" },
    ...NETWORK_FIELDS,
  ],
  Server: [
    { key: "form_factor", label: "Form Factor", type: "text" },
    { key: "cpu", label: "CPU", type: "text" },
    { key: "ram_gb", label: "RAM (GB)", type: "number" },
    { key: "storage_gb", label: "Storage (GB)", type: "number" },
    ...NETWORK_FIELDS,
  ],
  Switch: [
    { key: "port_count", label: "Ports", type: "number" },
    { key: "speed", label: "Speed", type: "text" },
    { key: "managed", label: "Managed", type: "boolean" },
    ...NETWORK_FIELDS,
  ],
  Router: [
    { key: "port_count", label: "Ports", type: "number" },
    { key: "speed", label: "Speed", type: "text" },
    { key: "managed", label: "Managed", type: "boolean" },
    ...NETWORK_FIELDS,
  ],
};

export const ASSIGNMENT_SCHEMA = [
  { key: "location", label: "Location", type: "text" },
  { key: "section", label: "Section", type: "text" },
  { key: "room", label: "Room", type: "text" },
  { key: "cabin", label: "Cabin", type: "text" },
  { key: "shared_users", label: "Shared Users", type: "list" },
  { key: "assigned_date", label: "Assigned Date", type: "text" },
];

export function defaultSpecsFor(category) {
  const schema = SPEC_SCHEMAS[category] || [];
  return schema.reduce((acc, f) => {
    acc[f.key] = f.type === "boolean" ? false : f.type === "number" ? 0 : "";
    return acc;
  }, {});
}