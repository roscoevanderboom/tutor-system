"use client"

import { motion } from "framer-motion"
import { BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Material } from "@/types/material"
import Link from "next/link"

interface MaterialCardProps {
  material: Material
}

export function MaterialCard({ material }: MaterialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}  
    >
      <Link href={`/dashboard/materials/edit/${material.id}`}>
        <Card>
          <CardHeader className="flex flex-row items-center space-x-4">
            <BookOpen className="h-8 w-8" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{material.name}</h3>
                <Badge variant="secondary">{material.level}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {material.createdAt}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{material.description}</p>
            <div className="flex flex-wrap gap-2">
              {material.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
