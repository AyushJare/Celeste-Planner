"use client"

import { useState } from "react"
import { allVendors } from "@/lib/vendors"
import { Header } from "./header"
import { VendorBrowser } from "./vendor-browser"
import { GuestListTab } from "./guest-list-tab"
import { TimelineTab } from "./timeline-tab"
import { ChecklistTab } from "./checklist-tab"
import { SummarySidebar } from "./summary-sidebar"

interface EventCriteria {
  type: string
  budgetRange: string
}

interface Guest {
  name: string
  status: "Pending" | "Attending" | "Declined"
}

interface TimelineItem {
  time: string
  activity: string
}

interface ChecklistItem {
  task: string
  done: boolean
}

export function PlannerScreen({
  eventCriteria,
  selections,
  guestList,
  timeline,
  checklist,
  onSelectVendor,
  onSignOut,
  eventPlanDocRef,
  onReset,
}: {
  eventCriteria: EventCriteria
  selections: Record<string, string>
  guestList: Guest[]
  timeline: TimelineItem[]
  checklist: ChecklistItem[]
  onSelectVendor: (categoryId: string, vendorId: string) => Promise<void>
  onSignOut: () => Promise<void>
  eventPlanDocRef: any
  onReset: () => Promise<void>
}) {
  const [activeTab, setActiveTab] = useState("vendors")

  // Filter vendors based on event type and budget
  const getFilteredVendors = () => {
    const [minBudget, maxBudget] = eventCriteria.budgetRange.split("-").map(Number)
    const filtered: typeof allVendors = {}

    for (const categoryId in allVendors) {
      filtered[categoryId] = JSON.parse(JSON.stringify(allVendors[categoryId]))
      filtered[categoryId].items = filtered[categoryId].items.filter((vendor: any) => {
        const inBudget =
          minBudget === 1000001 ? vendor.cost >= minBudget : vendor.cost >= minBudget && vendor.cost <= maxBudget
        return vendor.eventType.includes(eventCriteria.type) && inBudget
      })
    }

    return filtered
  }

  const filteredVendors = getFilteredVendors()

  // Calculate total cost
  const totalCost = Object.entries(selections).reduce((sum, [categoryId, vendorId]) => {
    const vendor = allVendors[categoryId as keyof typeof allVendors]?.items.find((v: any) => v.id === vendorId)
    return sum + (vendor?.cost || 0)
  }, 0)

  const tabs = [
    { id: "vendors", label: "Vendors", icon: "🏪" },
    { id: "guests", label: "Guests", icon: "👥" },
    { id: "timeline", label: "Timeline", icon: "⏰" },
    { id: "checklist", label: "Checklist", icon: "✓" },
  ]

  return (
    <>
      <Header showSignOut={true} onSignOut={onSignOut} showReset={true} onReset={onReset} />

      <div className="min-h-[calc(100vh-88px)] px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Tab Navigation */}
              <div className="flex gap-2 backdrop-blur-sm bg-slate-800/30 border border-slate-700/50 rounded-xl p-2 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/50"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="animate-fade-in">
                {activeTab === "vendors" && (
                  <VendorBrowser
                    filteredVendors={filteredVendors}
                    selections={selections}
                    onSelectVendor={onSelectVendor}
                  />
                )}
                {activeTab === "guests" && <GuestListTab guestList={guestList} eventPlanDocRef={eventPlanDocRef} />}
                {activeTab === "timeline" && <TimelineTab timeline={timeline} eventPlanDocRef={eventPlanDocRef} />}
                {activeTab === "checklist" && <ChecklistTab checklist={checklist} eventPlanDocRef={eventPlanDocRef} />}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <SummarySidebar
                eventCriteria={eventCriteria}
                selections={selections}
                allVendors={allVendors}
                totalCost={totalCost}
                guestList={guestList}
              />
            </div>
          </div>

          <p className="text-center text-xs text-slate-500 mt-12 font-light">Made by Aranya</p>
        </div>
      </div>
    </>
  )
}
