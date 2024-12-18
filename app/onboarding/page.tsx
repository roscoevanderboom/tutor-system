"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProgressHeader } from "@/components/onboarding/progress-header"
import { LanguageStep } from "@/components/onboarding/language-step"
import { SubjectsStep } from "@/components/onboarding/subjects-step"
import { TeachingStyleStep } from "@/components/onboarding/teaching-style-step"
import { PhilosophyStep } from "@/components/onboarding/philosophy-step"
import type { Language, Subject, TeachingStyle } from "@/types/onboarding"

const steps = [
  {
    title: "Choose Your Language",
    description: "Select your preferred language for teaching",
  },
  {
    title: "Select Your Subjects",
    description: "Choose the subjects you're interested in teaching",
  },
  {
    title: "Teaching Style",
    description: "How do you prefer to teach?",
  },
  {
    title: "Teaching Philosophy",
    description: "Share your approach to teaching",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState({
    language: null as Language | null,
    subjects: [] as Subject[],
    teachingStyle: null as TeachingStyle | null,
    philosophy: "",
  });

  const handleLanguageNext = (language: Language) => {
    setProfile(prev => ({ ...prev, language }));
    setCurrentStep(2);
  };

  const handleSubjectsNext = (subjects: Subject[]) => {
    setProfile(prev => ({ ...prev, subjects }));
    setCurrentStep(3);
  };

  const handleStyleNext = (teachingStyle: TeachingStyle) => {
    setProfile(prev => ({ ...prev, teachingStyle }));
    setCurrentStep(4);
  };

  const handleComplete = async (philosophy: string) => {
    setProfile(prev => ({ ...prev, philosophy }));
    // Here you would typically save the profile to your backend
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto px-4 py-16">
        <ProgressHeader
          currentStep={currentStep}
          totalSteps={steps.length}
          title={steps[currentStep - 1].title}
          description={steps[currentStep - 1].description}
        />

        <div className="mt-8">
          {currentStep === 1 && <LanguageStep onNext={handleLanguageNext} />}
          {currentStep === 2 && <SubjectsStep onNext={handleSubjectsNext} />}
          {currentStep === 3 && <TeachingStyleStep onNext={handleStyleNext} />}
          {currentStep === 4 && <PhilosophyStep onComplete={handleComplete} />}
        </div>
      </div>
    </div>
  );
}
