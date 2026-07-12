
import {
  Laptop2,
  Computer,
  Monitor,
  Printer,
  Server,
  Router,
  Network,
} from "lucide-react";

export const STATUS_BREAKDOWN = [
  { label: "In-use", pct: 68 },
  { label: "Spare", pct: 22 },
  { label: "Faulty", pct: 10 },
];

export const TREND = [40, 55, 47, 62, 58, 70, 66, 74];

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
  {
    id: "DV-1001",
    icon: Laptop2,
    type: "Laptop",
    manufacturer: "Lenovo",
    model: "ThinkPad X1 Carbon Gen 11",
    status: "in-use",
    dept: "ICT",
    assignedTo: "Bilal Ahmed",
    shared: false,
    updated: "2d ago",
    specs: {
      cpu: "Intel Core i7-1365U",
      ram_gb: 16,
      disk_type: "SSD",
      storage_gb: 512,
      os: "Windows 11 Pro",
      ip_address: "192.168.10.21",
      mac_address: "00:1A:2B:3C:4D:5E",
    },
    assignment: {
      location: "Head Office",
      section: "ICT",
      room: "203",
      cabin: "A-12",
      shared_users: [],
      assigned_date: "2025-01-15",
    },
  },

  {
    id: "DV-1002",
    icon: Laptop2,
    type: "Laptop",
    manufacturer: "HP",
    model: "EliteBook 840 G10",
    status: "in-use",
    dept: "Finance",
    assignedTo: "Ayesha Khan",
    shared: false,
    updated: "5h ago",
    specs: {
      cpu: "Intel Core i5-1345U",
      ram_gb: 16,
      disk_type: "SSD",
      storage_gb: 512,
      os: "Windows 11 Pro",
      ip_address: "192.168.10.24",
      mac_address: "10:55:6B:2A:89:11",
    },
    assignment: {
      location: "Head Office",
      section: "Finance",
      room: "102",
      cabin: "F-03",
      shared_users: [],
      assigned_date: "2025-02-12",
    },
  },

  {
    id: "DV-1003",
    icon: Computer,
    type: "Desktop",
    manufacturer: "Dell",
    model: "OptiPlex 7010",
    status: "spare",
    dept: "ICT",
    assignedTo: "Unassigned",
    shared: false,
    updated: "1w ago",
    specs: {
      cpu: "Intel Core i5-12500",
      ram_gb: 16,
      disk_type: "SSD",
      storage_gb: 512,
      os: "Windows 11 Pro",
      ip_address: "192.168.10.31",
      mac_address: "A0:BC:DD:12:90:44",
    },
    assignment: {
      location: "ICT Store",
      section: "Inventory",
      room: "Storage",
      cabin: "",
      shared_users: [],
      assigned_date: "",
    },
  },

  {
    id: "DV-1004",
    icon: Computer,
    type: "Desktop",
    manufacturer: "HP",
    model: "ProDesk 600 G6",
    status: "in-use",
    dept: "Reservations",
    assignedTo: "Ali Hassan",
    shared: false,
    updated: "3d ago",
    specs: {
      cpu: "Intel Core i7-10700",
      ram_gb: 32,
      disk_type: "SSD",
      storage_gb: 1024,
      os: "Windows 11 Pro",
      ip_address: "192.168.10.45",
      mac_address: "22:45:BC:88:11:CC",
    },
    assignment: {
      location: "Terminal",
      section: "Reservations",
      room: "Counter 4",
      cabin: "",
      shared_users: [],
      assigned_date: "2025-01-20",
    },
  },

  {
    id: "DV-1005",
    icon: Monitor,
    type: "Monitor",
    manufacturer: "LG",
    model: "27QN880",
    status: "in-use",
    dept: "HR",
    assignedTo: "Sara Malik",
    shared: false,
    updated: "4d ago",
    specs: {
      panel_type: "IPS",
      size_inches: 27,
      resolution: "2560×1440",
    },
    assignment: {
      location: "Head Office",
      section: "HR",
      room: "301",
      cabin: "H-02",
      shared_users: [],
      assigned_date: "2025-03-01",
    },
  },

  {
    id: "DV-1006",
    icon: Monitor,
    type: "Monitor",
    manufacturer: "Samsung",
    model: "S24R350",
    status: "spare",
    dept: "ICT",
    assignedTo: "Inventory",
    shared: false,
    updated: "2w ago",
    specs: {
      panel_type: "IPS",
      size_inches: 24,
      resolution: "1920×1080",
    },
    assignment: {
      location: "ICT Store",
      section: "Inventory",
      room: "Storage",
      cabin: "",
      shared_users: [],
      assigned_date: "",
    },
  },

  {
    id: "DV-1007",
    icon: Printer,
    type: "Printer",
    manufacturer: "HP",
    model: "LaserJet M428",
    status: "faulty",
    dept: "Reservations",
    assignedTo: "Shared",
    shared: true,
    updated: "1w ago",
    specs: {
      technology: "Laser",
      color: false,
      ppm_speed: "40",
      paper_capacity: 250,
      duplex: true,
      ip_address: "192.168.10.55",
      mac_address: "3C:52:82:1A:9F:02",
    },
    assignment: {
      location: "Terminal",
      section: "Reservations",
      room: "Reception",
      cabin: "",
      shared_users: ["Counter 1", "Counter 2"],
      assigned_date: "2025-01-09",
    },
  },

  {
    id: "DV-1008",
    icon: Printer,
    type: "Printer",
    manufacturer: "Canon",
    model: "imageRUNNER 2425",
    status: "in-use",
    dept: "Finance",
    assignedTo: "Finance Team",
    shared: true,
    updated: "8h ago",
    specs: {
      technology: "Laser",
      color: false,
      ppm_speed: "25",
      paper_capacity: 500,
      duplex: true,
      ip_address: "192.168.10.61",
      mac_address: "00:BB:22:CC:44:55",
    },
    assignment: {
      location: "Head Office",
      section: "Finance",
      room: "Accounts",
      cabin: "",
      shared_users: ["Finance Team"],
      assigned_date: "2024-12-15",
    },
  },

  {
    id: "DV-1009",
    icon: Server,
    type: "Server",
    manufacturer: "Dell",
    model: "PowerEdge R750",
    status: "in-use",
    dept: "ICT",
    assignedTo: "Infrastructure Team",
    shared: true,
    updated: "1d ago",
    specs: {
      form_factor: "Rackmount 2U",
      cpu: "Dual Intel Xeon Silver 4314",
      ram_gb: 128,
      storage_gb: 4096,
      ip_address: "10.0.0.5",
      mac_address: "90:E2:BA:11:22:33",
    },
    assignment: {
      location: "Data Center",
      section: "Servers",
      room: "Rack A",
      cabin: "",
      shared_users: ["ICT Infrastructure"],
      assigned_date: "2024-10-20",
    },
  },

  {
    id: "DV-1010",
    icon: Server,
    type: "Server",
    manufacturer: "HPE",
    model: "ProLiant DL380 Gen10",
    status: "retired",
    dept: "ICT",
    assignedTo: "Retired",
    shared: false,
    updated: "5mo ago",
    specs: {
      form_factor: "Rackmount 2U",
      cpu: "Intel Xeon Gold",
      ram_gb: 64,
      storage_gb: 2048,
      ip_address: "",
      mac_address: "",
    },
    assignment: {
      location: "Warehouse",
      section: "Retired Assets",
      room: "Storage",
      cabin: "",
      shared_users: [],
      assigned_date: "2021-08-11",
    },
  },

  {
    id: "DV-1011",
    icon: Network,
    type: "Switch",
    manufacturer: "Cisco",
    model: "Catalyst 9200",
    status: "in-use",
    dept: "ICT",
    assignedTo: "Network Team",
    shared: true,
    updated: "6h ago",
    specs: {
      port_count: 48,
      speed: "1 Gbps",
      managed: true,
      ip_address: "10.0.0.20",
      mac_address: "40:55:39:CC:55:12",
    },
    assignment: {
      location: "Data Center",
      section: "Networking",
      room: "Rack B",
      cabin: "",
      shared_users: ["ICT Network Team"],
      assigned_date: "2024-11-08",
    },
  },

  {
    id: "DV-1012",
    icon: Router,
    type: "Router",
    manufacturer: "MikroTik",
    model: "CCR2004-16G-2S+",
    status: "dispatched",
    dept: "Works",
    assignedTo: "Pending Installation",
    shared: false,
    updated: "4h ago",
    specs: {
      port_count: 16,
      speed: "10 Gbps",
      managed: true,
      ip_address: "172.16.0.1",
      mac_address: "68:72:51:AB:CD:EF",
    },
    assignment: {
      location: "Regional Office",
      section: "Works",
      room: "Server Room",
      cabin: "",
      shared_users: [],
      assigned_date: "2025-04-01",
    },
  },
];
// export const DEPARTMENTS = ["Finance", "ICT", "Works", "Reservations", "HR"];

