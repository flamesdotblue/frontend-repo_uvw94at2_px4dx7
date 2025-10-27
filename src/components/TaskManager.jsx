import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, CheckCircle2, Filter } from 'lucide-react';

const PLATFORMS = ['YouTube', 'Webtoon', 'Instagram'];
const STATUS = ['Pending', 'Completed'];

export default function TaskManager({ tasks, onAdd, onUpdate, onDelete, onToggle }) {
  const [draft, setDraft] = useState({ title: '', platform: 'YouTube', dueDate: new Date().toISOString().slice(0,10), status: 'Pending', notes: '' });
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState({ platform: 'All', date: '' });

  const filtered = useMemo(() => {
    return tasks.filter(t => {
      const platformOk = filter.platform === 'All' || t.platform === filter.platform;
      const dateOk = !filter.date || t.dueDate === filter.date;
      return platformOk && dateOk;
    });
  }, [tasks, filter]);

  const startEdit = (t) => {
    setEditingId(t.id);
    setDraft({ title: t.title, platform: t.platform, dueDate: t.dueDate, status: t.status, notes: t.notes || '' });
  };

  const clearForm = () => {
    setEditingId(null);
    setDraft({ title: '', platform: 'YouTube', dueDate: new Date().toISOString().slice(0,10), status: 'Pending', notes: '' });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!draft.title.trim()) return;
    if (editingId) {
      onUpdate(editingId, draft);
    } else {
      onAdd(draft);
    }
    clearForm();
  };

  return (
    <section id="tasks" className="relative py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-semibold text-white">Tasks</h2>
            <div className="flex items-center gap-2 text-white/80">
              <Filter size={18} />
              <select value={filter.platform} onChange={(e)=>setFilter(f=>({...f, platform: e.target.value}))} className="bg-white/5 border border-white/10 rounded-md px-2 py-1">
                <option>All</option>
                {PLATFORMS.map(p => <option key={p}>{p}</option>)}
              </select>
              <input type="date" value={filter.date} onChange={(e)=>setFilter(f=>({...f, date: e.target.value}))} className="bg-white/5 border border-white/10 rounded-md px-2 py-1" />
            </div>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map(t => (
                <motion.div key={t.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className={`p-4 rounded-xl border ${t.status==='Completed'?'border-[var(--accent)]/50':'border-white/10'} bg-white/5 backdrop-blur flex items-start gap-3`}>
                  <button onClick={()=>onToggle(t.id)} className="mt-1">
                    <CheckCircle2 className={`${t.status==='Completed'?'text-[var(--accent)]':'text-white/40'}`} />
                  </button>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-white ${t.status==='Completed'?'line-through text-white/60':''}`}>{t.title}</span>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-[var(--accent)]/20 text-[var(--accent)]">{t.platform}</span>
                      <span className="text-xs text-white/60">Due: {t.dueDate}</span>
                    </div>
                    {t.notes && <div className="text-sm text-white/70 mt-1">{t.notes}</div>}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={()=>startEdit(t)} className="px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-white/80"><Edit2 size={16} /></button>
                    <button onClick={()=>onDelete(t.id)} className="px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-rose-300"><Trash2 size={16} /></button>
                  </div>
                </motion.div>
              ))}
              {filtered.length === 0 && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-white/60">No tasks match your filter.</motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-white mb-3">{editingId ? 'Edit Task' : 'New Task'}</h3>
          <form onSubmit={submit} className="space-y-3">
            <input value={draft.title} onChange={(e)=>setDraft(d=>({...d, title: e.target.value}))} placeholder="Task title" className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white placeholder-white/40" />
            <div className="grid grid-cols-2 gap-2">
              <select value={draft.platform} onChange={(e)=>setDraft(d=>({...d, platform: e.target.value}))} className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white">
                {PLATFORMS.map(p => <option key={p}>{p}</option>)}
              </select>
              <input type="date" value={draft.dueDate} onChange={(e)=>setDraft(d=>({...d, dueDate: e.target.value}))} className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white" />
            </div>
            <select value={draft.status} onChange={(e)=>setDraft(d=>({...d, status: e.target.value}))} className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white">
              {STATUS.map(s => <option key={s}>{s}</option>)}
            </select>
            <textarea value={draft.notes} onChange={(e)=>setDraft(d=>({...d, notes: e.target.value}))} placeholder="Notes" rows={4} className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white placeholder-white/40" />
            <div className="flex gap-2">
              <button type="submit" className="flex-1 px-4 py-2 rounded-lg bg-[var(--accent)] text-black font-medium shadow-[0_0_25px_var(--accent)]/40">{editingId ? 'Save' : 'Add Task'}</button>
              {editingId && (
                <button type="button" onClick={clearForm} className="px-4 py-2 rounded-lg border border-white/10 text-white/80 hover:bg-white/10">Cancel</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
