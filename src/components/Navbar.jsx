import { useMemo } from 'react';
import { Home, ListChecks, BarChart3, Settings, Rocket } from 'lucide-react';

export default function Navbar({ theme, setTheme }) {
  const items = useMemo(() => ([
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: Rocket },
    { id: 'tasks', label: 'Tasks', icon: ListChecks },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]), []);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full shadow-2xl">
        <nav className="flex items-center gap-2 px-3 py-2">
          {items.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleScroll(id)}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white/80 hover:text-white transition-colors"
            >
              <span className={`w-2 h-2 rounded-full bg-[var(--accent)]/70 group-hover:bg-[var(--accent)]/90 transition-colors`} />
              <Icon size={18} className="opacity-80" />
              <span className="hidden sm:block">{label}</span>
            </button>
          ))}
          <div className="w-px h-6 bg-white/10 mx-1" />
          <select
            aria-label="Theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="bg-transparent text-white/80 hover:text-white text-sm px-2 py-1 rounded-md focus:outline-none"
          >
            <option className="bg-gray-900" value="neon">Neon Blue</option>
            <option className="bg-gray-900" value="cyber">Cyber Purple</option>
            <option className="bg-gray-900" value="retro">Retro Pink</option>
          </select>
        </nav>
      </div>
    </div>
  );
}
