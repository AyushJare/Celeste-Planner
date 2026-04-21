"use client"

import type React from "react"

import { useState } from "react"
import { updateDoc } from "firebase/firestore"

interface ChecklistItem {
  task: string
  done: boolean
}

export function ChecklistTab({
  checklist,
  eventPlanDocRef,
}: {
  checklist: ChecklistItem[]
  eventPlanDocRef: any
}) {
  const [newTask, setNewTask] = useState("")

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      const newChecklist = [...checklist, { task: newTask.trim(), done: false }]
      await updateDoc(eventPlanDocRef, { checklist: newChecklist })
      setNewTask("")
    }
  }

  const handleToggleTask = async (index: number) => {
    const newChecklist = [...checklist]
    newChecklist[index].done = !newChecklist[index].done
    await updateDoc(eventPlanDocRef, { checklist: newChecklist })
  }

  const completedCount = checklist.filter((item) => item.done).length
  const completionPercentage = checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0

  return (
    <div className="card-3d p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-white" style={{ fontFamily: "Playfair Display" }}>
          Planning Checklist
        </h3>
        <div className="text-sm text-slate-400">
          {completedCount} of {checklist.length} completed
        </div>
      </div>

      <div className="w-full bg-slate-800/50 rounded-full h-2 border border-slate-700/50">
        <div
          className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>

      <form onSubmit={handleAddTask} className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task"
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
        {checklist.map((item, index) => (
          <label
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition cursor-pointer"
          >
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => handleToggleTask(index)}
              className="w-5 h-5 rounded cursor-pointer accent-emerald-500"
            />
            <span className={`flex-1 text-sm ${item.done ? "line-through text-slate-500" : "text-slate-100"}`}>
              {item.task}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
