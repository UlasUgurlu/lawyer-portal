'use client'

import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'
import trMessages from '@/i18n/messages/tr.json'

interface ProvidersProps {
  children: React.ReactNode
  session?: any
  messages?: any
  locale?: string
}

export function Providers({ 
  children, 
  session, 
  messages, 
  locale = 'tr' 
}: ProvidersProps) {
  // Use the imported messages as fallback if messages prop is empty
  const finalMessages = messages && Object.keys(messages).length > 0 ? messages : trMessages
  
  return (
    <SessionProvider session={session}>
      <NextIntlClientProvider 
        locale={locale} 
        messages={finalMessages}
        timeZone="Europe/Istanbul"
      >
        {children}
      </NextIntlClientProvider>
    </SessionProvider>
  )
}
