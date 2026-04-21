"use client"

import type React from "react"

import { useState } from "react"
import { updateDoc } from "firebase/firestore"

interface Guest {
  name: string
  status: "Pending" | "Attending" | "Declined"
}

export function GuestListTab({
  guestList,
  eventPlanDocRef,
}: {
  guestList: Guest[]
  eventPlanDocRef: any
}) {
  const [newGuestName, setNewGuestName] = useState("")

  const attending = guestList.filter((g) => g.status === "Attending").length
  const declined = guestList.filter((g) => g.status === "Declined").length
  const pending = guestList.filter((g) => g.status === "Pending").length

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newGuestName.trim()) {
      const newGuestList = [...guestList, { name: newGuestName.trim(), status: "Pending" as const }]
      await updateDoc(eventPlanDocRef, { guestList: newGuestList })
      setNewGuestName("")
    }
  }

  const handleUpdateGuestStatus = async (index: number, newStatus: "Pending" | "Attending" | "Declined") => {
    const newGuestList = [...guestList]
    newGuestList[index].status = newStatus
    await updateDoc(eventPlanDocRef, { guestList: newGuestList })
  }

  const handleDeleteGuest = async (index: number) => {
    const newGuestList = guestList.filter((_, i) => i !== index)
    await updateDoc(eventPlanDocRef, { guestList: newGuestList })
  }

  return (
    <div className="card-3d p-6 space-y-6 animate-fade-in">
      <h3 className="text-xl font-bold text-white" style={{ fontFamily: "Playfair Display" }}>
        Guest List
      </h3>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 rounded-lg bg-slate-800/50 border border-slate-700">
          <div className="text-2xl font-bold text-emerald-400">{guestList.length}</div>
          <div className="text-xs text-slate-500 mt-1">Total</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-slate-800/50 border border-slate-700">
          <div className="text-2xl font-bold text-emerald-400">{attending}</div>
          <div className="text-xs text-slate-500 mt-1">Attending</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-slate-800/50 border border-slate-700">
          <div className="text-2xl font-bold text-slate-400">{pending}</div>
          <div className="text-xs text-slate-500 mt-1">Pending</div>
        </div>
      </div>

      <form onSubmit={handleAddGuest} className="flex gap-2">
        <input
          type="text"
          value={newGuestName}
          onChange={(e) => setNewGuestName(e.target.value)}
          placeholder="Add guest name"
          className="flex-grow px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
        >
          Add
        </button>
      </form>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {guestList.map((guest, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition"
          >
            <span className="font-medium text-sm text-slate-100">{guest.name}</span>
            <div className="flex items-center gap-2">
              <select
                value={guest.status}
                onChange={(e) => handleUpdateGuestStatus(index, e.target.value as any)}
                className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs text-slate-200 focus:border-emerald-500 transition"
              >
                <option value="Pending">Pending</option>
                <option value="Attending">Attending</option>
                <option value="Declined">Declined</option>
              </select>
              <button
                onClick={() => handleDeleteGuest(index)}
                className="text-red-400 hover:text-red-300 font-bold transition"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
