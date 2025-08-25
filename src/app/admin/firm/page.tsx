'use client'

import { useSession, signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  User, 
  LogOut, 
  Building2,
  Users, 
  Calendar, 
  Settings,
  FileText,
  Briefcase,
  Mail,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  UserPlus,
  Shield,
  BarChart3
} from 'lucide-react'

export default function FirmAdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const t = useTranslations('admin')
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const [isCaseDialogOpen, setIsCaseDialogOpen] = useState(false)
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'LAWYER',
    phone: ''
  })
  const [newCaseData, setNewCaseData] = useState({
    title: '',
    client: '',
    type: 'CIVIL',
    description: ''
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (session?.user && !['FIRM_ADMIN', 'SUPER_ADMIN'].includes((session.user as any).role)) {
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

  if (!session || !['FIRM_ADMIN', 'SUPER_ADMIN'].includes((session.user as any).role)) {
    return null
  }

  const user = session.user as any

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/login' })
  }

  const handleAddUser = () => {
    // Simulate adding user
    console.log('Yeni kullanıcı:', newUserData)
    setIsUserDialogOpen(false)
    setNewUserData({ name: '', email: '', role: 'LAWYER', phone: '' })
    alert(`Kullanıcı ${newUserData.name} başarıyla eklendi!`)
  }

  const handleAddCase = () => {
    // Simulate adding case
    console.log('Yeni dosya:', newCaseData)
    setIsCaseDialogOpen(false)
    setNewCaseData({ title: '', client: '', type: 'CIVIL', description: '' })
    alert(`Dosya ${newCaseData.title} başarıyla eklendi!`)
  }

  // Mock data for demonstration
  const firmStats = {
    totalUsers: 15,
    totalCases: 89,
    activeClients: 234,
    monthlyRevenue: 450000,
    pendingInvoices: 12,
    upcomingHearings: 23
  }

  const users = [
    {
      id: 1,
      name: 'Mehmet Kaya',
      email: 'avukat1@omerhukuk.com',
      role: 'LAWYER',
      status: 'ACTIVE',
      lastLogin: '2024-01-10'
    },
    {
      id: 2,
      name: 'Ayşe Yılmaz',
      email: 'avukat2@omerhukuk.com',
      role: 'LAWYER',
      status: 'ACTIVE',
      lastLogin: '2024-01-09'
    },
    {
      id: 3,
      name: 'Fatma Şen',
      email: 'paralegal@omerhukuk.com',
      role: 'PARALEGAL',
      status: 'ACTIVE',
      lastLogin: '2024-01-08'
    }
  ]

  const recentCases = [
    {
      id: 1,
      title: 'İş Davası - ABC Şirketi',
      client: 'Ali Veli',
      lawyer: 'Mehmet Kaya',
      status: 'ACTIVE',
      createdAt: '2024-01-05'
    },
    {
      id: 2,
      title: 'Ticari Dava - XYZ Ltd.',
      client: 'Zeynep Özkan',
      lawyer: 'Ayşe Yılmaz',
      status: 'PENDING',
      createdAt: '2024-01-03'
    }
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'INACTIVE':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Firma Yönetim Paneli
                </h1>
                <p className="text-sm text-gray-600">Ömer Hukuk Bürosu</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{user.name}</span>
                <Badge className="bg-purple-100 text-purple-800">
                  Firma Yöneticisi
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
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="users">Kullanıcılar</TabsTrigger>
            <TabsTrigger value="cases">Dosyalar</TabsTrigger>
            <TabsTrigger value="settings">Ayarlar</TabsTrigger>
            <TabsTrigger value="reports">Raporlar</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Hoş geldiniz, {user.name}!
              </h2>
              <p className="text-gray-600">
                Firma genelindeki aktiviteleri ve istatistikleri buradan takip edebilirsiniz.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{firmStats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">Aktif personel</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Toplam Dosya</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{firmStats.totalCases}</div>
                  <p className="text-xs text-muted-foreground">Tüm dosyalar</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Aktif Müvekkil</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{firmStats.activeClients}</div>
                  <p className="text-xs text-muted-foreground">Kayıtlı müvekkil</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Aylık Gelir</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₺{firmStats.monthlyRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Bu ay</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bekleyen Fatura</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{firmStats.pendingInvoices}</div>
                  <p className="text-xs text-muted-foreground">Ödenmemiş</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Yaklaşan Duruşma</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{firmStats.upcomingHearings}</div>
                  <p className="text-xs text-muted-foreground">Bu hafta</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Son Dosyalar</CardTitle>
                  <CardDescription>Yakın zamanda oluşturulan dosyalar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentCases.map((case_) => (
                      <div key={case_.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{case_.title}</h4>
                          <p className="text-sm text-gray-600">
                            {case_.client} • {case_.lawyer}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(case_.createdAt).toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                        <Badge className={getStatusColor(case_.status)}>
                          {case_.status === 'ACTIVE' ? 'Aktif' : 'Beklemede'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hızlı İşlemler</CardTitle>
                  <CardDescription>Sık kullanılan yönetim işlemleri</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Yeni Kullanıcı Ekle
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
                        <DialogDescription>
                          Firmaya yeni bir kullanıcı ekleyin. Tüm alanları doldurun.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Ad Soyad
                          </Label>
                          <Input
                            id="name"
                            value={newUserData.name}
                            onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}
                            className="col-span-3"
                            placeholder="Kullanıcı adı soyadı"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            E-posta
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={newUserData.email}
                            onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
                            className="col-span-3"
                            placeholder="kullanici@email.com"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phone" className="text-right">
                            Telefon
                          </Label>
                          <Input
                            id="phone"
                            value={newUserData.phone}
                            onChange={(e) => setNewUserData({...newUserData, phone: e.target.value})}
                            className="col-span-3"
                            placeholder="0555 123 45 67"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role" className="text-right">
                            Rol
                          </Label>
                          <Select value={newUserData.role} onValueChange={(value) => setNewUserData({...newUserData, role: value})}>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Rol seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="LAWYER">Avukat</SelectItem>
                              <SelectItem value="ASSISTANT">Asistan</SelectItem>
                              <SelectItem value="SECRETARY">Sekreter</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleAddUser}>
                          Kullanıcı Ekle
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isCaseDialogOpen} onOpenChange={setIsCaseDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Plus className="mr-2 h-4 w-4" />
                        Yeni Dosya Oluştur
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Yeni Dosya Oluştur</DialogTitle>
                        <DialogDescription>
                          Yeni bir hukuki dosya oluşturun. Dosya bilgilerini doldurun.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="caseTitle" className="text-right">
                            Dosya Adı
                          </Label>
                          <Input
                            id="caseTitle"
                            value={newCaseData.title}
                            onChange={(e) => setNewCaseData({...newCaseData, title: e.target.value})}
                            className="col-span-3"
                            placeholder="Dosya başlığı"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="client" className="text-right">
                            Müvekkil
                          </Label>
                          <Input
                            id="client"
                            value={newCaseData.client}
                            onChange={(e) => setNewCaseData({...newCaseData, client: e.target.value})}
                            className="col-span-3"
                            placeholder="Müvekkil adı soyadı"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="caseType" className="text-right">
                            Dosya Türü
                          </Label>
                          <Select value={newCaseData.type} onValueChange={(value) => setNewCaseData({...newCaseData, type: value})}>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Dosya türü seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CIVIL">Hukuk</SelectItem>
                              <SelectItem value="CRIMINAL">Ceza</SelectItem>
                              <SelectItem value="COMMERCIAL">Ticaret</SelectItem>
                              <SelectItem value="FAMILY">Aile</SelectItem>
                              <SelectItem value="LABOR">İş</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
                            Açıklama
                          </Label>
                          <Input
                            id="description"
                            value={newCaseData.description}
                            onChange={(e) => setNewCaseData({...newCaseData, description: e.target.value})}
                            className="col-span-3"
                            placeholder="Kısa açıklama"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleAddCase}>
                          Dosya Oluştur
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('reports')}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Rapor Oluştur
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Firma Ayarları
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Kullanıcı Yönetimi</h3>
                <p className="text-sm text-gray-600">Firma personelini yönetin</p>
              </div>
              <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Yeni Kullanıcı
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
                    <DialogDescription>
                      Firmaya yeni bir kullanıcı ekleyin. Tüm alanları doldurun.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="userName" className="text-right">
                        Ad Soyad
                      </Label>
                      <Input
                        id="userName"
                        value={newUserData.name}
                        onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}
                        className="col-span-3"
                        placeholder="Kullanıcı adı soyadı"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="userEmail" className="text-right">
                        E-posta
                      </Label>
                      <Input
                        id="userEmail"
                        type="email"
                        value={newUserData.email}
                        onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
                        className="col-span-3"
                        placeholder="kullanici@email.com"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="userPhone" className="text-right">
                        Telefon
                      </Label>
                      <Input
                        id="userPhone"
                        value={newUserData.phone}
                        onChange={(e) => setNewUserData({...newUserData, phone: e.target.value})}
                        className="col-span-3"
                        placeholder="0555 123 45 67"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="userRole" className="text-right">
                        Rol
                      </Label>
                      <Select value={newUserData.role} onValueChange={(value) => setNewUserData({...newUserData, role: value})}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Rol seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LAWYER">Avukat</SelectItem>
                          <SelectItem value="ASSISTANT">Asistan</SelectItem>
                          <SelectItem value="SECRETARY">Sekreter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddUser}>
                      Kullanıcı Ekle
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">
                            Son giriş: {new Date(user.lastLogin).toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getRoleColor(user.role)}>
                          {user.role === 'LAWYER' ? 'Avukat' : 'Paralegal'}
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          Aktif
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => alert(`${user.name} düzenleme sayfası açılıyor...`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            if (confirm(`${user.name} kullanıcısını silmek istediğinizden emin misiniz?`)) {
                              alert(`${user.name} kullanıcısı silindi!`)
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cases Tab */}
          <TabsContent value="cases" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Dosya Yönetimi</h3>
                <p className="text-sm text-gray-600">Tüm firma dosyalarını görüntüleyin</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Yeni Dosya
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Dosya listesi</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Dosya yönetimi sayfası geliştirme aşamasında
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Firma Ayarları</h3>
              <p className="text-sm text-gray-600">Firma bilgilerini ve ayarlarını düzenleyin</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Firma Bilgileri</CardTitle>
                  <CardDescription>Temel firma bilgilerini güncelleyin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="firmName">Firma Adı</Label>
                    <Input id="firmName" defaultValue="Ömer Hukuk Bürosu" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxNumber">Vergi Numarası</Label>
                    <Input id="taxNumber" defaultValue="1234567890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Adres</Label>
                    <Input id="address" defaultValue="Kızılay, Ankara" />
                  </div>
                  <Button
                    onClick={() => {
                      alert('Firma bilgileri güncelleme özelliği yakında eklenecek!')
                    }}
                  >
                    Kaydet
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Güvenlik Ayarları</CardTitle>
                  <CardDescription>Güvenlik politikalarını yönetin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>İki Faktörlü Doğrulama</Label>
                      <p className="text-sm text-gray-600">Tüm kullanıcılar için zorunlu</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        alert('İki faktörlü doğrulama ayarları yakında eklenecek!')
                      }}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Ayarla
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Parola Politikası</Label>
                      <p className="text-sm text-gray-600">Minimum 8 karakter, özel karakter</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        alert('Parola politikası düzenleme özelliği yakında eklenecek!')
                      }}
                    >
                      Düzenle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Raporlar</h3>
              <p className="text-sm text-gray-600">Firma performansını analiz edin</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Raporlar</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Analitik raporlar geliştirme aşamasında
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
