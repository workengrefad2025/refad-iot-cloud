import { useState } from "react";
import { 
  Zap, 
  Plus, 
  Bell, 
  Mail, 
  Webhook, 
  Play, 
  Power,
  ChevronRight,
  Settings2,
  Cpu
} from "lucide-react";
import GlassCard from "@/src/components/ui/GlassCard";
import { motion } from "motion/react";

const MOCK_RULES = [
  { 
    id: "rule-1", 
    name: "Overheat Protection", 
    trigger: "Sensor-Alpha Temp > 40°C", 
    action: "Send Email Notification", 
    status: true,
    lastTriggered: "2h ago"
  },
  { 
    id: "rule-2", 
    name: "Night Mode Lighting", 
    trigger: "18:00 PM", 
    action: "Set Group:Office ON", 
    status: false,
    lastTriggered: "Never"
  },
  { 
    id: "rule-3", 
    name: "Motion Security", 
    trigger: "Motion = True", 
    action: "Webhook: Security System", 
    status: true,
    lastTriggered: "15m ago"
  },
];

export default function RulesEngine() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1 uppercase tracking-tight">Automation Engine</h1>
          <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Autonomous Logic <ChevronRight className="w-3 h-3 inline" /> Event Ingestion</p>
        </div>
        <button className="flex items-center gap-2 bg-purple-primary hover:opacity-90 text-white px-5 py-2.5 rounded-lg transition-all font-bold text-xs uppercase tracking-widest neon-glow-purple">
          <Plus className="w-4 h-4" />
          <span>New Logic Pattern</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_RULES.map((rule) => (
          <div key={rule.id}>
            <GlassCard className="relative group overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className={`p-4 rounded-lg bg-surface border border-white/5 ${rule.status ? 'text-purple-primary neon-glow-purple' : 'text-slate-700'}`}>
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">{rule.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 font-bold uppercase tracking-widest">
                      <ClockIcon className="w-3 h-3" /> Trigger: {rule.lastTriggered}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-800" />
                    <span className="text-[10px] text-accent font-mono tracking-tight uppercase">SHA-256 Verified</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 max-w-xl bg-black/20 border border-white/5 rounded-lg p-4 flex items-center gap-4">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  If
                </div>
                <div className="flex-1 font-mono text-xs text-accent/80">{rule.trigger}</div>
                <div className="text-slate-700">
                  <ChevronRight className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  Then
                </div>
                <div className="flex-1 font-mono text-xs text-white/60">{rule.action}</div>
              </div>

              <div className="flex items-center gap-4">
                <button className={`relative w-10 h-5 rounded-full transition-colors ${rule.status ? 'bg-accent' : 'bg-slate-800'}`}>
                  <motion.div 
                    animate={{ x: rule.status ? 20 : 2 }}
                    className={`absolute top-1 left-0 w-3 h-3 rounded-full shadow-lg ${rule.status ? 'bg-black' : 'bg-slate-400'}`}
                  />
                </button>
                <div className="h-10 w-px bg-white/5" />
                <button className="p-2 hover:bg-white/10 rounded-lg text-slate-500 transition-colors">
                  <Settings2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Visual Action Indicator */}
            {rule.action.includes("Email") && <Mail className="absolute -right-2 -bottom-2 w-10 h-10 text-white/5 -rotate-12" />}
            {rule.action.includes("Webhook") && <Webhook className="absolute -right-2 -bottom-2 w-10 h-10 text-white/5 -rotate-12" />}
          </GlassCard>
          </div>
        ))}
      </div>

      <GlassCard className="bg-gradient-to-r from-accent/10 to-transparent border-accent/20">
        <div className="flex flex-col md:flex-row items-center gap-8 py-2">
          <div className="w-16 h-16 bg-accent/5 rounded-lg flex items-center justify-center neon-glow border border-accent/20">
            <Cpu className="w-8 h-8 text-accent" />
          </div>
          <div className="flex-1 space-y-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">Enterprise Edge Cluster</h2>
            <p className="text-xs text-slate-400 font-medium">Logic is synchronized across 1.2M edge nodes with zero-latency execution.</p>
          </div>
          <button className="px-6 py-2.5 bg-accent text-black font-bold text-[10px] rounded-lg hover:opacity-90 transition-all uppercase tracking-widest">
            Sync To Cluster
          </button>
        </div>
      </GlassCard>
    </div>
  );
}

function ClockIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
