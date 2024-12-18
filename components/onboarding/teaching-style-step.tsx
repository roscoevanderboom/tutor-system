"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TEACHING_STYLES, type TeachingStyle } from "@/types/onboarding"

interface TeachingStyleStepProps {
  onNext: (style: TeachingStyle) => void;
}

export function TeachingStyleStep({ onNext }: TeachingStyleStepProps) {
  const [selectedStyle, setSelectedStyle] = useState<TeachingStyle | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        {TEACHING_STYLES.map((style) => (
          <Card
            key={style.id}
            className={`cursor-pointer transition-colors ${
              selectedStyle?.id === style.id ? "border-primary" : ""
            }`}
            onClick={() => setSelectedStyle(style)}
          >
            <CardContent className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{style.name}</h3>
                {selectedStyle?.id === style.id && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {style.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        className="w-full mt-8"
        disabled={!selectedStyle}
        onClick={() => selectedStyle && onNext(selectedStyle)}
      >
        Continue
      </Button>
    </motion.div>
  );
}
