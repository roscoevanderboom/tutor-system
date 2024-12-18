"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LANGUAGES, type Language } from "@/types/onboarding"

interface LanguageStepProps {
  onNext: (language: Language) => void;
}

export function LanguageStep({ onNext }: LanguageStepProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        {LANGUAGES.map((language) => (
          <Button
            key={language.code}
            variant={selectedLanguage?.code === language.code ? "default" : "outline"}
            className="h-auto py-4 px-6 flex items-center justify-between"
            onClick={() => setSelectedLanguage(language)}
          >
            <span>{language.name}</span>
            {selectedLanguage?.code === language.code && (
              <Check className="h-4 w-4 ml-2" />
            )}
          </Button>
        ))}
      </div>
      <Button
        className="w-full mt-8"
        disabled={!selectedLanguage}
        onClick={() => selectedLanguage && onNext(selectedLanguage)}
      >
        Continue
      </Button>
    </motion.div>
  );
}