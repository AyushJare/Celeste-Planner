"use client"

import { useState } from "react"
import { EventForm } from "./event-form"
import { VendorBrowser } from "./vendor-browser"
import { SummaryCard } from "./summary-card"
import { SummaryTabs } from "./summary-tabs"
import { ChevronRight, CheckCircle2 } from "lucide-react"

export function EventSetup() {
  const [currentStep, setCurrentStep] = useState<"details" | "vendors" | "summary">("details")
  const [eventData, setEventData] = useState({
    eventName: "",
    date: "",
    location: "",
    guestCount: 50,
    budget: 5000,
  })
  const [selectedVendors, setSelectedVendors] = useState<number[]>([])

  const steps = [
    { id: "details", label: "Event Details", icon: "1" },
    { id: "vendors", label: "Select Vendors", icon: "2" },
    { id: "summary", label: "Confirm & Book", icon: "3" },
  ]

  const getStepStatus = (stepId: string) => {
    if (stepId === "details")
      return currentStep !== "details" && eventData.eventName
        ? "completed"
        : currentStep === "details"
          ? "current"
          : "pending"
    if (stepId === "vendors")
      return currentStep === "summary" && selectedVendors.length > 0
        ? "completed"
        : currentStep === "vendors"
          ? "current"
          : "pending"
    return currentStep === "summary" ? "current" : "pending"
  }

  const selectedVendorDetails = selectedVendors.map((id) => {
    const allVendors = [
      { id: 1, name: "Gourmet Delights", category: "Catering", price: 2500, rating: 4.9 },
      { id: 2, name: "Chef's Table", category: "Catering", price: 3200, rating: 4.8 },
      { id: 3, name: "Artisan Kitchen", category: "Catering", price: 2000, rating: 4.7 },
      { id: 4, name: "Studio Prime", category: "Photography", price: 1500, rating: 4.9 },
      { id: 5, name: "Moments Captured", category: "Photography", price: 1800, rating: 4.8 },
      { id: 6, name: "Lens Masters", category: "Photography", price: 1200, rating: 4.6 },
      { id: 7, name: "Elegance & Design", category: "Decorations", price: 800, rating: 4.8 },
      { id: 8, name: "Floral Dreams", category: "Decorations", price: 1000, rating: 4.9 },
      { id: 9, name: "Modern Décor Co", category: "Decorations", price: 600, rating: 4.5 },
    ]
    return allVendors.find((v) => v.id === id)!
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Progress Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, idx) => {
              const status = getStepStatus(step.id)
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    {/* Step Circle */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-all ${
                        status === "completed"
                          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/50"
                          : status === "current"
                            ? "bg-white text-slate-900 shadow-lg shadow-white/50"
                            : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {status === "completed" ? <CheckCircle2 className="w-6 h-6" /> : step.icon}
                    </div>
                    {/* Step Label */}
                    <p
                      className={`text-sm font-medium mt-3 ${
                        status === "completed" || status === "current" ? "text-white" : "text-slate-500"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>

                  {/* Connector Line */}
                  {idx < steps.length - 1 && (
                    <div className="flex-1 mx-2 mb-8">
                      <div
                        className={`h-1 rounded-full transition-all ${
                          status === "completed" ? "bg-emerald-500" : "bg-slate-700"
                        }`}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-sm">
              {currentStep === "details" && (
                <EventForm data={eventData} onChange={setEventData} onNext={() => setCurrentStep("vendors")} />
              )}
              {currentStep === "vendors" && (
                <VendorBrowser
                  budget={eventData.budget}
                  selectedVendors={selectedVendors}
                  onSelectVendor={(id) => setSelectedVendors([...selectedVendors, id])}
                  onBack={() => setCurrentStep("details")}
                  onNext={() => setCurrentStep("summary")}
                />
              )}
              {currentStep === "summary" && (
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 md:p-12 shadow-2xl">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-white text-slate-900 flex items-center justify-center font-bold">
                        3
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white">Confirm & Book</h2>
                    </div>
                    <p className="text-slate-400 ml-14">Review your event details and finalize your bookings</p>
                  </div>

                  <SummaryTabs
                    eventData={eventData}
                    selectedVendorDetails={selectedVendorDetails}
                    onStartOver={() => {
                      setCurrentStep("details")
                      setEventData({
                        eventName: "",
                        date: "",
                        location: "",
                        guestCount: 50,
                        budget: 5000,
                      })
                      setSelectedVendors([])
                    }}
                  />

                  {/* Action Buttons */}
                  <div className="flex gap-4 justify-center flex-wrap mt-10 pt-10 border-t border-slate-700">
                    <button
                      onClick={() => setCurrentStep("details")}
                      className="px-8 py-3 bg-slate-800 border border-slate-700 text-white rounded-lg font-semibold hover:bg-slate-700 transition"
                    >
                      Edit Event
                    </button>
                    <button
                      onClick={() => {
                        setCurrentStep("details")
                        setEventData({
                          eventName: "",
                          date: "",
                          location: "",
                          guestCount: 50,
                          budget: 5000,
                        })
                        setSelectedVendors([])
                      }}
                      className="px-8 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition flex items-center gap-2"
                    >
                      Plan New Event <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SummaryCard eventData={eventData} currentStep={currentStep} selectedVendors={selectedVendors} />
          </div>
        </div>
      </div>
    </div>
  )
}
