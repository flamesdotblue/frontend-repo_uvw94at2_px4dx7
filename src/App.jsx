import { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import TaskManager from './components/TaskManager';
import Analytics from './components/Analytics';
import Settings from './components/Settings';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);
  return [value, setValue];
}

export default function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'neon');
  const [animations, setAnimations] = useLocalStorage('animations', true);
  const [sounds, setSounds] = useLocalStorage('sounds', true);
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  // Accent colors per theme
  const accent = useMemo(() => ({
    neon: '#60a5fa', // blue-400
    cyber: '#a78bfa', // violet-400
    retro: '#f472b6', // pink-400
  })[theme] || '#60a5fa', [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
    document.body.classList.add('bg-gradient-to-br','from-[#0a0014]','to-[#001027]');
  }, [accent]);

  // Simple web-audio sounds
  const audioCtxRef = useRef(null);
  const ensureAudio = () => {
    if (!sounds) return null;
    if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtxRef.current;
  };
  const play = (freq = 600, dur = 0.06, type = 'sine') => {
    const ctx = ensureAudio();
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.value = 0.08; o.connect(g); g.connect(ctx.destination);
    o.start(); setTimeout(()=>{ o.stop(); }, dur*1000);
  };

  // Task helpers
  const addTask = (data) => {
    const id = crypto.randomUUID();
    const t = { id, ...data };
    setTasks(prev => [t, ...prev]);
    play(760, 0.07, 'triangle');
  };
  const updateTask = (id, patch) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t));
    play(520, 0.05);
  };
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    play(280, 0.05, 'square');
  };
  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' } : t));
    play(880, 0.08, 'sawtooth');
  };
  const quickAdd = (platform) => {
    const today = new Date().toISOString().slice(0,10);
    addTask({ title: `Upload on ${platform}`, platform, dueDate: today, status: 'Pending', notes: '' });
  };

  return (
    <div className="min-h-screen text-white selection:bg-[var(--accent)]/30 selection:text-white">
      <div className="fixed inset-0 -z-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b1a] via-[#0a0a22] to-[#070714]" />
        <div className="absolute -top-32 right-0 w-[60vw] h-[60vw] rounded-full bg-[var(--accent)]/10 blur-[120px]" />
        <div className="absolute top-1/2 -left-20 w-[40vw] h-[40vw] rounded-full bg-[var(--accent)]/10 blur-[120px]" />
      </div>

      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <Dashboard tasks={tasks} onQuickAdd={quickAdd} onToggle={toggleTask} />
      <TaskManager tasks={tasks} onAdd={addTask} onUpdate={updateTask} onDelete={deleteTask} onToggle={toggleTask} />
      <Analytics tasks={tasks} />
      <Settings theme={theme} setTheme={setTheme} animations={animations} setAnimations={setAnimations} sounds={sounds} setSounds={setSounds} />

      <footer className="py-10 text-center text-white/50">
        Built for creators — stay consistent and shine.
      </footer>
    </div>
  );
}
