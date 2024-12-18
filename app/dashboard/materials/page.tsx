"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AddLessonDialog } from "@/components/lessons/add-lesson-dialog"
import { LessonCard } from "@/components/lessons/lesson-card"
import type { Lesson } from "@/types/lesson"

export default function MaterialsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const handleAddLesson = (newLesson: Lesson) => {
    setLessons([newLesson, ...lessons])
  }

  const filteredLessons = lessons.filter(lesson => 
    lesson.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Learning Materials</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search materials..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <AddLessonDialog onAddLesson={handleAddLesson} />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredLessons.length > 0 ? (
          filteredLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))
        ) : (
          <div className="md:col-span-2 lg:col-span-3 text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery
                ? "No lessons found matching your search."
                : "No lessons added yet. Click 'Add Lesson' to create your first lesson."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
