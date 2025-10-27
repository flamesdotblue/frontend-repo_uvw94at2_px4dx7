import { useMemo } from 'react';
import { CheckCircle2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const PLATFORMS = ['YouTube', 'Webtoon', 'Instagram'];

export default function Dashboard({ tasks, onQuickAdd, onToggle }) {
  const today = new Date().toISOString().slice(0, 10);

  const stats = useMemo(() => {
    const base = {};
    PLATFORMS.forEach(p => base[p] = { total: 0, done: 0 });
    for (const t of tasks.filter(t => t.dueDate === today)) {
      base[t.platform].total += 1;
      if (t.status === 'Completed') base[t.platform].done += 1;
    }
    return base;
  }, [tasks, today]);

  return (
    <section id="dashboard" className="relative py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white">Today's Mission</h2>
            <p className="text-white/70">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
          <p className="text-[var(--accent)] font-medium">Keep Creating. Keep Growing.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PLATFORMS.map((p) => {
            const { total, done } = stats[p];
            const progress = total ? Math.round((done / total) * 100) : 0;
            return (
              <motion.div
                key={p}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[var(--accent)]/20 blur-3xl" />
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">{p}</h3>
                  <button
                    onClick={() => onQuickAdd(p)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--accent)]/20 text-[var(--accent)] hover:bg-[var(--accent)]/30"
                  >
                    <Plus size={16} /> Add
                  </button>
                </div>

                <div className="mt-6">
                  <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="mt-2 text-sm text-white/70">{done}/{total} tasks completed</div>
                </div>

                <div className="mt-6 space-y-2">
                  {tasks.filter(t => t.platform === p && t.dueDate === today).slice(0, 3).map(t => (
                    <motion.button
                      key={t.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onToggle(t.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg border bg-white/5 hover:bg-white/10 transition flex items-center gap-2 ${t.status === 'Completed' ? 'border-[var(--accent)]/50' : 'border-white/10'}`}
                    >
                      <CheckCircle2 className={`${t.status === 'Completed' ? 'text-[var(--accent)]' : 'text-white/40'}`} size={18} />
                      <span className={`${t.status === 'Completed' ? 'line-through text-white/60' : 'text-white'}`}>{t.title}</span>
                    </motion.button>
                  ))}
                  {total === 0 && (
                    <div className="text-white/60 text-sm">No tasks for today yet. Add one!</div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
