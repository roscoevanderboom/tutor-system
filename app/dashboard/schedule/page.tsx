"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { BookSessionDialog } from "@/components/sessions/book-session-dialog"
import { SessionCard } from "@/components/sessions/session-card"
import { useSession } from "@/contexts/session-context"
import { useUserContext } from "@/contexts/user-context"

export default function SchedulePage() {
  const { state: { sessions } } = useSession()
  const { state: { materials } } = useUserContext()

  const getMaterial = (materialId: string) => {
    return materials.find(material => material.id === materialId) || null
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Schedule</h1>
        <BookSessionDialog />
      </div>
      
      <div className="grid gap-8 md:grid-cols-[335px_1fr]">
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
                    const material = getMaterial(session.materialId)
                    console.log(material)
                    if(!material) return null;
                    return (
                      <SessionCard
                        key={session.id}
                        session={session}
                        material={material}
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
