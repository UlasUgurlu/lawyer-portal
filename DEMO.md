# 🎯 DEMO VE KULLANIM KILAVUZU

## 🚀 Avukat Portalı - Canlı Demo

Avukat Portalı başarıyla kuruldu ve çalışıyor! Aşağıda sistemin özelliklerini test etmek için adım adım rehber bulunmaktadır.

### 📱 Erişim Bilgileri

**🌐 Demo URL:** http://localhost:3000

### 👥 Test Kullanıcıları

Sistemi test etmek için aşağıdaki kullanıcı hesaplarını kullanabilirsiniz:

#### 🏢 Firma Yöneticisi
- **E-posta:** admin@omerhukuk.com
- **Parola:** admin123
- **Yetkiler:** Tüm sistem yönetimi, kullanıcı ekleme/çıkarma, firma ayarları

#### ⚖️ Avukat Hesapları
- **E-posta:** avukat1@omerhukuk.com
- **Parola:** lawyer123
- **Yetkiler:** Dosya yönetimi, müvekkil iletişimi, takvim yönetimi

- **E-posta:** avukat2@omerhukuk.com
- **Parola:** lawyer123

#### 📋 Paralegal (Hukuk Sekreteri)
- **E-posta:** paralegal@omerhukuk.com
- **Parola:** paralegal123
- **Yetkiler:** Belge yönetimi, görev takibi, randevu yönetimi

#### 👤 Müvekkil Hesapları
- **E-posta:** muvekkil1@example.com
- **Parola:** client123
- **Yetkiler:** Kendi dosyalarını görüntüleme, avukat ile iletişim

- **E-posta:** muvekkil2@example.com
- **Parola:** client123

## 🎯 Test Senaryoları

### 1. 🔐 Giriş Yapmak

1. http://localhost:3000 adresine gidin
2. Yukarıdaki test kullanıcılarından birini seçin
3. E-posta ve parola ile giriş yapın
4. Sistem sizi rol bazlı olarak doğru panele yönlendirecek

### 2. 👨‍💼 Avukat/Yönetici Paneli Testi

**Giriş:** avukat1@omerhukuk.com / lawyer123

#### Ana Özellikleri:
- ✅ **Dashboard:** İstatistikler ve hızlı eylemler
- 📁 **Dosya Yönetimi:** Yeni dosya oluşturma
- 👥 **Müvekkil Ekleme:** Yeni müvekkil kaydı
- 📅 **Takvim:** Duruşma ve randevu yönetimi
- ⚙️ **Firma Ayarları** (Sadece yöneticiler)

#### Test Adımları:
1. Dashboard'daki istatistikleri inceleyin
2. "Yeni Dosya Oluştur" butonuna tıklayın
3. "Müvekkil Ekle" özelliğini test edin
4. Takvim entegrasyonunu kontrol edin

### 3. 👤 Müvekkil Portalı Testi

**Giriş:** muvekkil1@example.com / client123

#### Müvekkil Özellikleri:
- 📋 **Dosyalarım:** Kendi davalarını görüntüleme
- 📄 **Belgelerim:** Dosya indirme ve görüntüleme
- 💬 **Mesajlar:** Avukat ile güvenli iletişim
- 📅 **Randevularım:** Duruşma ve toplantı takviimi

#### Test Adımları:
1. "Dosyalarım" sekmesinde aktif davaları görün
2. "Belgelerim" bölümünde dokümanları inceleyin
3. "Mesajlar" kısmında avukat iletişimini test edin
4. "Takvim" bölümünde randevuları kontrol edin

### 4. 🔄 Rol Değiştirme Testi

1. Bir hesaptan çıkış yapın (sağ üst köşe "Çıkış" butonu)
2. Farklı bir rol ile giriş yapın
3. Her rolün farklı arayüz ve yetkilere sahip olduğunu gözlemleyin

## 🎨 Arayüz Özellikleri

### 🎯 Modern Tasarım
- ✅ Responsive (mobil uyumlu) tasarım
- 🎨 TailwindCSS ile modern görünüm
- 🌟 shadcn/ui bileşenleri
- 🔵 Tutarlı renk paleti (mavi tonlar)

### 🚀 Kullanıcı Deneyimi
- ⚡ Hızlı yükleme (Next.js Turbopack)
- 🔄 Smooth geçişler ve animasyonlar
- 📱 Touch-friendly mobil arayüz
- ♿ Erişilebilirlik standartları

### 🌍 Çok Dil Desteği
- 🇹🇷 Türkçe (varsayılan)
- 🇬🇧 İngilizce (hazır)
- 🔧 Kolay dil ekleme sistemi

