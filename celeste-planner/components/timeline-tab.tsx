"use client"

import type React from "react"

import { useState } from "react"
import { updateDoc } from "firebase/firestore"

interface TimelineItem {
  time: string
  activity: string
}

export function TimelineTab({
  timeline,
  eventPlanDocRef,
}: {
  timeline: TimelineItem[]
  eventPlanDocRef: any
}) {
  const [newTime, setNewTime] = useState("")
  const [newActivity, setNewActivity] = useState("")

  const handleAddTimelineItem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newTime && newActivity.trim()) {
      const newTimeline = [...timeline, { time: newTime, activity: newActivity.trim() }]
      await updateDoc(eventPlanDocRef, { timeline: newTimeline })
      setNewTime("")
      setNewActivity("")
    }
  }

  const handleDeleteTimelineItem = async (index: number) => {
    const newTimeline = timeline.filter((_, i) => i !== index)
    await updateDoc(eventPlanDocRef, { timeline: newTimeline })
  }

  const sortedTimeline = [...timeline].sort((a, b) => a.time.localeCompare(b.time))

  return (
    <div className="card-3d p-6 space-y-6 animate-fade-in">
      <h3 className="text-xl font-bold text-white" style={{ fontFamily: "Playfair Display" }}>
        Event Timeline
      </h3>

      <form onSubmit={handleAddTimelineItem} className="flex items-center gap-2">
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
        />
        <input
          type="text"
          value={newActivity}
          onChange={(e) => setNewActivity(e.target.value)}
          placeholder="Activity"
          className="flex-1 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
        >
          Add
        </button>
      </form>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sortedTimeline.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition"
          >
            <span className="font-bold text-emerald-400 text-sm min-w-fit">{item.time}</span>
            <span className="text-sm flex-1 text-slate-100">{item.activity}</span>
            <button
              onClick={() => handleDeleteTimelineItem(timeline.indexOf(item))}
              className="text-red-400 hover:text-red-300 font-bold transition"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
