"use client"

export function Hero({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-800">
        <div className="text-2xl font-bold text-white">Elevé</div>
        <div className="flex gap-8 items-center">
          <button className="text-slate-300 hover:text-white transition">Features</button>
          <button className="text-slate-300 hover:text-white transition">Pricing</button>
          <button className="text-slate-300 hover:text-white transition">FAQ</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-8 py-20">
        <div className="max-w-3xl text-center">
          <h1 className="text-6xl font-bold text-white mb-6 text-balance leading-tight">Plan Your Perfect Event</h1>
          <p className="text-xl text-slate-300 mb-12 text-balance">
            Discover premium vendors, manage logistics, and create unforgettable moments with our all-in-one event
            planning platform.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition"
          >
            Get Started Now
          </button>
        </div>
      </div>

      {/* Floating Cards */}
      <div className="grid grid-cols-3 gap-6 px-8 pb-20 max-w-5xl mx-auto w-full">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="text-3xl mb-3">✓</div>
          <h3 className="font-semibold text-white mb-2">Premium Vendors</h3>
          <p className="text-sm text-slate-400">Access curated vendors across all categories</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="font-semibold text-white mb-2">Smart Planning</h3>
          <p className="text-sm text-slate-400">Real-time budgeting and timeline management</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="text-3xl mb-3">👥</div>
          <h3 className="font-semibold text-white mb-2">Team Collaboration</h3>
          <p className="text-sm text-slate-400">Work seamlessly with your planning team</p>
        </div>
      </div>
    </div>
  )
}
