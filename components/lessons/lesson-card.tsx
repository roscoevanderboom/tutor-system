"use client"

import { motion } from "framer-motion"
import { BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Lesson } from "@/types/lesson"

interface LessonCardProps {
  lesson: Lesson
}

export function LessonCard({ lesson }: LessonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center space-x-4">
          <BookOpen className="h-8 w-8" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{lesson.name}</h3>
              <Badge variant="secondary">{lesson.level}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {new Date(lesson.createdAt).toLocaleDateString()}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{lesson.description}</p>
          <div className="flex flex-wrap gap-2">
            {lesson.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
