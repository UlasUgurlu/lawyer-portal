'use client'

import { useSession, signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  LogOut, 
  FileText, 
  Calendar, 
  Mail,
  Download,
  Clock,
  AlertCircle,
  CheckCircle,
  Eye
} from 'lucide-react'

export default function ClientPortalPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const t = useTranslations('client')
  const [activeTab, setActiveTab] = useState('cases')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (session?.user && (session.user as any).role !== 'CLIENT') {
      router.push('/dashboard')
    }
  }, [status, session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session || (session.user as any).role !== 'CLIENT') {
    return null
  }

  const user = session.user as any

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/login' })
  }

  // Mock data for demonstration
  const cases = [
    {
      id: 1,
      title: 'İş Davası - Kıdem Tazminatı',
      caseNumber: '2024/123',
      status: 'ACTIVE',
      lawyer: 'Av. Mehmet Demir',
      nextHearing: '2024-02-15',
      lastUpdate: '2024-01-10'
    },
    {
      id: 2,
      title: 'Ticari Dava - Sözleşme İhlali',
      caseNumber: '2024/089',
      status: 'PENDING',
      lawyer: 'Av. Ayşe Kaya',
      nextHearing: '2024-02-28',
      lastUpdate: '2024-01-05'
    },
    {
      id: 3,
      title: 'Miras Davası',
      caseNumber: '2023/456',
      status: 'CLOSED',
      lawyer: 'Av. Mehmet Demir',
      nextHearing: null,
      lastUpdate: '2023-12-20'
    }
  ]

  const documents = [
    {
      id: 1,
      name: 'Dava Dilekçesi - İş Davası',
      type: 'PDF',
      size: '2.3 MB',
      uploadDate: '2024-01-10',
      caseId: 1
    },
    {
      id: 2,
      name: 'İş Sözleşmesi',
      type: 'PDF',
      size: '1.8 MB',
      uploadDate: '2024-01-08',
      caseId: 1
    },
    {
      id: 3,
      name: 'Ticari Sözleşme',
      type: 'PDF',
      size: '3.1 MB',
      uploadDate: '2024-01-05',
      caseId: 2
    }
  ]

  const messages = [
    {
      id: 1,
      from: 'Av. Mehmet Demir',
      subject: 'Duruşma Hazırlıkları Hakkında',
      date: '2024-01-10',
      read: false,
      preview: 'Sayın müvekkilim, önümüzdeki duruşma için gerekli belgeler...'
    },
    {
      id: 2,
      from: 'Av. Ayşe Kaya',
      subject: 'Dava Gelişmeleri',
      date: '2024-01-08',
      read: true,
      preview: 'Merhaba, davanızla ilgili son gelişmeleri paylaşmak istiyorum...'
    },
    {
      id: 3,
      from: 'Büro Sekreteri',
      subject: 'Randevu Hatırlatması',
      date: '2024-01-05',
      read: true,
      preview: '15 Şubat tarihinde saat 14:00 için randevunuz bulunmaktadır...'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <CheckCircle className="h-4 w-4" />
      case 'PENDING':
        return <Clock className="h-4 w-4" />
      case 'CLOSED':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return t('active')
      case 'PENDING':
        return t('pending')
      case 'CLOSED':
        return t('closed')
      default:
        return status
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
                <Badge className="bg-orange-100 text-orange-800">
                  {t('client')}
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
            {t('portalDescription')}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('activeCases')}</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">{t('totalActive')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('documents')}</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documents.length}</div>
              <p className="text-xs text-muted-foreground">{t('available')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('messages')}</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {messages.filter(m => !m.read).length}
              </div>
              <p className="text-xs text-muted-foreground">{t('unread')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('hearings')}</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">{t('upcoming')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="cases">{t('myCases')}</TabsTrigger>
            <TabsTrigger value="documents">{t('documents')}</TabsTrigger>
            <TabsTrigger value="messages">{t('messages')}</TabsTrigger>
            <TabsTrigger value="calendar">{t('calendar')}</TabsTrigger>
          </TabsList>

          <TabsContent value="cases" className="space-y-4">
            {cases.map((case_) => (
              <Card key={case_.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{case_.title}</CardTitle>
                      <CardDescription>
                        {t('caseNumber')}: {case_.caseNumber} | {t('lawyer')}: {case_.lawyer}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(case_.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(case_.status)}
                        <span>{getStatusText(case_.status)}</span>
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">
                        <Calendar className="inline h-4 w-4 mr-1" />
                        {t('nextHearing')}: {case_.nextHearing ? new Date(case_.nextHearing).toLocaleDateString('tr-TR') : t('notScheduled')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        <Clock className="inline h-4 w-4 mr-1" />
                        {t('lastUpdate')}: {new Date(case_.lastUpdate).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      {t('viewDetails')}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      {t('contactLawyer')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            {documents.map((doc) => (
              <Card key={doc.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <p className="text-sm text-gray-600">
                          {doc.type} • {doc.size} • {new Date(doc.uploadDate).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        {t('view')}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        {t('download')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            {messages.map((message) => (
              <Card key={message.id} className={!message.read ? 'border-blue-200 bg-blue-50' : ''}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className={`font-medium ${!message.read ? 'font-bold' : ''}`}>
                          {message.subject}
                        </h3>
                        {!message.read && (
                          <Badge variant="secondary" className="text-xs">
                            {t('new')}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {t('from')}: {message.from} • {new Date(message.date).toLocaleDateString('tr-TR')}
                      </p>
                      <p className="text-sm text-gray-700">{message.preview}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      {t('read')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('upcomingAppointments')}</CardTitle>
                <CardDescription>
                  {t('calendarDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Calendar className="h-8 w-8 text-blue-600" />
                    <div className="flex-1">
                      <h3 className="font-medium">{t('lawyerMeeting')}</h3>
                      <p className="text-sm text-gray-600">
                        15 Şubat 2024, 14:00 - Av. Mehmet Demir
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      {t('details')}
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Calendar className="h-8 w-8 text-green-600" />
                    <div className="flex-1">
                      <h3 className="font-medium">{t('courtHearing')}</h3>
                      <p className="text-sm text-gray-600">
                        28 Şubat 2024, 09:30 - İstanbul Anadolu Adliyesi
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      {t('details')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
