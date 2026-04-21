"use client"

import { CelesteLogo } from "./celeste-logo"

export function LoginScreen({ onSignIn }: { onSignIn: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-slate-600/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-md w-full animate-fade-in">
        <div className="flex justify-center mb-8">
          <CelesteLogo size="lg" />
        </div>

        <div className="text-center mb-12">
          <h1
            className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4 tracking-tight"
            style={{ fontFamily: "Playfair Display" }}
          >
            Celesté
          </h1>
          <p className="text-slate-400 text-lg font-light">Bespoke Event Curation</p>
        </div>

        <div className="backdrop-blur-sm bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 text-center hover:border-slate-600/50 transition-all duration-300">
          <p className="text-slate-300 mb-8 font-light leading-relaxed">
            Curate your perfect day with our carefully selected vendors and seamless planning experience.
          </p>
          <button
            onClick={onSignIn}
            className="w-full flex items-center justify-center gap-3 text-base bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <defs>
                <path
                  id="a"
                  d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                />
              </defs>
              <clipPath id="b">
                <use xlinkHref="#a" overflow="visible" />
              </clipPath>
              <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
              <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
              <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
              <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="text-center text-xs text-slate-500 mt-8 font-light">Made by Aranya</p>
      </div>
    </div>
  )
}
