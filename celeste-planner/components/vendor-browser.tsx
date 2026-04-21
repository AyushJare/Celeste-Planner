"use client"

import type { allVendors } from "@/lib/vendors"

interface Vendor {
  id: string
  name: string
  specialty: string
  price: string
  cost: number
  eventType: string[]
  contact: string
}

interface VendorBrowserProps {
  filteredVendors: typeof allVendors
  selections: Record<string, string>
  onSelectVendor: (categoryId: string, vendorId: string) => Promise<void>
}

export function VendorBrowser({ filteredVendors, selections, onSelectVendor }: VendorBrowserProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      {Object.entries(filteredVendors).map(([categoryId, category]) => {
        if (category.items.length === 0) return null

        return (
          <div key={categoryId} className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{category.icon}</span>
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "Playfair Display" }}>
                {category.title}
              </h3>
              <span className="ml-auto text-sm text-slate-400">
                {category.items.length} vendor{category.items.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger">
              {category.items.map((vendor: Vendor, idx: number) => {
                const isSelected = selections[categoryId] === vendor.id

                return (
                  <button
                    key={vendor.id}
                    onClick={() => onSelectVendor(categoryId, vendor.id)}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                    className={`text-left p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 transform-gpu ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/30"
                        : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-lg">{vendor.name}</h4>
                        <p className="text-sm text-slate-400 mt-1">{vendor.specialty}</p>
                      </div>
                      {isSelected && (
                        <div className="ml-3 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-bold">✓</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700/50">
                      <span className="text-emerald-400 font-semibold">{vendor.price}</span>
                      <a
                        href={`mailto:${vendor.contact}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-emerald-400 hover:text-emerald-300 underline"
                      >
                        Contact
                      </a>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