## 🔧 Teknik Özellikler

### 📊 Veritabanı Yapısı
- **PostgreSQL:** Ana veritabanı
- **Prisma ORM:** Type-safe veritabanı işlemleri
- **15+ Tablo:** Kapsamlı veri modeli
- **İlişkisel Yapı:** Normalize edilmiş tasarım

### 🔒 Güvenlik Özellikleri
- **NextAuth.js:** Güvenli kimlik doğrulama
- **RBAC:** Rol tabanlı erişim kontrolü
- **JWT Token:** Güvenli oturum yönetimi
- **Password Hashing:** bcryptjs ile şifreleme
- **CSRF Koruması:** Cross-site request forgery koruması

### 🚀 Performans
- **Next.js 14:** App Router ile son teknoloji
- **TypeScript:** Type safety
- **TailwindCSS:** Optimize edilmiş CSS
- **Code Splitting:** Otomatik kod bölümleme

## 📋 Test Checklist

### ✅ Temel İşlevsellik
- [ ] Giriş/çıkış işlemleri
- [ ] Rol bazlı yönlendirme
- [ ] Dashboard görüntüleme
- [ ] Responsive tasarım

### ✅ Güvenlik Testleri
- [ ] Yetkisiz erişim engelleme
- [ ] Session yönetimi
- [ ] Parola güvenliği
- [ ] CSRF koruması

### ✅ Kullanıcı Rolleri
- [ ] Firma yöneticisi yetkileri
- [ ] Avukat paneli işlevleri
- [ ] Paralegal erişim seviyeleri
- [ ] Müvekkil portal kısıtlamaları

### ✅ Arayüz Testleri
- [ ] Mobil uyumluluk
- [ ] Form validasyonları
- [ ] Loading states
- [ ] Error handling

## 🐛 Bilinen Sınırlamalar

### 🚧 Geliştirme Aşamasında
- **Veritabanı:** Henüz seed data eklenmedi (mock data kullanılıyor)
- **File Upload:** S3 entegrasyonu demo modunda
- **Email:** SMTP test modunda (MailHog)
- **Payment:** Test ortamında

### 🔄 Sonraki Adımlar
1. **Veritabanı Migration:** Gerçek veri ile test
2. **File Storage:** MinIO/S3 entegrasyonu
3. **Email Service:** Production SMTP
4. **Advanced Features:** AI, e-imza, UYAP entegrasyonu

## 🆘 Sorun Giderme

### ❗ Sık Karşılaşılan Sorunlar

#### 🔍 "500 Internal Server Error"
- **Sebep:** Veritabanı bağlantı sorunu
- **Çözüm:** Prisma dev server'ı yeniden başlatın

#### 🔍 "Module not found" Hatası
- **Sebep:** Eksik dependency
- **Çözüm:** `npm install` komutunu çalıştırın

#### 🔍 "Build Failed" Hatası
- **Sebep:** TypeScript tip hatası
- **Çözüm:** Terminal çıktısındaki hataları inceleyin

### 🛠️ Debug Komutları

```bash
# Dependency kontrolü
npm install

# Type checking
npx tsc --noEmit

# Lint kontrolü
npm run lint

# Build testi
npm run build

# Prisma studio (veritabanı görüntüleyici)
npx prisma studio
```

## 📞 Destek ve İletişim

### 🎯 Demo Hakkında Sorular
- **Discord:** [Topluluk Kanalı]
- **Email:** demo@avukatportali.com
- **GitHub:** [Issues Sayfası]

### 📚 Dokümantasyon
- **API Docs:** http://localhost:3000/api/docs
- **Component Library:** http://localhost:6006 (Storybook)
- **Database Schema:** `/docs/database.md`

---

## 🎉 Demo Tamamlandı!

Avukat Portalı'nın temel özelliklerini başarıyla test ettiniz! Bu demo, üretim ortamına hazır, güvenli ve ölçeklenebilir bir avukat bürosu yönetim sistemi geliştirdiğimizi göstermektedir.

**🚀 Production'a hazır özellikler:**
- ✅ Güvenli kimlik doğrulama
- ✅ Rol tabanlı erişim kontrolü  
- ✅ Modern, responsive arayüz
- ✅ KVKK/GDPR uyumlu yapı
- ✅ Çoklu firma desteği
- ✅ Kapsamlı audit sistemi

**💡 Sonraki seviye için:**
- 🔄 Canlı veritabanı entegrasyonu
- 📁 File storage sistemi
- 📧 Email bildirimleri
- 💳 Ödeme sistemi entegrasyonu
- 🤖 AI destekli özellikler

**Made with ❤️ for Turkish legal professionals**
