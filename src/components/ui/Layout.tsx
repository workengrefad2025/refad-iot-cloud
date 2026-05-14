import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, 
  X, 
  Bell, 
  Search, 
  User,
  LogOut,
  ChevronRight,
  Zap
} from "lucide-react";
import { NAVIGATION_ITEMS, MOCK_USER } from "@/src/constants";

interface LayoutProps {
  children: ReactNode;
  activeId: string;
  onNavigate: (id: string) => void;
  onLogout?: () => void;
}

export default function Layout({ children, activeId, onNavigate, onLogout }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-bg-core overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 264 : 80 }}
        className="h-full bg-[#070b14] border-r border-white/10 flex flex-col z-50 overflow-hidden"
      >
        <div className="p-6 border-b border-white/10 flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-purple-primary rounded-xl flex items-center justify-center font-black text-black shrink-0 neon-glow">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="text-sm font-black tracking-tighter uppercase whitespace-nowrap text-white leading-tight">
                Refad <span className="text-accent underline decoration-accent/30">IoT</span>
              </span>
              <span className="text-[8px] text-slate-500 font-bold uppercase tracking-[0.2em]">SaaS OS v4.2</span>
            </motion.div>
          )}
        </div>

        <nav className="flex-1 py-6 space-y-1 overflow-y-auto scroll-hide">
          <div className={`px-6 mb-4 text-[10px] uppercase tracking-[0.4em] text-slate-600 font-black ${!isSidebarOpen && 'sr-only'}`}>
            Main Terminal
          </div>
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center px-6 py-3 transition-all duration-300 group ${
                activeId === item.id 
                  ? "bg-accent/10 text-accent border-r-2 border-accent" 
                  : "text-slate-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className={`w-4 h-4 mr-3 transition-transform group-hover:scale-110 ${activeId === item.id ? "text-accent" : ""}`} />
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] font-black uppercase tracking-widest"
                >
                  {item.label}
                </motion.span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10 bg-black/20 flex flex-col gap-4">
          {isSidebarOpen ? (
            <>
              <div className="space-y-1 px-2">
                <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Designed By</div>
                <div className="text-[11px] font-black text-white uppercase truncate flex items-center gap-2">
                  Refad Saeed <div className="w-1 h-1 rounded-full bg-accent animate-ping" />
                </div>
              </div>
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl transition-all font-black text-[10px] uppercase tracking-[0.2em]"
              >
                <LogOut className="w-4 h-4" />
                <span>Terminate Session</span>
              </button>
            </>
          ) : (
            <button 
              onClick={onLogout}
              className="w-10 h-10 mx-auto bg-red-500/10 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-500/20 transition-all"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden grid-bg">
        {/* Header */}
        <header className="h-16 border-b border-white/10 bg-[#070b14]/80 backdrop-blur-md flex items-center px-8 justify-between z-40">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search telemetry node..." 
                className="w-full bg-slate-900/50 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-accent/40 transition-all font-light"
              />
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
              <span className="status-dot bg-green-500 animate-pulse"></span> MQTT Broker Online
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Broker Latency</p>
              <p className="text-sm font-mono text-accent">0.042 ms</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="w-10 h-10 rounded-full border border-white/10 bg-slate-800 flex items-center justify-center">
              <User className="text-slate-400 w-5 h-5" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative scroll-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="pb-24"
            >
              {children}
            </motion.div>
          </AnimatePresence>

          {/* Footer Branding */}
          <footer className="absolute bottom-0 left-0 right-0 p-8 flex items-center justify-between border-t border-white/5 bg-bg-core/80 backdrop-blur-md z-30">
            <div className="flex items-center gap-4">
               <div className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black">Refad IoT Platform © 2026</div>
               <div className="h-3 w-px bg-white/10" />
               <div className="text-[10px] text-accent font-black uppercase tracking-widest">Designed by Refad Saeed</div>
            </div>
            <div className="flex gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-purple-primary" />
              <div className="w-1.5 h-1.5 rounded-full bg-pink-accent" />
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
