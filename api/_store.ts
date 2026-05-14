import fs from 'fs';
import path from 'path';

export interface Device {
  id: string;
  name: string;
  type: string;
  status: string;
  lastSeen: string;
}

export interface Telemetry {
  id: number;
  device_id: string;
  temperature: number;
  humidity: number;
  timestamp: string;
}

export interface Command {
  id: number;
  device_id: string;
  command: string;
  timestamp: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface GroupMember {
  group_id: string;
  device_id: string;
}

export interface Store {
  devices: Device[];
  telemetry: Telemetry[];
  commands: Command[];
  groups: Group[];
  group_members: GroupMember[];
  nextTelemetryId: number;
  nextCommandId: number;
}

const defaultStore: Store = {
  devices: [
    { id: 'esp32_01', name: 'Refad Node Alpha', type: 'ESP32-S3', status: 'online', lastSeen: new Date().toISOString() },
    { id: 'arduino_uno_02', name: 'Refad Climate Sensor', type: 'Arduino Uno', status: 'online', lastSeen: new Date().toISOString() },
    { id: 'sim_node_03', name: 'Refad Virtual Node', type: 'Simulation', status: 'online', lastSeen: new Date().toISOString() },
  ],
  telemetry: [],
  commands: [],
  groups: [
    { id: 'group-1', name: 'Smart Factory A', description: 'Main manufacturing line devices', createdAt: new Date().toISOString() },
    { id: 'group-2', name: 'Office HVAC', description: 'Level 4 climate control', createdAt: new Date().toISOString() },
  ],
  group_members: [
    { group_id: 'group-1', device_id: 'esp32_01' },
    { group_id: 'group-1', device_id: 'arduino_uno_02' },
    { group_id: 'group-2', device_id: 'sim_node_03' },
  ],
  nextTelemetryId: 1,
  nextCommandId: 1,
};

const isServerless = typeof process.env.VERCEL !== 'undefined' || process.env.NODE_ENV === 'production';
const rootStorePath = path.join(process.cwd(), 'iot-store.json');
const tempStorePath = path.join('/tmp', 'iot-store.json');

let store: Store | null = null;

function safeParse(content: string) {
  try {
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function loadStore() {
  if (store) return store;

  if (isServerless) {
    if (fs.existsSync(tempStorePath)) {
      const data = safeParse(fs.readFileSync(tempStorePath, 'utf-8'));
      if (data) {
        store = data;
        return store;
      }
    }

    if (fs.existsSync(rootStorePath)) {
      const data = safeParse(fs.readFileSync(rootStorePath, 'utf-8'));
      if (data) {
        store = data;
        return store;
      }
    }

    store = defaultStore;
    return store;
  }

  if (fs.existsSync(rootStorePath)) {
    const data = safeParse(fs.readFileSync(rootStorePath, 'utf-8'));
    if (data) {
      store = data;
      return store;
    }
  }

  store = defaultStore;
  fs.writeFileSync(rootStorePath, JSON.stringify(store, null, 2));
  return store;
}

function saveStore() {
  if (!store) return;

  const payload = JSON.stringify(store, null, 2);
  if (isServerless) {
    try {
      fs.writeFileSync(tempStorePath, payload);
    } catch {
      // ignore write failures in serverless environments
    }
    return;
  }

  fs.writeFileSync(rootStorePath, payload);
}

export { loadStore as getStore, saveStore };
