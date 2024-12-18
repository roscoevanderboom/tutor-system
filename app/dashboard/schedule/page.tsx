"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { BookSessionDialog } from "@/components/sessions/book-session-dialog"
import { SessionCard } from "@/components/sessions/session-card"
import type { Session } from "@/types/session"
import type { Lesson } from "@/types/lesson"

export default function SchedulePage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [lessons] = useState<Lesson[]>([])

  const handleBookSession = (newSession: Session) => {
    setSessions([...sessions, newSession])
  }

  const getLesson = (lessonId: string) => {
    return lessons.find(lesson => lesson.id === lessonId)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Schedule</h1>
        <BookSessionDialog lessons={lessons} onBookSession={handleBookSession} />
      </div>
      
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              className="rounded-md border"
              selected={new Date()}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {sessions.length > 0 ? (
                sessions
                  .filter(session => session.status === 'scheduled')
                  .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
                  .map((session) => {
                    const lesson = getLesson(session.lessonId)
                    if (!lesson) return null
                    return (
                      <SessionCard
                        key={session.id}
                        session={session}
                        lesson={lesson}
                      />
                    )
                  })
              ) : (
                <p className="text-sm text-muted-foreground">
                  No upcoming sessions scheduled.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}