export const DESIGNATIONS = [
  "General Manager",
  "Associate General Manager",
  "HR Manager",
  "Accountant",
  "Software Engineer",
  "IT Manager",
  "IT Support Engineer",
  "Network Administrator",
  "Product Designer",
  "Front Desk Executive",
];


export const EMPLOYEES = [
  {
    id: "EMP-2201",
    name: { first: "Bilal", last: "Ahmed" },
    father_name: { first: "Tariq", last: "Ahmed" },
    designation: "Software Engineer",
    p_number: "P-10234",
    phones: ["0300-1234567"],
    emails: ["bilal.ahmed@company.com"],
    address: {
      street: "House 12, St 4",
      town: "Model Town",
      city: "Lahore",
      province: "Punjab",
      country: "Pakistan",
    },
    department: "ICT",
    location: "Head Office",
    section: "3rd Floor",
    room: "Room 301",
    cabin: "",
  },

  {
    id: "EMP-2202",
    name: { first: "Sana", last: "Tariq" },
    father_name: { first: "Imran", last: "Tariq" },
    designation: "Product Designer",
    p_number: "P-10235",
    phones: ["0321-9988776"],
    emails: ["sana.tariq@company.com"],
    address: {
      street: "House 45, St 9",
      town: "Gulberg",
      city: "Lahore",
      province: "Punjab",
      country: "Pakistan",
    },
    department: "HR",
    location: "Head Office",
    section: "2nd Floor",
    room: "",
    cabin: "Cabin 5",
  },

  {
    id: "EMP-2203",
    name: { first: "Mehak", last: "Fatima" },
    father_name: { first: "Naveed", last: "Ahmad" },
    designation: "Front Desk Executive",
    p_number: "P-10236",
    phones: ["0333-1122334"],
    emails: ["mehak.fatima@company.com"],
    address: {
      street: "House 8, St 2",
      town: "Johar Town",
      city: "Lahore",
      province: "Punjab",
      country: "Pakistan",
    },
    department: "Reservations",
    location: "Head Office",
    section: "Ground Floor",
    room: "Reception",
    cabin: "",
  },

  {
    id: "EMP-2204",
    name: { first: "Ayesha", last: "Khan" },
    father_name: { first: "Zafar", last: "Khan" },
    designation: "IT Manager",
    p_number: "P-10237",
    phones: ["0300-5566778"],
    emails: ["ayesha.khan@company.com"],
    address: {
      street: "House 21, St 6",
      town: "DHA Phase 5",
      city: "Lahore",
      province: "Punjab",
      country: "Pakistan",
    },
    department: "ICT",
    location: "Head Office",
    section: "Data Center",
    room: "Server Room",
    cabin: "Cabin 2",
  },

  {
    id: "EMP-2205",
    name: { first: "Usman", last: "Raza" },
    father_name: { first: "Ahmed", last: "Raza" },
    designation: "General Manager",
    p_number: "P-10238",
    phones: ["0312-4455667"],
    emails: ["usman.raza@company.com"],
    address: {
      street: "House 18, St 10",
      town: "Cantt",
      city: "Lahore",
      province: "Punjab",
      country: "Pakistan",
    },
    department: "Works",
    location: "Head Office",
    section: "Management Floor",
    room: "Executive Room",
    cabin: "GM Cabin",
  },

  {
    id: "EMP-2206",
    name: { first: "Hassan", last: "Ali" },
    father_name: { first: "Rashid", last: "Ali" },
    designation: "Associate General Manager",
    p_number: "P-10239",
    phones: ["0301-8877665"],
    emails: ["hassan.ali@company.com"],
    address: {
      street: "House 30, St 12",
      town: "Wapda Town",
      city: "Lahore",
      province: "Punjab",
      country: "Pakistan",
    },
    department: "Finance",
    location: "Head Office",
    section: "Accounts",
    room: "Room 204",
    cabin: "Cabin 7",
  },

  {
    id: "EMP-2207",
    name: { first: "Nida", last: "Malik" },
    father_name: { first: "Javed", last: "Malik" },
    designation: "HR Manager",
    p_number: "P-10240",
    phones: ["0345-6677889"],
    emails: ["nida.malik@company.com"],
    address: {
      street: "House 9, St 15",
      town: "Model Town",
      city: "Lahore",
      province: "Punjab",
      country: "Pakistan",
    },
    department: "HR",
    location: "Head Office",
    section: "HR Department",
    room: "Room 110",
    cabin: "HR Cabin",
  },

  {
    id: "EMP-2208",
    name: { first: "Ahmed", last: "Siddiqui" },
    father_name: { first: "Khalid", last: "Siddiqui" },
    designation: "Accountant",
    p_number: "P-10241",
    phones: ["0308-7788990"],
    emails: ["ahmed.siddiqui@company.com"],
    address: {
      street: "House 55, St 3",
      town: "Gulberg",
      city: "Lahore",
      province: "Punjab",
      country: "Pakistan",
    },
    department: "Finance",
    location: "Head Office",
    section: "Accounts",
    room: "Room 205",
    cabin: "",
  },

  {
    id: "EMP-2209",
    name: { first: "Hamza", last: "Iqbal" },
    father_name: { first: "Nadeem", last: "Iqbal" },
    designation: "Network Administrator",
    p_number: "P-10242",
    phones: ["0322-3344556"],
    emails: ["hamza.iqbal@company.com"],
    address: {
      street: "House 40, St 8",
      town: "DHA Phase 2",
      city: "Lahore",
      province: "Punjab",
      country: "Pakistan",
    },
    department: "ICT",
    location: "Data Center",
    section: "Networking",
    room: "Server Room",
    cabin: "",
  },
];

