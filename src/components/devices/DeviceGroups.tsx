import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Layers, 
  Plus, 
  Smartphone, 
  Send, 
  Settings, 
  Trash2, 
  MoreVertical,
  CheckCircle2,
  XCircle,
  Activity,
  Zap
} from "lucide-react";
import GlassCard from "@/src/components/ui/GlassCard";

export default function DeviceGroups() {
  const [activeGroup, setActiveGroup] = useState<any | null>(null);
  const [groups, setGroups] = useState<any[]>([]);
  const [groupDevices, setGroupDevices] = useState<any[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [isSendingCommand, setIsSendingCommand] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (activeGroup) {
      fetchMembers(activeGroup.id);
    }
  }, [activeGroup]);

  const fetchGroups = async () => {
    try {
      const res = await fetch('/api/groups');
      const data = await res.json();
      setGroups(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchMembers = async (groupId: string) => {
    try {
      const res = await fetch(`/api/groups/${groupId}/members`);
      const data = await res.json();
      setGroupDevices(data);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleDeviceSelection = (id: string) => {
    setSelectedDevices(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkCommand = async (command: string) => {
    if (selectedDevices.length === 0) return;
    setIsSendingCommand(true);
    
    try {
      await Promise.all(selectedDevices.map(id => 
        fetch('/api/command', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ device_id: id, command })
        })
      ));
      setIsSendingCommand(false);
      setSelectedDevices([]);
    } catch (e) {
      setIsSendingCommand(false);
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1 uppercase tracking-tight">Device Orchestration</h1>
          <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Scale Operations <ChevronRightIcon className="w-3 h-3 inline" /> Group Management</p>
        </div>
        <button className="flex items-center gap-2 bg-pink-accent hover:opacity-90 text-white px-5 py-2.5 rounded-lg transition-all font-bold text-xs uppercase tracking-widest neon-glow-pink">
          <Plus className="w-4 h-4" />
          <span>Create Cluster</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Groups List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">Fleet Clusters</h2>
            <span className="text-[10px] text-accent font-mono uppercase">{groups.length} Active</span>
          </div>
          
          {groups.map((group) => (
            <div key={group.id}>
              <GlassCard
                onClick={() => setActiveGroup(group)}
              className={`p-4 transition-all cursor-pointer border-l-2 ${
                activeGroup?.id === group.id ? "border-accent bg-accent/5" : "border-transparent"
              }`}
              hover
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center text-accent">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight">{group.name}</h3>
                    <p className="text-[10px] text-slate-500 truncate w-40">{group.description}</p>
                  </div>
                </div>
                <ChevronRightIcon className={`w-3 h-3 text-slate-600 transition-transform ${activeGroup?.id === group.id ? "rotate-90" : ""}`} />
              </div>
            </GlassCard>
            </div>
          ))}
        </div>

        {/* Right Column: Group Details & Devices */}
        <div className="lg:col-span-8 space-y-6">
          {activeGroup ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              key={activeGroup.id}
              className="space-y-6"
            >
              {/* Group Hero */}
              <GlassCard className="relative overflow-hidden border-l-4 border-l-pink-accent">
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-accent/5 blur-3xl -z-10 rounded-full" />
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-white uppercase tracking-tight">{activeGroup.name}</h2>
                      <span className="px-2 py-0.5 bg-accent/20 text-accent text-[9px] font-bold uppercase tracking-widest rounded border border-accent/20">
                        {groupDevices.length} Nodes
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 max-w-lg">{activeGroup.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-500 border border-white/5 transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-slate-500 border border-white/5 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bulk Actions Bar */}
                <div className="mt-8 flex items-center gap-4 pt-6 border-t border-white/5 overflow-x-auto scroll-hide">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Broadcast:</div>
                  <button 
                    disabled={selectedDevices.length === 0 || isSendingCommand}
                    onClick={() => handleBulkCommand("REBOOT")}
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#f8fafc] hover:bg-white/10 disabled:opacity-50 transition-all whitespace-nowrap"
                  >
                    <Zap className="w-3 h-3 text-yellow-400" />
                    Reboot
                  </button>
                  <button 
                    disabled={selectedDevices.length === 0 || isSendingCommand}
                    onClick={() => handleBulkCommand("UPDATE_FW")}
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#f8fafc] hover:bg-white/10 disabled:opacity-50 transition-all whitespace-nowrap"
                  >
                    <Activity className="w-3 h-3 text-accent" />
                    OTA Push
                  </button>
                </div>
              </GlassCard>

              {/* Devices Table/Grid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-blue-400" />
                    <span>Devices in Group</span>
                  </h3>
                  <div className="flex items-center gap-4 text-xs">
                    <button 
                      onClick={() => setSelectedDevices(groupDevices.map(d => d.id))}
                      className="text-blue-400 hover:underline"
                    >
                      Select All
                    </button>
                    <button 
                      onClick={() => setSelectedDevices([])}
                      className="text-slate-500 hover:underline"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupDevices.map((device) => (
                    <div key={device.id}>
                      <GlassCard 
                        className={`p-4 transition-all ${
                          selectedDevices.includes(device.id) ? "border-blue-500 bg-blue-500/5" : ""
                        }`}
                        hover
                        onClick={() => toggleDeviceSelection(device.id)}
                      >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            device.status === 'online' ? 'bg-green-500/10 text-green-400' : 'bg-slate-500/10 text-slate-400'
                          }`}>
                            <Smartphone className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-white">{device.name}</span>
                              {device.status === 'online' ? (
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              ) : (
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono mt-1">{device.id} • {device.type}</div>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded border ${
                          selectedDevices.includes(device.id) 
                            ? "bg-blue-500 border-blue-500 flex items-center justify-center" 
                            : "border-white/20"
                        }`}>
                          {selectedDevices.includes(device.id) && <Plus className="w-3 h-3 text-white rotate-45" />}
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <div className="text-[10px] text-slate-500 uppercase">Status</div>
                          <div className="text-xs font-mono text-white">{device.status}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[10px] text-slate-500 uppercase">Type</div>
                          <div className="text-xs font-mono text-white truncate w-16 mx-auto">{device.type}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[10px] text-slate-500 uppercase">RSSI</div>
                          <div className="text-xs font-mono text-white">-64 dBm</div>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                ))}
                  
                  {groupDevices.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-500 italic bg-white/5 rounded-2xl border border-dashed border-white/10">
                      No devices assigned to this group yet.
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
              <div className="p-4 bg-white/5 rounded-full">
                <Layers className="w-12 h-12 text-slate-600" />
              </div>
              <div className="max-w-xs space-y-2">
                <h3 className="text-lg font-semibold text-white">Select a Group</h3>
                <p className="text-slate-500">Pick a group from the list on the left to view members and perform bulk management.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
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
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
