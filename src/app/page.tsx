'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (session) {
      // User is authenticated, redirect based on role
      const role = (session.user as any).role
      switch (role) {
        case 'SUPER_ADMIN':
          router.push('/admin')
          break
        case 'FIRM_ADMIN':
          router.push('/admin/firm')
          break
        case 'LAWYER':
        case 'PARALEGAL':
          router.push('/dashboard')
          break
        case 'CLIENT':
          router.push('/client')
          break
        default:
          router.push('/dashboard')
      }
    } else {
      // User is not authenticated, redirect to login
      router.push('/auth/login')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">AP</span>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return null
}
