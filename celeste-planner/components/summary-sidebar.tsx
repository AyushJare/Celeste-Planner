"use client"

import type { allVendors as allVendorsType } from "@/lib/vendors"

interface EventCriteria {
  type: string
  budgetRange: string
}

interface Guest {
  name: string
  status: "Pending" | "Attending" | "Declined"
}

export function SummarySidebar({
  eventCriteria,
  selections,
  allVendors: allVendorsData,
  totalCost,
  guestList,
}: {
  eventCriteria: EventCriteria
  selections: Record<string, string>
  allVendors: typeof allVendorsType
  totalCost: number
  guestList: Guest[]
}) {
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(num)
  }

  const getBudgetLabel = (range: string) => {
    if (!range) return "N/A"
    const [min, max] = range.split("-").map(Number)
    if (min === 0) return `Under ${formatCurrency(max)}`
    if (max === 1000001) return `Over ${formatCurrency(min)}`
    return `${formatCurrency(min)} - ${formatCurrency(max)}`
  }

  const attending = guestList.filter((g) => g.status === "Attending").length

  return (
    <div className="backdrop-blur-sm bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 sticky top-8 hover:border-slate-600/50 transition-all duration-300 animate-fade-in">
      <h3
        className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-6"
        style={{ fontFamily: "Playfair Display" }}
      >
        Summary
      </h3>

      <div className="text-sm text-slate-300 space-y-3 mb-6 pb-6 border-b border-slate-700/50">
        <div className="flex justify-between">
          <span className="text-slate-500">Event Type:</span>
          <span className="text-emerald-400 font-semibold capitalize">{eventCriteria.type}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Budget:</span>
          <span className="text-emerald-400 font-semibold">{getBudgetLabel(eventCriteria.budgetRange)}</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <p className="text-xs text-slate-500 mb-2">Budget Status</p>
          <div className="text-2xl font-bold text-emerald-400">{formatCurrency(totalCost)}</div>
          <p className="text-xs text-slate-500 mt-1">Spent</p>
        </div>

        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
          <p className="text-xs text-slate-500 mb-1">Guests Confirmed</p>
          <p className="text-lg font-bold text-emerald-400">{attending}</p>
        </div>

        <div className="p-3 rounded-lg bg-slate-700/50 border border-slate-600/50">
          <p className="text-xs text-slate-500 mb-1">Vendors Selected</p>
          <p className="text-lg font-bold text-slate-100">{Object.keys(selections).length}</p>
        </div>
      </div>

      <div className="space-y-3 pb-6 border-b border-slate-700/50">
        <p className="text-sm font-semibold text-slate-300">Selected Vendors</p>
        {Object.entries(selections).map(([categoryId, vendorId]) => {
          const vendor = allVendorsData[categoryId as keyof typeof allVendorsData]?.items.find(
            (v: any) => v.id === vendorId,
          )
          if (!vendor) return null

          return (
            <div key={categoryId} className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <p className="text-xs text-slate-500 mb-1">
                {allVendorsData[categoryId as keyof typeof allVendorsData].title}
              </p>
              <h5 className="font-semibold text-sm text-white">{vendor.name}</h5>
              <p className="text-emerald-400 font-bold text-sm mt-1">{vendor.price}</p>
            </div>
          )
        })}
        {Object.keys(selections).length === 0 && (
          <p className="text-xs text-slate-500 italic">No vendors selected yet</p>
        )}
      </div>
    </div>
  )
}
