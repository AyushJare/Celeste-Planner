"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { doc, setDoc, onSnapshot, updateDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { checklists } from "@/lib/vendors"
import { LoginScreen } from "@/components/login-screen"
import { EventSetupScreen } from "@/components/event-setup-screen"
import { PlannerScreen } from "@/components/planner-screen"

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

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [eventCriteria, setEventCriteria] = useState<EventCriteria | null>(null)
  const [selections, setSelections] = useState<Record<string, string>>({})
  const [guestList, setGuestList] = useState<Guest[]>([])
  const [timeline, setTimeline] = useState<TimelineItem[]>([])
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [eventPlanDocRef, setEventPlanDocRef] = useState<any>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        const docRef = doc(db, "artifacts", "default-app-id", "users", currentUser.uid, "eventPlan", "main")
        setEventPlanDocRef(docRef)

        const unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists() && docSnap.data().eventCriteria && docSnap.data().eventCriteria.type) {
            const data = docSnap.data()
            setEventCriteria(data.eventCriteria)
            setSelections(data.selections || {})
            setGuestList(data.guestList || [])
            setTimeline(data.timeline || [])
            setChecklist(data.checklist || [])
          } else {
            setEventCriteria(null)
          }
          setLoading(false)
        })

        return () => unsubscribeSnapshot()
      } else {
        setUser(null)
        setEventCriteria(null)
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const handleSignOut = async () => {
    await signOut(auth)
  }

  const handleStartPlanning = async (eventType: string, budgetRange: string) => {
    const newEventPlan = {
      eventCriteria: { type: eventType, budgetRange },
      selections: {},
      guestList: [],
      timeline: [],
      checklist: checklists[eventType as keyof typeof checklists].map((task) => ({ task, done: false })),
    }
    await setDoc(eventPlanDocRef, newEventPlan)
  }

  const selectVendor = async (categoryId: string, vendorId: string) => {
    const newSelections = { ...selections }
    if (newSelections[categoryId] === vendorId) {
      delete newSelections[categoryId]
    } else {
      newSelections[categoryId] = vendorId
    }
    await updateDoc(eventPlanDocRef, { selections: newSelections })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <LoginScreen onSignIn={handleSignIn} />
  }

  if (!eventCriteria) {
    return <EventSetupScreen onStartPlanning={handleStartPlanning} />
  }

  return (
    <PlannerScreen
      eventCriteria={eventCriteria}
      selections={selections}
      guestList={guestList}
      timeline={timeline}
      checklist={checklist}
      onSelectVendor={selectVendor}
      onSignOut={handleSignOut}
      eventPlanDocRef={eventPlanDocRef}
      onReset={async () => {
        await setDoc(eventPlanDocRef, {})
      }}
    />
  )
}
