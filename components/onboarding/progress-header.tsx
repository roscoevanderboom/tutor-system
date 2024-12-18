"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
}

export function ProgressHeader({ currentStep, totalSteps, title, description }: ProgressHeaderProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-4 text-center mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center space-x-2"
      >
        <CheckCircle2 className="h-6 w-6 text-primary" />
        <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </motion.div>
      <div className="w-full bg-secondary rounded-full h-2">
        <motion.div
          className="bg-primary h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
