import { useMemo } from 'react';

const PLATFORMS = ['YouTube', 'Webtoon', 'Instagram'];

function CircleStat({ label, value, color }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <svg width="120" height="120" className="-rotate-90">
        <circle cx="60" cy="60" r={radius} stroke="rgba(255,255,255,0.15)" strokeWidth="10" fill="transparent" />
        <circle cx="60" cy="60" r={radius} stroke={color} strokeWidth="10" fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="text-center">
        <div className="text-white text-xl font-semibold">{Math.round(value)}%</div>
        <div className="text-white/70 text-sm">{label}</div>
      </div>
    </div>
  );
}

export default function Analytics({ tasks }) {
  const week = useMemo(() => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - 6);
    const byPlatform = Object.fromEntries(PLATFORMS.map(p => [p, 0]));
    for (const t of tasks) {
      const d = new Date(t.dueDate);
      if (d >= start && d <= now && t.status === 'Completed') {
        byPlatform[t.platform] += 1;
      }
    }
    return byPlatform;
  }, [tasks]);

  const totalMax = Math.max(1, ...Object.values(week));

  const streak = useMemo(() => {
    let s = 0;
    for (let i = 0; i < 30; i++) {
      const day = new Date();
      day.setDate(day.getDate() - i);
      const dayStr = day.toISOString().slice(0, 10);
      const any = tasks.some(t => t.dueDate === dayStr && t.status === 'Completed');
      if (any) s += 1; else break;
    }
    return s;
  }, [tasks]);

  return (
    <section id="analytics" className="relative py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white">Analytics</h2>
          <p className="text-white/70">Weekly uploads and consistency</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PLATFORMS.map((p, i) => (
            <CircleStat key={p} label={p} value={(week[p] / totalMax) * 100} color={['#60a5fa','#a78bfa','#f472b6'][i]} />
          ))}
        </div>

        <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="text-xl text-white">🔥 {streak} Day{streak === 1 ? '' : 's'} Consistent Upload Streak!</div>
          <div className="mt-2 text-white/70 text-sm">Finish at least one task each day to keep your streak alive.</div>
        </div>
      </div>
    </section>
  );
}
