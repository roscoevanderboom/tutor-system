"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface PhilosophyStepProps {
  onComplete: (philosophy: string) => void;
}

export function PhilosophyStep({ onComplete }: PhilosophyStepProps) {
  const [philosophy, setPhilosophy] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Textarea
        placeholder="Share your teaching philosophy..."
        className="min-h-[200px]"
        value={philosophy}
        onChange={(e) => setPhilosophy(e.target.value)}
      />
      <p className="text-sm text-muted-foreground">
        Minimum 100 characters ({philosophy.length}/100)
      </p>
      <Button
        className="w-full"
        disabled={philosophy.length < 100}
        onClick={() => onComplete(philosophy)}
      >
        Complete Profile
      </Button>
    </motion.div>
  );
}
