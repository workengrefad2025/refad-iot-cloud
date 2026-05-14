import { 
  Cpu, 
  Database, 
  Activity, 
  Shield, 
  Users, 
  Layers, 
  Settings, 
  Bell, 
  Zap,
  LayoutDashboard,
  Box,
  Smartphone,
  Gauge
} from "lucide-react";

export const NAVIGATION_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "devices", label: "Devices", icon: Smartphone },
  { id: "groups", label: "Groups", icon: Layers },
  { id: "telemetry", label: "Telemetry", icon: Activity },
  { id: "rules", label: "Rule Engine", icon: Zap },
  { id: "users", label: "Users", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

export const MOCK_ORGANIZATION: any = {
  id: "org-1",
  name: "Nexus Global Corp",
  ownerId: "user-1",
  createdAt: new Date().toISOString(),
};

export const MOCK_USER: any = {
  uid: "user-1",
  email: "admin@nexus-iot.io",
  displayName: "Alex Rivera",
  orgId: "org-1",
  role: "admin",
};

export const MOCK_GROUPS: any[] = [
  { id: "group-1", name: "Smart Factory A", description: "Main manufacturing line devices", orgId: "org-1", createdAt: new Date().toISOString() },
  { id: "group-2", name: "Office HVAC", description: "Level 4 climate control", orgId: "org-1", createdAt: new Date().toISOString() },
];

export const MOCK_DEVICES: any[] = [
  { 
    id: "dev-001", 
    name: "Sensor-Node-Alpha", 
    type: "ESP32-S3", 
    status: "online", 
    orgId: "org-1", 
    lastSeen: new Date().toISOString(), 
    groupIds: ["group-1"],
    metadata: { version: "1.2.4", location: "Line 1" },
    telemetry: { temperature: 24.5, humidity: 45, voltage: 3.3 }
  },
  { 
    id: "dev-002", 
    name: "HVAC-Controller-04", 
    type: "ESP32-WROOM", 
    status: "offline", 
    orgId: "org-1", 
    lastSeen: new Date(Date.now() - 3600000).toISOString(), 
    groupIds: ["group-2"],
    metadata: { version: "2.0.1", location: "Floor 4" },
    telemetry: { temperature: 22.1, humidity: 40 }
  },
  { 
    id: "dev-003", 
    name: "Gateway-Main", 
    type: "Raspberry-Pi-4", 
    status: "online", 
    orgId: "org-1", 
    lastSeen: new Date().toISOString(), 
    groupIds: ["group-1", "group-2"],
    metadata: { version: "4.1.0", location: "Server Room" },
    telemetry: { cpuLoad: 12, ramUsage: 450 }
  }
];
