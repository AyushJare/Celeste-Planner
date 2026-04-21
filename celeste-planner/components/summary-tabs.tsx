"use client"

import { useState } from "react"
import { CheckCircle2, MapPin, DollarSign, FileText, Zap } from "lucide-react"

interface SummaryTabsProps {
  eventData: {
    eventName: string
    date: string
    location: string
    guestCount: number
    budget: number
  }
  selectedVendorDetails: Array<{
    id: number
    name: string
    category: string
    price: number
    rating: number
  }>
  onStartOver: () => void
}

export function SummaryTabs({ eventData, selectedVendorDetails, onStartOver }: SummaryTabsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "vendors" | "timeline" | "checklist">("overview")

  const totalVendorCost = selectedVendorDetails.reduce((sum, v) => sum + v.price, 0)
  const otherCosts = eventData.budget - totalVendorCost
  const eventDate = new Date(eventData.date)
  const daysUntilEvent = Math.ceil((eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  const tabs = [
    { id: "overview", label: "Overview", icon: CheckCircle2 },
    { id: "vendors", label: "Vendors", icon: Zap },
    { id: "timeline", label: "Timeline", icon: MapPin },
    { id: "checklist", label: "Checklist", icon: FileText },
  ]

  const timelineEvents = [
    { day: daysUntilEvent, event: "Event Day", highlight: true },
    { day: 7, event: "Final Confirmations" },
    { day: 14, event: "Deposit Due" },
    { day: 30, event: "Vendor Meetings Recommended" },
  ]

  const checklist = [
    { task: "Confirm guest count", completed: true },
    { task: "Book all vendors", completed: true },
    { task: "Send invitations", completed: false },
    { task: "Arrange transportation", completed: false },
    { task: "Finalize menu details", completed: false },
    { task: "Create seating chart", completed: false },
  ]

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="border-b border-slate-700 overflow-x-auto">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 font-semibold transition border-b-2 -mb-px flex items-center gap-2 whitespace-nowrap ${
                  isActive ? "text-white border-white" : "text-slate-400 border-transparent hover:text-slate-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event Summary */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Event Overview
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-400 text-sm font-semibold mb-1">EVENT NAME</p>
                  <p className="text-white font-bold text-lg">{eventData.eventName}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-semibold mb-1">DATE & TIME</p>
                  <p className="text-white font-semibold">
                    {eventDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  {daysUntilEvent > 0 && (
                    <p className="text-emerald-400 text-xs font-medium mt-1">{daysUntilEvent} days away</p>
                  )}
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-semibold mb-1">LOCATION</p>
                  <p className="text-white font-semibold">{eventData.location}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-semibold mb-1">EXPECTED GUESTS</p>
                  <p className="text-white font-semibold">{eventData.guestCount} people</p>
                </div>
              </div>
            </div>

            {/* Budget Overview */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-orange-400" />
                Budget Overview
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-400 text-sm font-semibold mb-1">TOTAL BUDGET</p>
                  <p className="text-white font-bold text-2xl">${eventData.budget.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Vendor Costs</span>
                    <span className="text-white font-semibold">${totalVendorCost.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      style={{ width: `${(totalVendorCost / eventData.budget) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Other / Buffer</span>
                    <span className="text-emerald-400 font-semibold">${otherCosts.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vendors Tab */}
        {activeTab === "vendors" && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Selected Vendors</h3>
            {selectedVendorDetails.length > 0 ? (
              <div className="space-y-4">
                {selectedVendorDetails.map((vendor, idx) => (
                  <div
                    key={vendor.id}
                    className="flex items-center justify-between p-4 bg-slate-800 border border-slate-700 rounded-lg"
                  >
                    <div>
                      <p className="text-xs text-slate-400 font-semibold mb-1 uppercase">{vendor.category}</p>
                      <p className="text-white font-semibold">{vendor.name}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-yellow-400 text-sm">★</span>
                        <span className="text-slate-300 text-sm">{vendor.rating}/5</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">${vendor.price}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-6 p-4 bg-emerald-900/30 border border-emerald-700/50 rounded-lg">
                  <p className="text-emerald-300 font-semibold">
                    Total Vendor Cost: ${totalVendorCost.toLocaleString()}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-slate-400">No vendors selected yet.</p>
            )}
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === "timeline" && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Event Timeline</h3>
            <div className="space-y-4">
              {timelineEvents.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        item.highlight
                          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/50"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {item.day}
                    </div>
                    {idx < timelineEvents.length - 1 && (
                      <div className="w-0.5 h-12 bg-gradient-to-b from-slate-600 to-slate-700 my-2" />
                    )}
                  </div>
                  <div className="pt-2">
                    <p className={`font-semibold ${item.highlight ? "text-emerald-400" : "text-white"}`}>
                      {item.event}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {item.day === daysUntilEvent ? "Today" : item.day === 0 ? "Tomorrow" : `In ${item.day} days`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Checklist Tab */}
        {activeTab === "checklist" && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Event Checklist</h3>
            <div className="space-y-3">
              {checklist.map((item, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-slate-600 cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    defaultChecked={item.completed}
                    className="w-5 h-5 rounded border-slate-600 cursor-pointer"
                  />
                  <span className={`font-medium ${item.completed ? "text-slate-400 line-through" : "text-white"}`}>
                    {item.task}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
