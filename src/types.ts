export enum DeviceStatus {
  ONLINE = "online",
  OFFLINE = "offline",
  PROVISIONING = "provisioning",
  ERROR = "error",
}

export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  VIEWER = "viewer",
}

export interface Organization {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  orgId: string;
  role: UserRole;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  status: DeviceStatus;
  orgId: string;
  lastSeen: string;
  groupIds: string[];
  metadata: Record<string, any>;
  telemetry: TelemetryData;
}

export interface DeviceGroup {
  id: string;
  name: string;
  description: string;
  orgId: string;
  createdAt: string;
}

export interface TelemetryData {
  temperature?: number;
  humidity?: number;
  voltage?: number;
  rssi?: number;
  motion?: boolean;
  [key: string]: any;
}

export interface Command {
  id: string;
  deviceId: string;
  command: string;
  payload: any;
  status: "pending" | "sent" | "delivered" | "failed";
  timestamp: string;
}
