"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SUBJECTS, type Subject } from "@/types/onboarding"

interface SubjectsStepProps {
  onNext: (subjects: Subject[]) => void;
}

export function SubjectsStep({ onNext }: SubjectsStepProps) {
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);

  const toggleSubject = (subject: Subject) => {
    setSelectedSubjects(prev =>
      prev.some(s => s.id === subject.id)
        ? prev.filter(s => s.id !== subject.id)
        : [...prev, subject]
    );
  };

  const categories = Array.from(new Set(SUBJECTS.map(s => s.category)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h3 className="font-medium text-lg">{category}</h3>
          <div className="grid grid-cols-2 gap-4">
            {SUBJECTS.filter(s => s.category === category).map((subject) => (
              <Button
                key={subject.id}
                variant={selectedSubjects.some(s => s.id === subject.id) ? "default" : "outline"}
                className="h-auto py-4 px-6 flex items-center justify-between"
                onClick={() => toggleSubject(subject)}
              >
                <span>{subject.name}</span>
                {selectedSubjects.some(s => s.id === subject.id) && (
                  <Check className="h-4 w-4 ml-2" />
                )}
              </Button>
            ))}
          </div>
        </div>
      ))}
      <Button
        className="w-full mt-8"
        disabled={selectedSubjects.length === 0}
        onClick={() => onNext(selectedSubjects)}
      >
        Continue
      </Button>
    </motion.div>
  );
}