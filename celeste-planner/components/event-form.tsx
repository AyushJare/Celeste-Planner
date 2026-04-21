"use client"

import { useState } from "react"
import { ChevronRight, Calendar, MapPin, Users, DollarSign } from "lucide-react"
import { AnimatedCard } from "./animated-card"

interface EventFormProps {
  data: {
    eventName: string
    date: string
    location: string
    guestCount: number
    budget: number
  }
  onChange: (data: EventFormProps["data"]) => void
  onNext: () => void
}

export function EventForm({ data, onChange, onNext }: EventFormProps) {
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleChange = (key: string, value: any) => {
    onChange({
      ...data,
      [key]: value,
    })
  }

  const handleBlur = (key: string) => {
    setTouched({ ...touched, [key]: true })
  }

  const isComplete = data.eventName && data.date && data.location && data.guestCount > 0 && data.budget > 0

  return (
    <AnimatedCard variant="scale">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 md:p-10 shadow-2xl">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-white text-slate-900 flex items-center justify-center font-bold animate-bounce-subtle">
              1
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Event Details</h2>
          </div>
          <p className="text-slate-400 ml-14">Tell us about your upcoming event</p>
        </div>

        <form className="space-y-8 stagger">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
                ✓
              </span>
              Event Name *
            </label>
            <input
              type="text"
              value={data.eventName}
              onChange={(e) => handleChange("eventName", e.target.value)}
              onBlur={() => handleBlur("eventName")}
              placeholder="e.g., Sarah & John's Wedding Celebration"
              className="w-full px-5 py-4 bg-slate-800 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-white transition-colors text-base hover:border-slate-600"
            />
            {touched.eventName && !data.eventName && (
              <p className="text-red-400 text-xs mt-2">Event name is required</p>
            )}
          </div>

          {/* Date and Location Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Event Date *
              </label>
              <input
                type="date"
                value={data.date}
                onChange={(e) => handleChange("date", e.target.value)}
                onBlur={() => handleBlur("date")}
                className="w-full px-5 py-4 bg-slate-800 border-2 border-slate-700 rounded-xl text-white focus:outline-none focus:border-white transition-colors text-base hover:border-slate-600"
              />
              {touched.date && !data.date && <p className="text-red-400 text-xs mt-2">Date is required</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location *
              </label>
              <input
                type="text"
                value={data.location}
                onChange={(e) => handleChange("location", e.target.value)}
                onBlur={() => handleBlur("location")}
                placeholder="City, State"
                className="w-full px-5 py-4 bg-slate-800 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-white transition-colors text-base hover:border-slate-600"
              />
              {touched.location && !data.location && <p className="text-red-400 text-xs mt-2">Location is required</p>}
            </div>
          </div>

          {/* Guest Count and Budget Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Guest Count *
              </label>
              <input
                type="number"
                value={data.guestCount}
                onChange={(e) => handleChange("guestCount", Math.max(1, Number.parseInt(e.target.value) || 0))}
                onBlur={() => handleBlur("guestCount")}
                min="1"
                className="w-full px-5 py-4 bg-slate-800 border-2 border-slate-700 rounded-xl text-white focus:outline-none focus:border-white transition-colors text-base hover:border-slate-600"
              />
              {touched.guestCount && data.guestCount <= 0 && (
                <p className="text-red-400 text-xs mt-2">Must be at least 1 guest</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Total Budget *
              </label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg font-semibold">$</span>
                <input
                  type="number"
                  value={data.budget}
                  onChange={(e) => handleChange("budget", Math.max(100, Number.parseInt(e.target.value) || 0))}
                  onBlur={() => handleBlur("budget")}
                  min="100"
                  className="w-full pl-10 pr-5 py-4 bg-slate-800 border-2 border-slate-700 rounded-xl text-white focus:outline-none focus:border-white transition-colors text-base hover:border-slate-600"
                />
              </div>
              {touched.budget && data.budget < 100 && (
                <p className="text-red-400 text-xs mt-2">Minimum budget is $100</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={onNext}
            disabled={!isComplete}
            className="w-full bg-white text-slate-900 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-10 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Continue to Vendors <ChevronRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </AnimatedCard>
  )
}
