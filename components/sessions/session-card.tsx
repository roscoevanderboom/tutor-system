"use client"

import { motion } from "framer-motion"
import { format } from "date-fns"
import { Video, Calendar, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Session } from "@/types/session"
import type { Lesson } from "@/types/lesson"

interface SessionCardProps {
  session: Session;
  lesson: Lesson;
}

export function SessionCard({ session, lesson }: SessionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center space-x-4">
          <Video className="h-8 w-8" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{lesson.name}</h3>
              <Badge
                variant={session.status === 'scheduled' ? 'default' : 'secondary'}
              >
                {session.status}
              </Badge>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(session.dateTime), "PPP p")}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Badge variant="outline">{lesson.level}</Badge>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open(session.meetingUrl, '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Join Meeting
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
