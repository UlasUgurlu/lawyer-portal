'use client'

import { useSession, signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { 
  User, 
  LogOut, 
  FileText,
  Calendar,
  Mail,
  Download,
  MessageCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Plus
} from 'lucide-react'

export default function ClientPortalPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const t = useTranslations('clientPortal')
  const [activeTab, setActiveTab] = useState('cases')
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [isReadMessageDialogOpen, setIsReadMessageDialogOpen] = useState(false)
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)

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

  const handleSendMessage = () => {
    console.log('Yeni mesaj:', newMessage)
    setIsMessageDialogOpen(false)
    setNewMessage('')
    alert('Mesajınız başarıyla gönderildi!')
  }

  const handleReadMessage = (message: any) => {
    setSelectedMessage(message)
    setIsReadMessageDialogOpen(true)
    // Mesajı okundu olarak işaretle
    message.isRead = true
  }

  const handleAppointmentDetails = (appointment: any) => {
    setSelectedAppointment(appointment)
    setIsAppointmentDialogOpen(true)
  }

  const handleCancelAppointment = (appointment: any) => {
    if (confirm(`${appointment.title} randevusunu iptal etmek istediğinizden emin misiniz?`)) {
      alert(`${appointment.title} randevusu iptal edildi!`)
    }
  }

  // Mock data
  const cases = [
    {
      id: 1,
      title: 'İş Hukuku Davası',
      status: 'ACTIVE',
      lawyer: 'Av. Mehmet Yılmaz',
      nextHearing: '2025-09-15',
      description: 'İşten çıkarılma davası'
    },
    {
      id: 2,
      title: 'Emlak Satış Sözleşmesi',
      status: 'PENDING',
      lawyer: 'Av. Ayşe Kaya',
      nextHearing: '2025-09-22',
      description: 'Satış sözleşmesi düzenlenmesi'
    },
    {
      id: 3,
      title: 'Aile Hukuku Danışmanlık',
      status: 'COMPLETED',
      lawyer: 'Av. Fatma Demir',
      nextHearing: null,
      description: 'Velayet hakkı danışmanlığı'
    }
  ]

  const documents = [
    { id: 1, name: 'Dava Dilekçesi.pdf', date: '2025-08-20', size: '245 KB', caseId: 1 },
    { id: 2, name: 'Sözleşme Taslağı.docx', date: '2025-08-18', size: '156 KB', caseId: 2 },
    { id: 3, name: 'Hukuki Görüş.pdf', date: '2025-08-15', size: '389 KB', caseId: 3 },
    { id: 4, name: 'Mahkeme Kararı.pdf', date: '2025-08-10', size: '512 KB', caseId: 1 }
  ]

  const messages = [
    {
      id: 1,
      from: 'Av. Mehmet Yılmaz',
      subject: 'Dosya Güncelleme - İş Hukuku Davası',
      content: `Sayın müvekkilim,

İş hukuku davanızla ilgili son gelişmeleri paylaşmak istiyorum:

• Karşı tarafın vekili savunma dilekçesini sundu
• Mahkeme yeni delil sunma talebimizi kabul etti  
• Sonraki duruşma tarihi 15 Eylül 2025 olarak belirlendi
• İk terminasyon sürecindeki eksik belgeler tamamlandı

Duruşma öncesi hazırlık için 10 Eylül'de randevu alalım.

Saygılarımla,
Av. Mehmet Yılmaz
Ömer Hukuk Bürosu`,
      date: '2025-08-23',
      isRead: false
    },
    {
      id: 2,
      from: 'Av. Ayşe Kaya',
      subject: 'Sözleşme Onayı Bekleniyor',
      content: `Sayın müvekkilim,

Emlak satış sözleşmesi taslağını hazırladık. Sözleşmede:

• Satış bedeli: 2.500.000 TL
• Ödeme planı: %30 peşin, %70 kredili
• Teslim tarihi: 30 Ekim 2025
• Tapu devri: Aralık 2025

Lütfen sözleşmeyi inceleyip onayınızı bekliyorum.

İyi çalışmalar,
Av. Ayşe Kaya`,
      date: '2025-08-22',
      isRead: true
    }
  ]

  const appointments = [
    {
      id: 1,
      title: 'Görüşme Randevusu',
      lawyer: 'Av. Mehmet Yılmaz',
      date: '2025-08-30',
      time: '14:00',
      location: 'Büro - Kat 3'
    },
    {
      id: 2,
      title: 'Duruşma',
      lawyer: 'Av. Ayşe Kaya',
      date: '2025-09-15',
      time: '10:30',
      location: 'Ankara Adliyesi - Salon 12'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-green-100 text-green-800">Aktif</Badge>
      case 'PENDING':
        return <Badge className="bg-yellow-100 text-yellow-800">Beklemede</Badge>
      case 'COMPLETED':
        return <Badge className="bg-blue-100 text-blue-800">Tamamlandı</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Müvekkil Portalı
                </h1>
                <p className="text-sm text-gray-600">Dosyalarınızı takip edin</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{user.name}</span>
                <Badge className="bg-orange-100 text-orange-800">
                  Müvekkil
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
            Hukuki süreçlerinizi buradan takip edebilir, avukatınızla iletişim kurabilirsiniz.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Dosya</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cases.length}</div>
              <p className="text-xs text-muted-foreground">Tüm dosyalarınız</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktif Dosya</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cases.filter(c => c.status === 'ACTIVE').length}</div>
              <p className="text-xs text-muted-foreground">Devam eden</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Belgeler</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documents.length}</div>
              <p className="text-xs text-muted-foreground">İndirilebilir</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Randevular</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointments.length}</div>
              <p className="text-xs text-muted-foreground">Yaklaşan</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cases">Dosyalarım</TabsTrigger>
            <TabsTrigger value="documents">Belgeler</TabsTrigger>
            <TabsTrigger value="messages">Mesajlar</TabsTrigger>
            <TabsTrigger value="appointments">Randevular</TabsTrigger>
          </TabsList>

          {/* Cases Tab */}
          <TabsContent value="cases" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Dosyalarım</h3>
                <p className="text-sm text-gray-600">Tüm hukuki dosyalarınızı görüntüleyin</p>
              </div>
            </div>

            <div className="grid gap-4">
              {cases.map((case_) => (
                <Card key={case_.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{case_.title}</h4>
                          {getStatusBadge(case_.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{case_.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Avukat: {case_.lawyer}</span>
                          {case_.nextHearing && (
                            <span>Sonraki Duruşma: {case_.nextHearing}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button 
                          size="sm"
                          onClick={() => alert(`${case_.title} detayları görüntüleniyor...`)}
                        >
                          Detaylar
                        </Button>
                        <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Mesaj Gönder
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Avukatınıza Mesaj Gönderin</DialogTitle>
                              <DialogDescription>
                                {case_.lawyer} ile iletişime geçin
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="message">Mesajınız</Label>
                                <Textarea
                                  id="message"
                                  value={newMessage}
                                  onChange={(e) => setNewMessage(e.target.value)}
                                  placeholder="Mesajınızı buraya yazın..."
                                  rows={4}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={handleSendMessage}>
                                <Send className="h-4 w-4 mr-2" />
                                Gönder
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Belgeler</h3>
              <p className="text-sm text-gray-600">Dosyalarınızla ilgili belgeleri indirin</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <p className="text-sm text-gray-600">
                            {doc.date} • {doc.size}
                          </p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => alert(`${doc.name} indiriliyor...`)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        İndir
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Mesajlar</h3>
              <p className="text-sm text-gray-600">Avukatınızdan gelen mesajları görüntüleyin</p>
            </div>

            <div className="space-y-4">
              {messages.map((message) => (
                <Card key={message.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{message.subject}</h4>
                          {!message.isRead && (
                            <Badge className="bg-red-100 text-red-800">Yeni</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Gönderen: {message.from}</p>
                        <p className="text-sm mb-3">{message.content}</p>
                        <p className="text-xs text-gray-500">{message.date}</p>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => handleReadMessage(message)}
                      >
                        Oku
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Randevular</h3>
              <p className="text-sm text-gray-600">Yaklaşan randevu ve duruşmalarınız</p>
            </div>

            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{appointment.title}</h4>
                          <p className="text-sm text-gray-600">{appointment.lawyer}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{appointment.date} • {appointment.time}</span>
                          </div>
                          <p className="text-sm text-gray-500">{appointment.location}</p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button 
                          size="sm"
                          onClick={() => handleAppointmentDetails(appointment)}
                        >
                          Detaylar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCancelAppointment(appointment)}
                        >
                          İptal Et
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Mesaj Okuma Modal */}
        <Dialog open={isReadMessageDialogOpen} onOpenChange={setIsReadMessageDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{selectedMessage?.subject}</DialogTitle>
              <DialogDescription>
                {selectedMessage?.from} tarafından gönderildi • {selectedMessage?.date}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm whitespace-pre-wrap">{selectedMessage?.content}</p>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsReadMessageDialogOpen(false)}
              >
                Kapat
              </Button>
              <Button 
                onClick={() => {
                  setIsReadMessageDialogOpen(false)
                  setIsMessageDialogOpen(true)
                }}
              >
                <Send className="h-4 w-4 mr-2" />
                Yanıtla
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Randevu Detayları Modal */}
        <Dialog open={isAppointmentDialogOpen} onOpenChange={setIsAppointmentDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{selectedAppointment?.title}</DialogTitle>
              <DialogDescription>
                Randevu Detayları
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Avukat</Label>
                  <p className="text-sm">{selectedAppointment?.lawyer}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Tarih</Label>
                  <p className="text-sm">{selectedAppointment?.date}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Saat</Label>
                  <p className="text-sm">{selectedAppointment?.time}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Lokasyon</Label>
                  <p className="text-sm">{selectedAppointment?.location}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <Label className="text-sm font-medium text-gray-500">Randevu Notları</Label>
                <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    • Lütfen randevu saatinden 15 dakika önce gelin
                    • Yanınızda kimlik belgesi bulundurun  
                    • Dosyanızla ilgili tüm belgeleri getirin
                    • Randevu iptali için en az 24 saat önceden haber verin
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <Label className="text-sm font-medium text-gray-500">İletişim</Label>
                <div className="mt-2 space-y-1">
                  <p className="text-sm">📞 0312 123 45 67</p>
                  <p className="text-sm">📧 randevu@omerhukuk.com</p>
                  <p className="text-sm">📍 {selectedAppointment?.location}</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsAppointmentDialogOpen(false)}
              >
                Kapat
              </Button>
              <Button 
                variant="destructive"
                onClick={() => {
                  setIsAppointmentDialogOpen(false)
                  handleCancelAppointment(selectedAppointment)
                }}
              >
                Randevu İptal Et
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
