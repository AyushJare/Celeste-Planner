"use client"

import { CheckCircle2, Calendar, MapPin, Users, DollarSign, Package, TrendingUp, AlertCircle, Zap } from "lucide-react"

interface SummaryCardProps {
  eventData: {
    eventName: string
    date: string
    location: string
    guestCount: number
    budget: number
  }
  currentStep: string
  selectedVendors: number[]
}

export function SummaryCard({ eventData, currentStep, selectedVendors }: SummaryCardProps) {
  const spentEstimate = Math.floor(eventData.budget * 0.7)
  const remaining = eventData.budget - spentEstimate
  const budgetPercentage = (spentEstimate / eventData.budget) * 100
  const costPerGuest = eventData.guestCount ? Math.round(spentEstimate / eventData.guestCount) : 0

  const steps = [
    { id: "details", label: "Event Details", completed: Boolean(eventData.eventName) },
    { id: "vendors", label: "Select Vendors", completed: selectedVendors.length > 0 },
    { id: "summary", label: "Confirm & Book", completed: false },
  ]

  const isEventComplete = eventData.eventName && eventData.date && eventData.location
  const allComplete = steps.every((s) => s.completed)

  return (
    <div className="sticky top-8 space-y-6">
      {/* Progress Timeline */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16" />
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 relative z-10">
          <Package className="w-5 h-5" />
          Progress
        </h3>
        <div className="space-y-4 relative z-10">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${
                  step.completed
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/50"
                    : currentStep === step.id
                      ? "bg-white text-slate-900"
                      : "bg-slate-700 text-slate-400"
                }`}
              >
                {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
              </div>
              <div className="flex-1">
                <span
                  className={`text-sm font-medium transition-colors ${
                    step.completed || currentStep === step.id ? "text-white" : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
                {step.completed && <div className="h-0.5 bg-emerald-500 rounded-full mt-1" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Summary - Enhanced */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500 opacity-5 rounded-full -ml-16 -mt-16" />
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 relative z-10">
          <DollarSign className="w-5 h-5" />
          Budget Breakdown
        </h3>

        <div className="space-y-5 relative z-10">
          {/* Total Budget */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-400 font-medium">Total Budget</span>
              <span className="text-white font-bold text-lg">${eventData.budget.toLocaleString()}</span>
            </div>
          </div>

          {/* Spent Estimate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-400 font-medium">Estimated Spent</span>
              <span className="text-orange-400 font-bold">${spentEstimate.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-500"
                style={{ width: `${budgetPercentage}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">{budgetPercentage.toFixed(0)}% of total</p>
          </div>

          {/* Cost Per Guest */}
          <div className="bg-slate-700/50 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Cost per Guest</span>
              <span className="text-white font-bold">${costPerGuest}</span>
            </div>
          </div>

          {/* Remaining */}
          <div className="border-t border-slate-700 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">Remaining Buffer</span>
              <span className={`font-bold text-lg ${remaining >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                ${remaining.toLocaleString()}
              </span>
            </div>
            {remaining < 500 && remaining >= 0 && (
              <div className="flex items-center gap-2 mt-2 p-2 bg-yellow-900/30 rounded border border-yellow-700/50">
                <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-xs text-yellow-200">Low budget remaining</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Info Card */}
      {isEventComplete && (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-5 rounded-full -mr-16 -mt-16" />
          <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2 relative z-10">
            <Zap className="w-5 h-5 text-blue-400" />
            Event Summary
          </h3>
          <div className="space-y-4 relative z-10">
            {/* Event Name */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Event</p>
              <p className="text-white font-semibold text-balance">{eventData.eventName}</p>
            </div>

            {/* Date */}
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">Date</p>
                <p className="text-white font-medium">
                  {new Date(eventData.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">Location</p>
                <p className="text-white font-medium">{eventData.location}</p>
              </div>
            </div>

            {/* Guests */}
            <div className="flex items-start gap-3">
              <Users className="w-4 h-4 text-slate-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">Guests</p>
                <p className="text-white font-medium">{eventData.guestCount.toLocaleString()} people</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vendors Selected Card */}
      {selectedVendors.length > 0 && (
        <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 border border-emerald-700 rounded-2xl p-6 shadow-lg shadow-emerald-500/20 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16" />
          <div className="relative z-10">
            <p className="text-emerald-100 text-sm font-bold mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              {selectedVendors.length} Vendor{selectedVendors.length !== 1 ? "s" : ""} Selected
            </p>
            <p className="text-emerald-200 text-xs">Ready to proceed to booking confirmation</p>
          </div>
        </div>
      )}

      {/* Completion Status */}
      {allComplete && (
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 shadow-lg text-center">
          <TrendingUp className="w-8 h-8 text-white mx-auto mb-2" />
          <p className="text-white font-bold">Your event is ready!</p>
          <p className="text-emerald-50 text-sm mt-1">All steps completed successfully</p>
        </div>
      )}
    </div>
  )
}
