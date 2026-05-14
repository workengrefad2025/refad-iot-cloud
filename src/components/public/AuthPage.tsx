import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Github, 
  Chrome,
  Eye,
  EyeOff,
  ChevronLeft
} from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { supabase } from '@/src/lib/supabaseClient';

export default function AuthPage({ onBack, onSuccess }: { onBack: () => void, onSuccess: () => void }) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      if (mode === 'signin') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setMessage(error.message);
        } else if (data.session) {
          onSuccess();
        }
      }

      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: displayName },
          },
        });

        if (error) {
          setMessage(error.message);
        } else {
          setMessage('Check your inbox for a confirmation email.');
        }
      }

      if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });

        if (error) {
          setMessage(error.message);
        } else {
          setMessage('Password reset instructions have been sent to your email.');
        }
      }
    } catch (error: any) {
      setMessage(error?.message || 'Authentication failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-primary/10 blur-[120px] rounded-full" />
      </div>

      <nav className="p-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Nexus
        </button>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6 pb-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-purple-primary items-center justify-center neon-glow mx-auto mb-6">
              <Zap className="w-8 h-8 text-black fill-current" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
              {mode === 'signin' && 'Welcome Back Agent'}
              {mode === 'signup' && 'Register For Deployment'}
              {mode === 'forgot' && 'Reset Secure Access'}
            </h2>
            <p className="text-slate-500 text-xs uppercase tracking-widest font-black">
              {mode === 'signin' && 'Enter encrypted credentials'}
              {mode === 'signup' && 'Create your neural profile'}
              {mode === 'forgot' && 'Identity verification required'}
            </p>
          </div>

          <GlassCard className="p-10 border-white/5 relative overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.form 
                key={mode}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                {mode === 'signup' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 px-1">Commanding Officer</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                      <input 
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        type="text" 
                        placeholder="Refad Saeed"
                        className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-12 text-sm focus:border-accent/50 focus:ring-1 focus:ring-accent/20 outline-none transition-all placeholder:text-slate-800"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 px-1">Secure Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                    <input 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email" 
                      placeholder="agent@nexus.io"
                      className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-12 text-sm focus:border-accent/50 focus:ring-1 focus:ring-accent/20 outline-none transition-all placeholder:text-slate-800"
                    />
                  </div>
                </div>

                {mode !== 'forgot' && (
                  <div className="space-y-2">
                    <div className="flex justify-between px-1">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Access Keyword</label>
                      {mode === 'signin' && (
                        <button 
                          type="button"
                          onClick={() => setMode('forgot')}
                          className="text-[10px] font-black uppercase tracking-widest text-accent/60 hover:text-accent"
                        >
                          Recover?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                      <input 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="••••••••••••"
                        className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-12 text-sm focus:border-accent/50 focus:ring-1 focus:ring-accent/20 outline-none transition-all placeholder:text-slate-800"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {message && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-[12px] text-slate-200">
                    {message}
                  </div>
                )}

                <button 
                  disabled={isLoading}
                  type="submit"
                  className="w-full h-14 bg-accent text-black text-xs font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 neon-glow"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      {mode === 'signin' && 'Authenticate Access'}
                      {mode === 'signup' && 'Initialize Profile'}
                      {mode === 'forgot' && 'Send Recovery Data'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            </AnimatePresence>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/5" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">Quick Sync</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => handleOAuth('google')}
                className="flex items-center justify-center gap-3 h-12 bg-white/5 border border-white/5 rounded-xl text-xs font-bold hover:bg-white/10 transition-all"
              >
                <Chrome className="w-4 h-4" /> Google
              </button>
              <button 
                type="button"
                onClick={() => handleOAuth('github')}
                className="flex items-center justify-center gap-3 h-12 bg-white/5 border border-white/5 rounded-xl text-xs font-bold hover:bg-white/10 transition-all"
              >
                <Github className="w-4 h-4" /> Github
              </button>
            </div>
          </GlassCard>

          <div className="mt-8 text-center">
            {mode === 'signin' ? (
              <p className="text-xs text-slate-500 font-bold">
                New to the platform?{' '}
                <button 
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-accent hover:underline decoration-2 underline-offset-4"
                >
                  Create Deployment
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-500 font-bold">
                Existing operative?{' '}
                <button 
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-accent hover:underline decoration-2 underline-offset-4"
                >
                  Secure Log-in
                </button>
              </p>
            )}
          </div>
        </div>
      </main>
      
      <footer className="p-8 text-center text-[8px] font-black uppercase tracking-[0.4em] text-slate-800">
        Nexus Protocol Active • Refad IoT Security Verification System
      </footer>
    </div>
  );
}