export const DEPARTMENT_TREE = [
  {
    id: "DEP-01",
    name: "Finance",
    manager_id: "EMP-2206",

    locations: [
      {
        id: "LOC-01",
        branch_location: "Head Office",

        sections: [
          {
            id: "SEC-01",
            name: "Accounts",

            rooms: [
              {
                id: "RM-01",
                name: "Accounts Room",
                person_ids: ["EMP-2208", "EMP-2210"],
              },
              {
                id: "RM-02",
                name: "Audit Room",
                person_ids: ["EMP-2211"],
              },
            ],

            cabins: [
              {
                id: "CAB-01",
                name: "Finance Manager Cabin",
                person_id: "EMP-2206",
              },
              {
                id: "CAB-02",
                name: "Senior Accountant Cabin",
                person_id: "EMP-2208",
              },
            ],
          },

          {
            id: "SEC-02",
            name: "Billing",

            rooms: [
              {
                id: "RM-03",
                name: "Billing Room",
                person_ids: ["EMP-2212", "EMP-2213"],
              },
            ],

            cabins: [],
          },
        ],
      },

      {
        id: "LOC-02",
        branch_location: "Regional Office Lahore",

        sections: [
          {
            id: "SEC-03",
            name: "Finance Branch",

            rooms: [
              {
                id: "RM-04",
                name: "Finance Operations",
                person_ids: ["EMP-2214"],
              },
            ],

            cabins: [
              {
                id: "CAB-03",
                name: "Branch Finance Head",
                person_id: "EMP-2215",
              },
            ],
          },
        ],
      },
    ],
  },


  {
    id: "DEP-02",
    name: "ICT",
    manager_id: "EMP-2204",

    locations: [
      {
        id: "LOC-03",
        branch_location: "Head Office",

        sections: [
          {
            id: "SEC-04",
            name: "Infrastructure",

            rooms: [
              {
                id: "RM-05",
                name: "Server Room",
                person_ids: ["EMP-2204"],
              },
              {
                id: "RM-06",
                name: "Network Room",
                person_ids: ["EMP-2209"],
              },
            ],

            cabins: [
              {
                id: "CAB-04",
                name: "ICT Manager Cabin",
                person_id: "EMP-2204",
              },
              {
                id: "CAB-05",
                name: "Network Admin Cabin",
                person_id: "EMP-2209",
              },
            ],
          },

          {
            id: "SEC-05",
            name: "Help Desk",

            rooms: [
              {
                id: "RM-07",
                name: "Support Room",
                person_ids: ["EMP-2216", "EMP-2217"],
              },
            ],

            cabins: [],
          },
        ],
      },


      {
        id: "LOC-04",
        branch_location: "Data Center",

        sections: [
          {
            id: "SEC-06",
            name: "Server Operations",

            rooms: [
              {
                id: "RM-08",
                name: "Rack Area A",
                person_ids: [],
              },
              {
                id: "RM-09",
                name: "Rack Area B",
                person_ids: [],
              },
            ],

            cabins: [
              {
                id: "CAB-06",
                name: "System Admin Cabin",
                person_id: "EMP-2218",
              },
            ],
          },
        ],
      },
    ],
  },


  {
    id: "DEP-03",
    name: "Works",
    manager_id: "EMP-2205",

    locations: [
      {
        id: "LOC-05",
        branch_location: "Head Office",

        sections: [
          {
            id: "SEC-07",
            name: "Operations",

            rooms: [
              {
                id: "RM-10",
                name: "Operations Room",
                person_ids: ["EMP-2205"],
              },
            ],

            cabins: [
              {
                id: "CAB-07",
                name: "General Manager Cabin",
                person_id: "EMP-2205",
              },
            ],
          },
        ],
      },


      {
        id: "LOC-06",
        branch_location: "Workshop",

        sections: [
          {
            id: "SEC-08",
            name: "Maintenance",

            rooms: [
              {
                id: "RM-11",
                name: "Workshop Floor",
                person_ids: ["EMP-2219"],
              },
              {
                id: "RM-12",
                name: "Equipment Store",
                person_ids: [],
              },
            ],

            cabins: [
              {
                id: "CAB-08",
                name: "Supervisor Cabin",
                person_id: "EMP-2220",
              },
            ],
          },
        ],
      },
    ],
  },


  {
    id: "DEP-04",
    name: "Reservations",
    manager_id: "EMP-2203",

    locations: [
      {
        id: "LOC-07",
        branch_location: "Head Office",

        sections: [
          {
            id: "SEC-09",
            name: "Customer Services",

            rooms: [
              {
                id: "RM-13",
                name: "Front Desk",
                person_ids: ["EMP-2203"],
              },
              {
                id: "RM-14",
                name: "Booking Team",
                person_ids: ["EMP-2221", "EMP-2222"],
              },
            ],

            cabins: [
              {
                id: "CAB-09",
                name: "Reservations Manager Cabin",
                person_id: "EMP-2223",
              },
            ],
          },
        ],
      },


      {
        id: "LOC-08",
        branch_location: "Airport Branch",

        sections: [
          {
            id: "SEC-10",
            name: "Airport Counter",

            rooms: [
              {
                id: "RM-15",
                name: "Counter Area",
                person_ids: ["EMP-2224"],
              },
            ],

            cabins: [],
          },
        ],
      },
    ],
  },


  {
    id: "DEP-05",
    name: "HR",
    manager_id: "EMP-2207",

    locations: [
      {
        id: "LOC-09",
        branch_location: "Head Office",

        sections: [
          {
            id: "SEC-11",
            name: "Human Resources",

            rooms: [
              {
                id: "RM-16",
                name: "HR Operations",
                person_ids: ["EMP-2207"],
              },
              {
                id: "RM-17",
                name: "Interview Room",
                person_ids: [],
              },
            ],

            cabins: [
              {
                id: "CAB-10",
                name: "HR Manager Cabin",
                person_id: "EMP-2207",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const DEPARTMENTS = DEPARTMENT_TREE.map((d) => d.name);