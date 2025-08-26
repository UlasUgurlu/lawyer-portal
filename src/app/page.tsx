'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (session) {
      // User is authenticated, redirect based on role
      const role = session.user.role
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

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 text-center p-4">
        <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-2xl font-bold">AP</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">Avukat Portalına Hoşgeldiniz</h1>
        <p className="text-gray-600 mb-8">Yönetim paneline erişmek için lütfen giriş yapın.</p>
        <Link href="/auth/login">
          <Button>Giriş Yap</Button>
        </Link>
      </div>
    )
  }

  return null
}
