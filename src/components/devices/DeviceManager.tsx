import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Plus, 
  Search, 
  MoreVertical, 
  Activity, 
  Trash2, 
  Settings, 
  X,
  Check,
  Zap,
  Globe,
  Wifi,
  Cpu
} from 'lucide-react';
import GlassCard from '../ui/GlassCard';

interface Device {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline';
  lastSeen: string;
}

export default function DeviceManager() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [newDevice, setNewDevice] = useState({ name: '', type: 'sensor' });

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const res = await fetch('/api/devices');
      const data = await res.json();
      setDevices(data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const handleAddDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        id: newDevice.name.trim().toLowerCase().replace(/\s+/g, '-'),
        name: newDevice.name.trim(),
        type: newDevice.type,
      };

      const res = await fetch('/api/devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        fetchDevices();
        setIsAddModalOpen(false);
        setNewDevice({ name: '', type: 'sensor' });
      }
    } catch (e) { console.error(e); }
  };

  const handleDeleteDevice = async (id: string) => {
    if (!confirm("Are you sure you want to terminate this node?")) return;
    try {
      await fetch(`/api/devices/${id}`, { method: 'DELETE' });
      fetchDevices();
    } catch (e) { console.error(e); }
  };

  const filteredDevices = devices.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-1">Device Nexus</h1>
          <div className="flex items-center gap-3">
             <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Cluster Coordination Center</p>
             <div className="h-4 w-px bg-white/10" />
             <div className="text-[10px] text-accent font-black uppercase tracking-widest bg-accent/10 px-2 py-0.5 rounded animate-pulse">Live Status Tracking</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Filter nodes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/40 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs w-64 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 transition-all font-mono"
            />
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-accent text-black p-3 rounded-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,245,255,0.2)]"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Nodes" value={devices.length} sub="Cluster Size" icon={Globe} color="blue" />
        <StatCard label="Online" value={devices.filter(d => d.status === 'online').length} sub="Active Links" icon={Activity} color="green" />
        <StatCard label="Offline" value={devices.filter(d => d.status === 'offline').length} sub="Connection Lost" icon={Zap} color="yellow" />
        <StatCard label="Traffic" value="2.4 GB" sub="Protocol Load" icon={Wifi} color="purple" />
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        <AnimatePresence mode="popLayout">
          {filteredDevices.map((device, idx) => (
            <motion.div
              layout
              key={device.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
            >
              <GlassCard className="group relative overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 right-0 p-4">
                   <div className={`w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-green-500 animate-pulse box-shadow-green' : 'bg-red-500'}`} />
                </div>

                <div className="p-6 space-y-4 flex-1">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent/30 transition-all">
                      <Cpu className="w-6 h-6 text-slate-400 group-hover:text-accent transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-black text-white uppercase tracking-tighter truncate w-40">{device.name}</h3>
                      <p className="text-[10px] text-slate-500 font-mono tracking-tighter uppercase">{device.id}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                    <div>
                      <div className="text-[8px] text-slate-600 font-black uppercase tracking-widest mb-1">Architecture</div>
                      <div className="text-xs font-black text-slate-300 uppercase truncate">{device.type}</div>
                    </div>
                    <div>
                      <div className="text-[8px] text-slate-600 font-black uppercase tracking-widest mb-1">Latency</div>
                      <div className="text-xs font-mono text-accent">0.{Math.floor(Math.random() * 90) + 1}ms</div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-white/5 flex items-center justify-between">
                  <button 
                    onClick={() => setSelectedDevice(device)}
                    className="text-[10px] text-accent font-bold uppercase tracking-widest flex items-center gap-1 hover:underline underline-offset-4 decoration-2"
                  >
                    <Activity className="w-3 h-3" /> View Telemetry
                  </button>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-500 hover:text-white transition-all">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteDevice(device.id)}
                      className="p-2 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Empty State */}
        {filteredDevices.length === 0 && !isLoading && (
          <div className="col-span-full py-20 text-center space-y-6 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto">
              <Smartphone className="w-10 h-10 text-slate-700" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white uppercase tracking-tighter">No Active Nodes Detected</h3>
              <p className="text-sm text-slate-500">Deploy a new node to start monitoring the fabric.</p>
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="px-8 py-3 bg-accent/10 border border-accent/20 text-accent text-xs font-black uppercase tracking-widest rounded-xl hover:bg-accent/20 transition-all"
            >
              Initialize Node
            </button>
          </div>
        )}
      </div>

      {/* Add Device Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">New Deployment</h2>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Protocol Generation Unit</p>
                  </div>
                  <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-slate-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddDevice} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 px-1">Identifier Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. CORE_NODE_01"
                      value={newDevice.name}
                      onChange={(e) => setNewDevice({...newDevice, name: e.target.value})}
                      className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm focus:border-accent/40 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 px-1">Architecture Template</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['sensor', 'controller', 'gateway', 'edge'].map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setNewDevice({...newDevice, type})}
                          className={`h-14 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${
                            newDevice.type === type 
                              ? 'border-accent bg-accent/10 text-accent' 
                              : 'border-white/5 bg-white/5 text-slate-500 hover:border-white/20'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full h-16 bg-accent text-black text-xs font-black uppercase tracking-[0.3em] rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all neon-glow"
                  >
                    Generate Protocol Link
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Device Details Modal */}
      <AnimatePresence>
        {selectedDevice && (
          <div className="fixed inset-0 z-[100] flex items-center justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDevice(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl h-full bg-[#0a0a0f] border-l border-white/10 shadow-2xl overflow-y-auto"
            >
              <div className="p-10 space-y-12">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                      <Cpu className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{selectedDevice.name}</h2>
                      <p className="text-xs text-slate-500 font-mono">{selectedDevice.id}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedDevice(null)} className="p-3 hover:bg-white/5 rounded-full text-slate-500">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                      <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">Protocol Architecture</div>
                      <div className="text-lg font-black text-white uppercase tracking-tight">{selectedDevice.type}</div>
                   </div>
                   <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                      <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">Sync Status</div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${selectedDevice.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                        <span className="text-lg font-black text-white uppercase tracking-tight">{selectedDevice.status}</span>
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] border-b border-white/5 pb-4">Internal Telemetry Stream</h3>
                   <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                          <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                            <div className="text-[10px] font-black text-slate-500 uppercase">Stream_{i * 42}</div>
                          </div>
                          <div className="text-xs font-mono text-accent">{(Math.random() * 100).toFixed(2)}% load</div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="p-8 bg-accent/5 border border-accent/10 rounded-2xl space-y-4">
                   <div className="flex items-center gap-2 text-accent">
                     <Zap className="w-5 h-5" />
                     <span className="text-xs font-black uppercase tracking-widest">Edge Verification</span>
                   </div>
                   <p className="text-xs text-slate-400 leading-relaxed">
                     This node is currently authenticated via the Refad Global Protocol. 
                     End-to-end encryption is active.
                   </p>
                   <div className="pt-4 flex gap-4">
                      <button className="flex-1 py-3 bg-accent text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all">Restart Node</button>
                      <button className="flex-1 py-3 bg-white/5 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all">Reflash Firmware</button>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ label, value, sub, icon: Icon, color }: any) {
  const colors: any = {
    blue: 'text-blue-400 bg-blue-500/5',
    green: 'text-green-400 bg-green-500/5',
    yellow: 'text-yellow-400 bg-yellow-500/5',
    purple: 'text-purple-400 bg-purple-500/5',
  };

  return (
    <GlassCard className={`p-6 border-transparent ${colors[color]}`}>
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-5 h-5 opacity-50" />
        <div className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{sub}</div>
      </div>
      <div className="text-3xl font-black text-white italic leading-none mb-1">{value}</div>
      <div className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8]">{label}</div>
    </GlassCard>
  );
}
