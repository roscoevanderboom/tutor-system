"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AddLessonDialog } from "@/components/materials/add-material-dialog"
import { MaterialCard } from "@/components/materials/material-card"
import { useUserContext } from "@/contexts/user-context"

export default function MaterialsPage() {
  const { state, addMaterial } = useUserContext()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredmaterials = state.materials.filter(material => 
    material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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
          <AddLessonDialog addMaterial={addMaterial} />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredmaterials.length > 0 ? (
          filteredmaterials.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))
        ) : (
          <div className="md:col-span-2 lg:col-span-3 text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery
                ? "No materials found matching your search."
                : "No materials added yet. Click 'Add material' to create your first material."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
