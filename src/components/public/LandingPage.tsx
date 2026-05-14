import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Shield, 
  Cpu, 
  Globe, 
  BarChart3, 
  Smartphone, 
  ArrowRight, 
  Check,
  Facebook,
  Twitter,
  Linkedin,
  Github
} from 'lucide-react';
import GlassCard from '../ui/GlassCard';

export default function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-accent/30 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050508]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-purple-primary flex items-center justify-center neon-glow">
              <Zap className="w-6 h-6 text-black fill-current" />
            </div>
            <span className="text-xl font-black uppercase tracking-tighter italic">Refad <span className="text-accent underline decoration-accent/30">IoT</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Architecture', 'Pricing', 'Docs'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">{item}</a>
            ))}
          </div>

          <button 
            onClick={onStart}
            className="px-6 py-2.5 bg-white text-black text-xs font-black uppercase tracking-widest rounded-lg hover:bg-accent transition-all flex items-center gap-2"
          >
            Terminal Access <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-accent/5 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">v4.2 Alpha Release Live</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9]"
          >
            Next Generation <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-primary to-pink-accent">IoT Orchestration</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg text-slate-400 mb-12"
          >
            Connect everything. Monitor anything. Automate enterprise-grade workflows with a premium cloud dashboard built for real-time decision making.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-10 py-5 bg-accent text-black text-sm font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all neon-glow"
            >
              Get Started Free
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white text-sm font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all">
              Platform Demo
            </button>
          </motion.div>
        </div>

        {/* Dashboard Preview Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-6xl mx-auto px-6 mt-32 relative"
        >
          <div className="relative p-1 rounded-2xl bg-gradient-to-b from-white/20 to-transparent">
            <div className="bg-[#0a0a10] rounded-xl overflow-hidden border border-white/5 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070" 
                alt="Dashboard Preview" 
                className="w-full opacity-40 grayscale group-hover:grayscale-0 transition-all"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a10] via-transparent to-transparent" />
              
              {/* Floating Overlay Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center p-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i}>
                      <GlassCard className="aspect-square flex flex-col items-center justify-center gap-4 bg-white/5">
                        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                          <Zap className="w-6 h-6 animate-pulse" />
                        </div>
                        <div className="h-2 w-16 bg-white/10 rounded-full" />
                        <div className="h-1.5 w-10 bg-white/5 rounded-full" />
                      </GlassCard>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 space-y-4">
             <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Core Capabilities</h2>
             <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight">The Ecosystem <br /> for Modern Hardware</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Globe}
              title="Global Fabric"
              desc="Connect devices anywhere in the world with sub-100ms latency via our distributed MQTT broker network."
              color="blue"
            />
            <FeatureCard 
              icon={Shield}
              title="Nexus Security"
              desc="Military-grade encryption and individual device identity tokens ensure your data remains your data."
              color="purple"
            />
            <FeatureCard 
              icon={BarChart3}
              title="Real-time Viz"
              desc="Beautiful, performant visualizations that scale from one sensor track to millions of data points."
              color="pink"
            />
            <FeatureCard 
              icon={Cpu}
              title="Logic Engine"
              desc="Deploy serverless automation rules that react to environmental changes in real-time."
              color="accent"
            />
            <FeatureCard 
              icon={Smartphone}
              title="Mobile First"
              desc="A fully responsive interface designed for pocket-sized management without compromise."
              color="cyan"
            />
            <FeatureCard 
              icon={Zap}
              title="Speed Injected"
              desc="Built on a high-concurrency runtime that processes millions of messages per second."
              color="accent"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
             <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-primary">Monetized Scale</h2>
             <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Choose Your Impact</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard 
              tier="Developer"
              price="0"
              features={['Up to 5 Devices', '24h History', 'Standard Logic', 'Community Support']}
              buttonText="Start Free"
              onStart={onStart}
            />
            <PricingCard 
              tier="Pro"
              price="49"
              features={['Unlimited Devices', '30d History', 'Advanced Rules', 'Priority Support', 'Custom Branding']}
              highlighted
              buttonText="Go Pro"
              onStart={onStart}
            />
            <PricingCard 
              tier="Enterprise"
              price="Custom"
              features={['Air-gapped Deployment', 'Infinite History', 'White-label SDK', '24/7 Dedicated Support']}
              buttonText="Contact Sales"
              onStart={onStart}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-[#030305]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center neon-glow">
                  <Zap className="w-5 h-5 text-black fill-current" />
                </div>
                <span className="text-lg font-black uppercase tracking-tighter italic">Refad <span className="text-accent underline decoration-accent/30">IoT</span></span>
              </div>
              <p className="text-slate-500 text-sm max-w-sm">
                Redefining building automation and industrial monitoring 
                through decentralized edge architecture. Designed by Refad Saeed.
              </p>
              <div className="flex gap-4">
                {[Twitter, Linkedin, Github, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-accent hover:bg-accent/10 transition-all">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-white">Platform</h4>
              <ul className="space-y-3">
                {['Network Status', 'Integrations', 'Documentation', 'API Reference'].map(item => (
                  <li key={item}><a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-white">Company</h4>
              <ul className="space-y-3">
                {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map(item => (
                  <li key={item}><a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
            <div>Refad IoT Platform © 2026 • Distributed Ledger System Active</div>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Security Audit</a>
              <a href="#" className="hover:text-white transition-colors">GDPR Compliant</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, color }: any) {
  const colorMap: any = {
    blue: 'bg-blue-500/10 text-blue-400 hover:border-blue-500/30',
    purple: 'bg-purple-500/10 text-purple-400 hover:border-purple-500/30',
    pink: 'bg-pink-500/10 text-pink-400 hover:border-pink-500/30',
    accent: 'bg-accent/10 text-accent hover:border-accent/30',
    cyan: 'bg-cyan-500/10 text-cyan-400 hover:border-cyan-500/30',
  };

  return (
    <GlassCard className={`p-8 group border-transparent transition-all hover:-translate-y-2 ${colorMap[color]}`}>
      <div className="mb-6 p-4 w-fit rounded-2xl bg-black/40 group-hover:scale-110 transition-transform">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">{title}</h4>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </GlassCard>
  );
}

function PricingCard({ tier, price, features, highlighted, buttonText, onStart }: any) {
  return (
    <GlassCard className={`relative p-10 flex flex-col items-center text-center group transition-all ${highlighted ? 'border-accent/40 bg-accent/5 ring-1 ring-accent/20 scale-105 z-10' : 'hover:border-white/20'}`}>
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-black text-[10px] font-black uppercase tracking-widest neon-glow">
          Most Popular
        </div>
      )}
      <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2">{tier}</div>
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-5xl font-black text-white italic">{price === 'Custom' ? 'Contact' : `$${price}`}</span>
        {price !== 'Custom' && <span className="text-slate-500 font-bold uppercase text-xs">/mo</span>}
      </div>
      
      <ul className="space-y-4 mb-10 w-full">
        {features.map((f: string) => (
          <li key={f} className="flex items-center justify-center gap-2 text-sm text-slate-400">
            <Check className="w-4 h-4 text-accent" /> {f}
          </li>
        ))}
      </ul>

      <button 
        onClick={onStart}
        className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${highlighted ? 'bg-accent text-black hover:opacity-90 neon-glow' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}
      >
        {buttonText}
      </button>
    </GlassCard>
  );
}
