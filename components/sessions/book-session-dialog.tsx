"use client"

import { useState } from "react"
import { CalendarIcon, Check } from "lucide-react"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { Lesson } from "@/types/lesson"
import type { Session } from "@/types/session"
import { generateMeetingUrl } from "@/types/session"

interface BookSessionDialogProps {
  lessons: Lesson[];
  onBookSession: (session: Session) => void;
}

export function BookSessionDialog({ lessons, onBookSession }: BookSessionDialogProps) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date>()
  const [selectedLesson, setSelectedLesson] = useState<string>()
  const [selectedTime, setSelectedTime] = useState<string>()

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00"
  ]

  const handleSubmit = () => {
    if (!date || !selectedLesson || !selectedTime) return

    const [hours, minutes] = selectedTime.split(":").map(Number)
    const dateTime = new Date(date)
    dateTime.setHours(hours, minutes)

    const session: Session = {
      id: crypto.randomUUID(),
      lessonId: selectedLesson,
      dateTime,
      meetingUrl: generateMeetingUrl(),
      status: 'scheduled'
    }

    onBookSession(session)
    setOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setDate(undefined)
    setSelectedLesson(undefined)
    setSelectedTime(undefined)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Book New Session</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book a Teaching Session</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Lesson</label>
            <Select value={selectedLesson} onValueChange={setSelectedLesson}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a lesson" />
              </SelectTrigger>
              <SelectContent>
                {lessons.map((lesson) => (
                  <SelectItem key={lesson.id} value={lesson.id}>
                    {lesson.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select Time</label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!date || !selectedLesson || !selectedTime}
          >
            Book Session
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}