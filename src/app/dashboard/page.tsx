'use client'

import { useSession, signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  LogOut, 
  FileText, 
  Users, 
  Calendar, 
  Settings,
  Home,
  Briefcase,
  Mail,
  DollarSign
} from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const t = useTranslations('dashboard')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const user = session.user as any
  const isLawyer = user.role === 'LAWYER' || user.role === 'FIRM_ADMIN'
  const isClient = user.role === 'CLIENT'
  const isAdmin = user.role === 'FIRM_ADMIN' || user.role === 'SUPER_ADMIN'

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/login' })
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'bg-red-100 text-red-800'
      case 'FIRM_ADMIN':
        return 'bg-purple-100 text-purple-800'
      case 'LAWYER':
        return 'bg-blue-100 text-blue-800'
      case 'PARALEGAL':
        return 'bg-green-100 text-green-800'
      case 'CLIENT':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleTitle = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return t('superAdmin')
      case 'FIRM_ADMIN':
        return t('firmAdmin')
      case 'LAWYER':
        return t('lawyer')
      case 'PARALEGAL':
        return t('paralegal')
      case 'CLIENT':
        return t('client')
      default:
        return role
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">AP</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                {t('title')}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{user.name}</span>
                <Badge className={getRoleColor(user.role)}>
                  {getRoleTitle(user.role)}
                </Badge>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>{t('signOut')}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('welcome')}, {user.name}!
          </h2>
          <p className="text-gray-600">
            {isClient 
              ? t('clientWelcomeMessage')
              : isLawyer 
                ? t('lawyerWelcomeMessage') 
                : t('defaultWelcomeMessage')
            }
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isClient ? (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('myCases')}</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">{t('activeCases')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('documents')}</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">{t('totalDocuments')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('messages')}</CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">{t('unreadMessages')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('appointments')}</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">{t('upcomingAppointments')}</p>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('totalCases')}</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">{t('activeCases')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('clients')}</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">{t('totalClients')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('revenue')}</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₺125,000</div>
                  <p className="text-xs text-muted-foreground">{t('thisMonth')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('hearings')}</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">{t('thisWeek')}</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('quickActions')}</CardTitle>
              <CardDescription>
                {t('quickActionsDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {isClient ? (
                <>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/client-portal')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {t('viewMyCases')}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      alert('Mesaj gönderme özelliği yakında eklenecek!')
                    }}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    {t('sendMessage')}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      alert('Randevu planlama özelliği yakında eklenecek!')
                    }}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {t('scheduleAppointment')}
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      if (isAdmin) {
                        router.push('/admin/firm')
                      } else {
                        alert('Yeni dosya oluşturma özelliği yakında eklenecek!')
                      }
                    }}
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    {t('createNewCase')}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      if (isAdmin) {
                        router.push('/admin/firm')
                      } else {
                        alert('Müvekkil ekleme özelliği yakında eklenecek!')
                      }
                    }}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    {t('addClient')}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      alert('Duruşma planlama özelliği yakında eklenecek!')
                    }}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {t('scheduleHearing')}
                  </Button>
                  {isAdmin && (
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => router.push('/admin/firm')}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      {t('firmSettings')}
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('recentActivity')}</CardTitle>
              <CardDescription>
                {t('recentActivityDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t('sampleActivity1')}</p>
                    <p className="text-xs text-muted-foreground">2 {t('hoursAgo')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t('sampleActivity2')}</p>
                    <p className="text-xs text-muted-foreground">1 {t('dayAgo')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t('sampleActivity3')}</p>
                    <p className="text-xs text-muted-foreground">3 {t('daysAgo')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
