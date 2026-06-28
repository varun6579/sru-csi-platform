import dynamic from 'next/dynamic';

// Lazy loading the Leaderboard component to reduce initial bundle size
const Leaderboard = dynamic(() => import('@/components/Leaderboard'), {
  loading: () => (
    <div className="w-full max-w-4xl mx-auto p-6 flex flex-col gap-4 animate-pulse">
      <div className="h-10 bg-slate-800 rounded-lg w-full mb-4"></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 bg-slate-800 rounded-xl w-full"></div>
      ))}
    </div>
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute top-0 z-0 h-[40rem] w-full bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen -translate-y-1/2"></div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            SRU CSI Platform V1.0 Live
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Code. Compete. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Conquer.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Join 500+ concurrent developers on the ultimate coding platform. 
            Solve algorithms, climb the real-time leaderboard, and prove your skills.
          </p>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="container mx-auto px-4 pb-24 relative z-10">
        <Leaderboard />
      </section>
    </main>
  );
}
