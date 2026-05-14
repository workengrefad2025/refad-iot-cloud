import { 
  Code2, 
  Terminal, 
  Copy, 
  Check, 
  Wifi, 
  Cpu, 
  Database,
  Cloud,
  ChevronRight,
  Globe,
  Layers,
  Zap
} from "lucide-react";
import { useState } from "react";
import GlassCard from "@/src/components/ui/GlassCard";

const getEsp32Code = (host: string) => `
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* serverName = "${host}/api/data";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(500); }
}

void loop() {
  if(WiFi.status()== WL_CONNECTED){
    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");
    
    String payload = "{\\"device_id\\":\\"esp32_refad\\", \\"temperature\\":24.5, \\"humidity\\":50}";
    int httpResponseCode = http.POST(payload);
    http.end();
  }
  delay(10000);
}`;

const PYTHON_CODE = `
import requests
import json
import time

API_URL = "HOST_URL_HERE/api/data"
DEVICE_ID = "python_node_01"

def send_data(temp, hum):
    payload = {
        "device_id": DEVICE_ID,
        "temperature": temp,
        "humidity": hum
    }
    response = requests.post(API_URL, json=payload)
    print(f"Status: {response.status_code}, Response: {response.json()}")

while True:
    send_data(25.4, 60)
    time.sleep(5)
`;

export default function IntegrationGuide() {
  const [copied, setCopied] = useState<string | null>(null);
  const host = typeof window !== 'undefined' ? window.location.origin : 'https://refad-iot.io';

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter">Device Integration</h1>
        <p className="text-slate-400 text-xs uppercase tracking-[0.2em] font-black flex items-center gap-2">
            Refad IoT Fabric <ChevronRight className="w-3 h-3 text-accent" /> Developer Protocol
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ESP32 Section */}
        <div className="space-y-4">
           <div className="flex items-center justify-between px-2">
             <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">C++ / ESP32 Firmware</h2>
             {copied === 'esp32' && <span className="text-[10px] text-green-400 font-bold uppercase">Copied to Clipboard</span>}
           </div>
          <GlassCard className="p-0 overflow-hidden border-accent/20">
            <div className="bg-[#0f172a] p-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
                  <div className="w-2 h-2 rounded-full bg-green-400/50" />
                </div>
                <span className="text-[10px] font-mono text-slate-500 tracking-tighter lowercase">refad_node.ino</span>
              </div>
              <button 
                onClick={() => handleCopy(getEsp32Code(host), 'esp32')}
                className="text-accent hover:text-white transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 bg-[#030712] max-h-[300px] overflow-y-auto scroll-hide">
              <pre className="text-[11px] font-mono text-blue-200/60 leading-relaxed">
                {getEsp32Code(host)}
              </pre>
            </div>
          </GlassCard>
        </div>

        {/* Python Section */}
        <div className="space-y-4">
           <div className="flex items-center justify-between px-2">
             <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Python / Raspberry Pi</h2>
             {copied === 'python' && <span className="text-[10px] text-green-400 font-bold uppercase">Copied to Clipboard</span>}
           </div>
          <GlassCard className="p-0 overflow-hidden border-purple-primary/20">
            <div className="bg-[#0f172a] p-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
                  <div className="w-2 h-2 rounded-full bg-green-400/50" />
                </div>
                <span className="text-[10px] font-mono text-slate-500 tracking-tighter lowercase">telemetry.py</span>
              </div>
              <button 
                onClick={() => handleCopy(PYTHON_CODE.replace('HOST_URL_HERE', host), 'python')}
                className="text-purple-primary hover:text-white transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 bg-[#030712] max-h-[300px] overflow-y-auto scroll-hide">
              <pre className="text-[11px] font-mono text-purple-200/60 leading-relaxed">
                {PYTHON_CODE.replace('HOST_URL_HERE', host)}
              </pre>
            </div>
          </GlassCard>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard glow="blue" className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-all">
             <Globe className="w-16 h-16" />
          </div>
          <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
             <Wifi className="w-4 h-4 text-accent" /> Transport
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            All nodes communicate via <span className="text-white font-bold">Standard HTTP/JSON</span>. No complex handshakes required for fast prototyping.
          </p>
        </GlassCard>
        <GlassCard glow="purple" className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-all">
             <Database className="w-16 h-16" />
          </div>
          <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
             <Layers className="w-4 h-4 text-purple-primary" /> Architecture
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Data is persisted in <span className="text-white font-bold">SQLite 3</span> for high-performance ACID compliance on the edge.
          </p>
        </GlassCard>
        <GlassCard glow="cyan" className="relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-all">
             <Terminal className="w-16 h-16" />
          </div>
          <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
             <Zap className="w-4 h-4 text-pink-accent" /> Command
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Send real-time instructions to your hardware via the <span className="text-white font-bold">Direct Logic API</span>.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}

function TopicItem({ label, topic }: { label: string, topic: string }) {
  return (
    <div className="p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-blue-500/30 transition-all">
      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{label}</div>
      <div className="text-xs font-mono text-blue-400 mt-1 truncate">{topic}</div>
    </div>
  );
}

function Shield({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
    </svg>
  );
}
