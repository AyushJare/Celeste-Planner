"use client"

import { CelesteLogo } from "./celeste-logo"

export function Header({
  showSignOut = false,
  onSignOut,
  showReset = false,
  onReset,
}: {
  showSignOut?: boolean
  onSignOut?: () => Promise<void>
  showReset?: boolean
  onReset?: () => Promise<void>
}) {
  return (
    <header className="backdrop-blur-sm bg-slate-900/40 border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <CelesteLogo size="md" />
            <div>
              <h1
                className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
                style={{ fontFamily: "Playfair Display" }}
              >
                Celesté
              </h1>
              <p className="text-xs text-slate-400">Bespoke Event Curation</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 items-center">
            {showReset && onReset && (
              <button
                onClick={onReset}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg hover:bg-slate-600 transition-all duration-200 text-sm text-slate-300 hover:text-white"
              >
                Start Over
              </button>
            )}
            {showSignOut && onSignOut && (
              <button
                onClick={onSignOut}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg hover:bg-slate-600 transition-all duration-200 text-sm text-slate-300 hover:text-white"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
