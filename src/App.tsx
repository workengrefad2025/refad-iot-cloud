/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Layout from "./components/ui/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import DeviceGroups from "./components/devices/DeviceGroups";
import DeviceManager from "./components/devices/DeviceManager";
import RulesEngine from "./components/dashboard/RulesEngine";
import IntegrationGuide from "./components/dashboard/IntegrationGuide";
import GlassCard from "./components/ui/GlassCard";
import LandingPage from "./components/public/LandingPage";
import AuthPage from "./components/public/AuthPage";
import { supabase } from "@/src/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import { Info } from "lucide-react";

type AppMode = 'landing' | 'auth' | 'app';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [mode, setMode] = useState<AppMode>('landing');
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const initSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setMode(data.session ? 'app' : 'landing');
    };

    initSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setMode(session ? 'app' : 'landing');
    });

    return () => authListener.subscription?.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setMode('landing');
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "devices":
        return <DeviceManager />;
      case "groups":
        return <DeviceGroups />;
      case "rules":
        return <RulesEngine />;
      case "telemetry":
      case "settings":
      case "users":
        return <IntegrationGuide />;
      default:
        return <Dashboard />;
    }
  };

  if (mode === 'landing') {
    return <LandingPage onStart={() => setMode('auth')} />;
  }

  if (mode === 'auth') {
    return <AuthPage onBack={() => setMode('landing')} onSuccess={() => setMode('app')} />;
  }

  if (!session) {
    return null;
  }

  return (
    <Layout activeId={activeTab} onNavigate={setActiveTab} onLogout={handleLogout}>
      <div className="max-w-[1400px] mx-auto pb-20">
        {renderContent()}

        {/* Global System Status Toast */}
        <div className="fixed bottom-24 right-8 z-50">
          <GlassCard className="!p-3 flex items-center gap-3 bg-blue-600/10 border-blue-500/20 backdrop-blur-md neon-glow-blue group cursor-help">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white group-hover:animate-spin">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black text-white uppercase tracking-widest">Global Fabric</div>
              <div className="text-[10px] text-blue-400 font-mono">v4.2.0 • NODE_ALPHA • ONLINE</div>
            </div>
          </GlassCard>
        </div>
      </div>
    </Layout>
  );
}

