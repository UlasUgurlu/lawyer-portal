import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { 
  Scale, 
  Users, 
  FileText, 
  Shield, 
  Clock, 
  Mail 
} from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('common');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {t('title')}
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#services" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                {t('nav.services')}
              </Link>
              <Link href="#team" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                {t('nav.team')}
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                {t('nav.contact')}
              </Link>
              <Link href="/auth/login">
                <Button variant="outline">
                  {t('nav.login')}
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button>
                  {t('nav.register')}
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Modern Avukat Bürosu
            <br />
            <span className="text-blue-600">Yönetim Sistemi</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Müvekkil dosyalarını güvenle yönetin, belgeleri saklayın ve avukat-müvekkil iletişimini 
            kolaylaştırın. KVKK uyumlu, güvenli ve kullanıcı dostu platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="w-full sm:w-auto">
                Ücretsiz Deneyin
              </Button>
            </Link>
            <Link href="#demo">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Demo İzleyin
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Özellikler
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Avukat büronuz için ihtiyacınız olan tüm araçlar
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Dosya Yönetimi</CardTitle>
                <CardDescription>
                  Müvekkil dosyalarını organize edin, belge versiyonlarını takip edin
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Güvenlik</CardTitle>
                <CardDescription>
                  End-to-end şifreleme, 2FA ve KVKK uyumlu veri koruması
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Müvekkil Portalı</CardTitle>
                <CardDescription>
                  Müvekkilleriniz dosyalarını güvenle görüntüleyebilir
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Mail className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Güvenli Mesajlaşma</CardTitle>
                <CardDescription>
                  Avukat-müvekkil arasında güvenli iletişim kanalı
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Takvim & Hatırlatıcılar</CardTitle>
                <CardDescription>
                  Duruşma takvimleri ve otomatik hatırlatma sistemi
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Scale className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Faturalandırma</CardTitle>
                <CardDescription>
                  Otomatik fatura oluşturma ve ödeme takip sistemi
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="h-6 w-6" />
                <span className="text-lg font-bold">{t('title')}</span>
              </div>
              <p className="text-gray-400">
                Modern avukat büroları için güvenli ve kullanıcı dostu yönetim sistemi.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Ürün</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white">Özellikler</Link></li>
                <li><Link href="#pricing" className="hover:text-white">Fiyatlandırma</Link></li>
                <li><Link href="#security" className="hover:text-white">Güvenlik</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Destek</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#help" className="hover:text-white">Yardım</Link></li>
                <li><Link href="#docs" className="hover:text-white">Dokümantasyon</Link></li>
                <li><Link href="#contact" className="hover:text-white">İletişim</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Yasal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Gizlilik Politikası</Link></li>
                <li><Link href="/terms" className="hover:text-white">Kullanım Koşulları</Link></li>
                <li><Link href="/kvkk" className="hover:text-white">KVKK</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Avukat Portalı. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
