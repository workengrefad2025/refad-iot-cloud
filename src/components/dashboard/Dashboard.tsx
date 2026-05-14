import React, { useState, useEffect } from "react";
import { 
  Zap, 
  Activity, 
  Cpu, 
  Globe, 
  AlertCircle, 
  TrendingUp, 
  ArrowUpRight,
  Shield,
  Terminal as TerminalIcon,
  HardDrive
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import GlassCard from "@/src/components/ui/GlassCard";
import { motion, AnimatePresence } from "motion/react";

export default function Dashboard() {
  const [devices, setDevices] = useState<any[]>([]);
  const [telemetry, setTelemetry] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "INITIALIZING_FABRIC_PROTOCOL...",
    "HANDSHAKE_SECURE_TOKEN_ACCEPTED",
    "NODE_042_CONNECTED_PROTOCOL_V4",
    "ENCRYPTING_EDGE_STREAM_088...",
    "SYSTEM_OPTIMAL_ACTIVE_STATUS"
  ]);

  useEffect(() => {
    setIsMounted(true);
    fetchData();
    const interval = setInterval(fetchData, 5000);
    const logInterval = setInterval(() => {
      const msgs = [
        "HEARTBEAT_ACK_NODE_77",
        "SYNCING_EDGE_BUFFER...",
        "ENCRYPTION_REKEY_COMPLETE",
        "TELEMETRY_BATCH_COMMITTED",
        "USER_ACCESS_VERIFIED_SECURE"
      ];
      setLogs(prev => [msgs[Math.floor(Math.random() * msgs.length)], ...prev].slice(0, 8));
    }, 3000);
    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, []);

  const fetchData = async () => {
    try {
      const [devRes, telRes] = await Promise.all([
        fetch('/api/devices'),
        fetch('/api/telemetry')
      ]);
      const [devData, telData] = await Promise.all([
        devRes.json(),
        telRes.json()
      ]);
      setDevices(devData);
      setTelemetry(telData);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const chartData = telemetry
    .slice(0, 20)
    .map((item) => ({
      time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      temperature: Number(item.temperature),
      humidity: Number(item.humidity),
      device: item.device_id,
    }))
    .reverse();

  const latestRecords = telemetry.slice(0, 6);
  const lastUpdated = new Date().toLocaleTimeString();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2 leading-none">Command Overview</h1>
          <div className="flex items-center gap-4 text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
            <span>Active Deployments</span>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-accent underline decoration-accent/20">Refad Global Protocol</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="text-right">
             <div className="text-[8px] text-slate-600 font-black uppercase tracking-widest">Master Node</div>
             <div className="text-xs font-mono text-slate-400">REFAD_CORE_V4</div>
           </div>
           <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent neon-glow">
              <Shield className="w-5 h-5" />
           </div>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6 border-transparent bg-gradient-to-br from-accent/10 to-transparent hover:border-accent/20 transition-all cursor-default">
           <div className="flex justify-between items-start mb-6">
              <div className="p-2 rounded-lg bg-black/40"><Cpu className="w-4 h-4 text-accent" /></div>
              <TrendingUp className="w-4 h-4 text-accent animate-pulse" />
           </div>
           <div className="text-3xl font-black text-white italic mb-1 uppercase tracking-tighter">
             {devices.length}
           </div>
           <div className="text-[10px] font-black uppercase tracking-widest text-accent">Active Nodes</div>
        </GlassCard>

        <GlassCard className="p-6 border-transparent bg-gradient-to-br from-purple-primary/10 to-transparent hover:border-purple-primary/20 transition-all cursor-default">
           <div className="flex justify-between items-start mb-6">
              <div className="p-2 rounded-lg bg-black/40"><Activity className="w-4 h-4 text-purple-primary" /></div>
              <ArrowUpRight className="w-4 h-4 text-purple-primary" />
           </div>
           <div className="text-3xl font-black text-white italic mb-1 uppercase tracking-tighter">
             {Math.floor(Math.random() * 50) + 150}k
           </div>
           <div className="text-[10px] font-black uppercase tracking-widest text-purple-primary">Fabric Events</div>
        </GlassCard>

        <GlassCard className="p-6 border-transparent bg-gradient-to-br from-pink-accent/10 to-transparent hover:border-pink-accent/20 transition-all cursor-default">
           <div className="flex justify-between items-start mb-6">
              <div className="p-2 rounded-lg bg-black/40"><Globe className="w-4 h-4 text-pink-accent" /></div>
              <div className="w-1.5 h-1.5 rounded-full bg-pink-accent animate-ping" />
           </div>
           <div className="text-3xl font-black text-white italic mb-1 uppercase tracking-tighter">
             42.1ms
           </div>
           <div className="text-[10px] font-black uppercase tracking-widest text-pink-accent">Core Latency</div>
        </GlassCard>

        <GlassCard className="p-6 border-transparent bg-gradient-to-br from-yellow-500/10 to-transparent hover:border-yellow-500/20 transition-all cursor-default">
           <div className="flex justify-between items-start mb-6">
              <div className="p-2 rounded-lg bg-black/40"><AlertCircle className="w-4 h-4 text-yellow-500" /></div>
           </div>
           <div className="text-3xl font-black text-white italic mb-1 uppercase tracking-tighter">
             00
           </div>
           <div className="text-[10px] font-black uppercase tracking-widest text-yellow-500">Node Failures</div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Telemetry Chart */}
        <GlassCard className="lg:col-span-2 p-8 min-h-[450px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -z-10 group-hover:bg-accent/8 transition-all duration-700" />
          
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" /> Real-time Sensor Telemetry
              </h2>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-1">Temperature & Humidity from connected nodes</p>
            </div>
            <div className="text-right">
              <div className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">Protocol Clock</div>
              <div className="text-xs font-mono text-accent">{lastUpdated}</div>
            </div>
          </div>

          <div className="w-full h-[300px]">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#00f5ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#475569" 
                    fontSize={10} 
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="#475569" 
                    fontSize={10} 
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0a0f', border: '1px solid rgba(0,245,255,0.2)', borderRadius: '12px', boxShadow: '0 0 20px rgba(0,245,255,0.1)' }}
                    itemStyle={{ color: '#00f5ff', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="temperature" 
                    name="Temperature (°C)"
                    stroke="#00f5ff" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-2 p-6 bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-black text-white uppercase tracking-tighter">Latest Sensor Records</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-1">Most recent device telemetry</p>
            </div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest">{telemetry.length} entries</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {latestRecords.map((entry, idx) => (
              <div key={`${entry.device_id}-${entry.timestamp}-${idx}`} className="rounded-3xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest">{entry.device_id}</div>
                    <div className="text-sm font-black text-white truncate">{entry.device_id.replace(/_/g, ' ').toUpperCase()}</div>
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">{new Date(entry.timestamp).toLocaleTimeString()}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs text-slate-300">
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500">Temperature</div>
                    <div className="text-white text-lg font-black">{entry.temperature}°C</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500">Humidity</div>
                    <div className="text-white text-lg font-black">{entry.humidity}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* System Logs */}
        <GlassCard className="p-8 border-white/5 flex flex-col h-full">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-2">
                <TerminalIcon className="w-5 h-5 text-purple-primary" /> Nexus Logs
              </h2>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
           </div>

           <div className="flex-1 font-mono text-[10px] space-y-4 overflow-hidden">
             <AnimatePresence mode="popLayout">
               {logs.map((log, i) => (
                 <motion.div 
                   key={log + i}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="flex gap-4 group"
                 >
                   <span className="text-slate-700 font-bold shrink-0">[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span>
                   <span className={`uppercase font-black tracking-tighter transition-colors ${i === 0 ? 'text-accent' : 'text-slate-400 group-hover:text-slate-200'}`}>
                     {log}
                   </span>
                 </motion.div>
               ))}
             </AnimatePresence>
           </div>

           <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
              <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest text-slate-500">
                <span className="flex items-center gap-2"><HardDrive className="w-3 h-3" /> Storage Usage</span>
                <span className="text-white">42.8 GB / 1.0 TB</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: '42%' }}
                   className="h-full bg-accent neon-glow"
                 />
              </div>
           </div>
        </GlassCard>
      </div>

      {/* Grid: Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        <GlassCard glow="blue" className="p-8 relative overflow-hidden group">
           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 blur-3xl rounded-full transition-all group-hover:scale-150" />
           <h3 className="text-base font-black text-white uppercase tracking-tighter mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" /> Security Protocol
           </h3>
           <p className="text-xs text-slate-400 leading-relaxed mb-6">
             Layer-7 encryption active on all clusters. mTLS handshakes completed for 12 incoming edge nodes in the last rotation.
           </p>
           <button className="text-[10px] font-black uppercase tracking-widest text-accent hover:underline decoration-2 underline-offset-4">Configure Shield</button>
        </GlassCard>

        <GlassCard glow="purple" className="p-8 relative overflow-hidden group">
           <h3 className="text-base font-black text-white uppercase tracking-tighter mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-primary" /> Logic Density
           </h3>
           <p className="text-xs text-slate-400 leading-relaxed mb-6">
             Automation engine running at 14% utilization. 42 active rules processed 1.2M operations in the last 60 minutes.
           </p>
           <button className="text-[10px] font-black uppercase tracking-widest text-purple-primary hover:underline decoration-2 underline-offset-4">Optimize Engine</button>
        </GlassCard>

        <GlassCard glow="pink" className="p-8 md:col-span-2 lg:col-span-1 relative overflow-hidden group">
           <h3 className="text-base font-black text-white uppercase tracking-tighter mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-pink-accent" /> Global Distribution
           </h3>
           
           {/* Visual Map Mock */}
           <div className="relative h-24 mb-6 bg-white/5 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 opacity-20">
               <svg viewBox="0 0 200 100" className="w-full h-full text-slate-500 fill-current">
                 <circle cx="50" cy="40" r="2" className="text-accent animate-pulse" />
                 <circle cx="120" cy="30" r="2" className="text-purple-primary animate-pulse" />
                 <circle cx="160" cy="70" r="2" className="text-pink-accent animate-pulse" />
                 <path d="M50 40 L120 30 L160 70" stroke="currentColor" strokeWidth="0.5" fill="none" className="opacity-30" />
               </svg>
             </div>
             <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest z-10">Map Fabric: 04 Active Clusters</div>
           </div>

           <p className="text-xs text-slate-400 leading-relaxed mb-6">
             Nodes currently distributed across 5 edge regions. Primary traffic routing through US-EAST-1 and EU-CENTRAL.
           </p>
           <button className="text-[10px] font-black uppercase tracking-widest text-pink-accent hover:underline decoration-2 underline-offset-4">View Map Fabric</button>
        </GlassCard>
      </div>
    </motion.div>
  );
}
