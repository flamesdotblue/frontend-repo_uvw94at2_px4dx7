export default function Settings({ theme, setTheme, animations, setAnimations, sounds, setSounds }) {
  return (
    <section id="settings" className="relative py-16 px-6">
      <div className="max-w-4xl mx-auto p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <h2 className="text-3xl font-semibold text-white mb-6">Settings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <div className="text-white/70 mb-2">Theme</div>
            <select value={theme} onChange={(e)=>setTheme(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white">
              <option value="neon">Neon Blue</option>
              <option value="cyber">Cyber Purple</option>
              <option value="retro">Retro Pink</option>
            </select>
          </div>
          <div>
            <div className="text-white/70 mb-2">Animations</div>
            <select value={animations ? 'on':'off'} onChange={(e)=>setAnimations(e.target.value==='on')} className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white">
              <option value="on">On</option>
              <option value="off">Off</option>
            </select>
          </div>
          <div>
            <div className="text-white/70 mb-2">Sounds</div>
            <select value={sounds ? 'on':'off'} onChange={(e)=>setSounds(e.target.value==='on')} className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white">
              <option value="on">On</option>
              <option value="off">Off</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
