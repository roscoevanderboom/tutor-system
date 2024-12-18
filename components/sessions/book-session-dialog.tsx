"use client"

import { useState } from "react"
import { useSession } from "@/contexts/session-context"
import { useUserContext } from "@/contexts/user-context"
import { CalendarIcon, Check } from "lucide-react"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { Session } from "@/types/session"
import { generateMeetingUrl } from "@/types/session"

interface BookSessionDialogProps {}

export function BookSessionDialog({}: BookSessionDialogProps) {
  const { state: userState } = useUserContext()
  const { addSession } = useSession()
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date>()
  const [selectedMaterial, setSelectedMaterial] = useState<string>()
  const [selectedTime, setSelectedTime] = useState<string>()

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00"
  ]

  const handleSubmit = () => {
    if (!date || !selectedMaterial || !selectedTime) return

    const [hours, minutes] = selectedTime.split(":").map(Number)
    const dateTime = new Date(date)
    dateTime.setHours(hours, minutes)

    const session: Session = {
      id: crypto.randomUUID(),
      materialId: selectedMaterial, // Note: You might want to update the Session type to use materialId instead
      dateTime,
      meetingUrl: generateMeetingUrl(),
      status: 'scheduled'
    }

    addSession(session)
    setOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setDate(undefined)
    setSelectedMaterial(undefined)
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
            <label className="text-sm font-medium">Select Material</label>
            <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a material" />
              </SelectTrigger>
              <SelectContent>
                {userState.materials.map((material) => (
                  <SelectItem key={material.id} value={material.id}>
                    {material.name}
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
            disabled={!date || !selectedMaterial || !selectedTime}
          >
            Book Session
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
