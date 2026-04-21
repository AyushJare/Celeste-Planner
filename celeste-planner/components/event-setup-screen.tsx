"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "./header"

export function EventSetupScreen({
  onStartPlanning,
}: { onStartPlanning: (eventType: string, budgetRange: string) => void }) {
  const [eventType, setEventType] = useState("wedding")
  const [budgetRange, setBudgetRange] = useState("10000-25000")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onStartPlanning(eventType, budgetRange)
  }

  return (
    <>
      <Header />

      <div className="min-h-[calc(100vh-88px)] flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full animate-fade-in">
          <div className="text-center mb-12">
            <h2
              className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-3"
              style={{ fontFamily: "Playfair Display" }}
            >
              Begin Your Celebration
            </h2>
            <p className="text-slate-400 font-light">Tell us about your event</p>
          </div>

          <div className="backdrop-blur-sm bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600/50 transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Event Type</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-md px-4 py-3 text-slate-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                >
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="party">Birthday / Party</option>
                  <option value="gathering">Casual Gathering</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-4">Budget Range</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "1000-10000", label: "₹1k - ₹10k" },
                    { value: "10000-25000", label: "₹10k - ₹25k" },
                    { value: "25000-100000", label: "₹25k - ₹1L" },
                    { value: "100000-1000000", label: "₹1L+" },
                  ].map((option) => (
                    <label key={option.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="budget"
                        value={option.value}
                        checked={budgetRange === option.value}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="sr-only"
                      />
                      <span
                        className={`block text-center p-4 rounded-lg border transition-all ${
                          budgetRange === option.value
                            ? "border-emerald-500 bg-emerald-500/10"
                            : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                        }`}
                      >
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-8 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105"
              >
                Start Planning
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
