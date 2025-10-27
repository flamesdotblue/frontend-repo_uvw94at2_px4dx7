import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section id="home" className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/70 pointer-events-none" />
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white drop-shadow-lg">
            Keep Creating. Keep Growing.
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Your daily creative command center for YouTube, Webtoon, and Instagram.
          </p>
          <div className="mt-8 inline-flex gap-4">
            <a href="#dashboard" className="px-6 py-3 rounded-xl bg-[var(--accent)]/90 hover:bg-[var(--accent)] text-black font-medium shadow-[0_0_30px_var(--accent)]/40 transition-colors">
              Go to Dashboard
            </a>
            <a href="#tasks" className="px-6 py-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur hover:bg-white/10 text-white font-medium transition-colors">
              Manage Tasks
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
