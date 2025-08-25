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
  Shield,
  Building2,
  Users, 
  Briefcase,
  DollarSign,
  Activity,
  AlertTriangle
} from 'lucide-react'

export default function SuperAdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (session?.user && (session.user as any).role !== 'SUPER_ADMIN') {
      // If not super admin, redirect to firm admin or dashboard
      const userRole = (session.user as any).role
      if (userRole === 'FIRM_ADMIN') {
        router.push('/admin/firm')
      } else {
        router.push('/dashboard')
      }
    }
  }, [status, session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session || (session.user as any).role !== 'SUPER_ADMIN') {
    return null
  }

  const user = session.user as any

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/login' })
  }

  // Mock data for system overview
  const systemStats = {
    totalFirms: 15,
    totalUsers: 342,
    totalCases: 1247,
    systemUptime: '99.9%',
    activeSubscriptions: 12,
    totalRevenue: 2340000
  }

  const recentFirms = [
    {
      id: 1,
      name: 'Ömer Hukuk Bürosu',
      users: 15,
      cases: 89,
      status: 'ACTIVE',
      subscription: 'PREMIUM'
    },
    {
      id: 2,
      name: 'Ankara Adalet Bürosu',
      users: 8,
      cases: 45,
      status: 'ACTIVE',
      subscription: 'STANDARD'
    },
    {
      id: 3,
      name: 'İstanbul Hukuk Merkezi',
      users: 25,
      cases: 156,
      status: 'ACTIVE',
      subscription: 'ENTERPRISE'
    }
  ]

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Sunucu kapasitesi %80\'e ulaştı',
      time: '2 saat önce'
    },
    {
      id: 2,
      type: 'info',
      message: 'Yeni firma kaydı: İzmir Hukuk Bürosu',
      time: '5 saat önce'
    },
    {
      id: 3,
      type: 'success',
      message: 'Sistem güncellemesi tamamlandı',
      time: '1 gün önce'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Süper Admin Paneli
                </h1>
                <p className="text-sm text-gray-600">Sistem Yönetimi</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{user.name}</span>
                <Badge className="bg-red-100 text-red-800">
                  Süper Admin
                </Badge>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Çıkış Yap</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Hoş geldiniz, {user.name}!
          </h2>
          <p className="text-gray-600">
            Sistem genelindeki tüm firmaları ve kullanıcıları buradan yönetebilirsiniz.
          </p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Firma</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalFirms}</div>
              <p className="text-xs text-muted-foreground">Aktif firmalar</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Tüm sistemde</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Dosya</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalCases}</div>
              <p className="text-xs text-muted-foreground">Sistem genelinde</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sistem Uptime</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.systemUptime}</div>
              <p className="text-xs text-muted-foreground">Son 30 gün</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktif Abonelik</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.activeSubscriptions}</div>
              <p className="text-xs text-muted-foreground">Ödeme yapan firmalar</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₺{systemStats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Bu ay</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Firms */}
          <Card>
            <CardHeader>
              <CardTitle>Son Firmalar</CardTitle>
              <CardDescription>Yakın zamanda kayıt olan firmalar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFirms.map((firm) => (
                  <div key={firm.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{firm.name}</h4>
                        <p className="text-sm text-gray-600">
                          {firm.users} kullanıcı • {firm.cases} dosya
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge className="bg-green-100 text-green-800">
                        {firm.status === 'ACTIVE' ? 'Aktif' : 'Pasif'}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => alert(`${firm.name} yönetim paneli açılıyor...`)}
                      >
                        Yönet
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Sistem Bildirimleri</CardTitle>
              <CardDescription>Önemli sistem olayları ve uyarılar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => window.alert(`${alert.message} detayları görüntüleniyor...`)}
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.type === 'warning' ? 'bg-yellow-500' :
                      alert.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Hızlı İşlemler</CardTitle>
            <CardDescription>Sık kullanılan sistem yönetimi işlemleri</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => {
                  alert('Yeni firma ekleme formu yakında eklenecek!')
                }}
              >
                <Building2 className="h-6 w-6" />
                <span className="text-sm">Yeni Firma</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => {
                  alert('Kullanıcı yönetimi paneli yakında eklenecek!')
                }}
              >
                <Users className="h-6 w-6" />
                <span className="text-sm">Kullanıcı Yönetimi</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => {
                  alert('Sistem izleme paneli yakında eklenecek!')
                }}
              >
                <Activity className="h-6 w-6" />
                <span className="text-sm">Sistem İzleme</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => {
                  alert('Destek talepleri paneli yakında eklenecek!')
                }}
              >
                <AlertTriangle className="h-6 w-6" />
                <span className="text-sm">Destek Talepleri</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
