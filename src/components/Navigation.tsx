'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Users, 
  Briefcase, 
  Settings,
  Shield,
  FileText,
  Calendar
} from 'lucide-react'

export function Navigation() {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) return null

  const user = session.user as any
  const isClient = user.role === 'CLIENT'
  const isAdmin = user.role === 'FIRM_ADMIN' || user.role === 'SUPER_ADMIN'
  const isSuperAdmin = user.role === 'SUPER_ADMIN'

  const navItems = [
    {
      name: 'Ana Sayfa',
      icon: Home,
      href: '/dashboard',
      show: true
    },
    {
      name: 'Müvekkil Portal',
      icon: Users,
      href: '/client-portal',
      show: isClient
    },
    {
      name: 'Firma Yönetimi',
      icon: Briefcase,
      href: '/admin/firm',
      show: isAdmin && !isSuperAdmin
    },
    {
      name: 'Sistem Yönetimi',
      icon: Shield,
      href: '/admin',
      show: isSuperAdmin
    },
    {
      name: 'Firma Paneli',
      icon: Settings,
      href: '/admin/firm',
      show: isSuperAdmin
    }
  ]

  const visibleItems = navItems.filter(item => item.show)

  if (visibleItems.length <= 1) return null

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-full shadow-lg border px-6 py-3">
        <div className="flex items-center space-x-4">
          {visibleItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                onClick={() => router.push(item.href)}
                className="flex flex-col items-center space-y-1 p-2 h-auto"
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs">{item.name}</span>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
