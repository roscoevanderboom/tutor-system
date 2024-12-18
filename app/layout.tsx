import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AppProvider } from '@/contexts/app-context'
import { UserProvider } from '@/contexts/user-context'
import { SessionProvider } from '@/contexts/session-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Teach the World - Online Tutoring Platform',
  description: 'Connect with expert tutors worldwide and learn anything, anywhere.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <UserProvider>
              <SessionProvider>
                {children}
                <Toaster />
              </SessionProvider>
            </UserProvider>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
