import Link from 'next/link'
    import { Button } from '@/components/ui/button'
    import { GraduationCap } from 'lucide-react'

    export default function Home() {
      return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
          <div className="container mx-auto px-4 py-16">
            <nav className="flex justify-between items-center mb-16">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8" />
                <span className="text-2xl font-bold">Teach the World</span>
              </div>
              <div className="space-x-4">
                <Link href="/auth/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Get Started</Button>
                </Link>
              </div>
            </nav>
            
            <main className="text-center">
              <h1 className="text-6xl font-bold mb-6">
                Learn Anything, <span className="text-primary">Anywhere</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Connect with expert tutors worldwide and unlock your full potential through personalized online learning experiences.
              </p>
              <div className="space-x-4">
                <Link href="/auth/register">
                  <Button size="lg" variant="outline">Become a Tutor</Button>
                </Link>
              </div>
            </main>
          </div>
        </div>
      )
    }
