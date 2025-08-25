# Avukat Portalı - Lawyer Office Management System

Modern, güvenli ve KVKK uyumlu avukat bürosu yönetim sistemi. Müvekkil dosyalarını yönetin, belgelerinizi güvenle saklayın ve avukat-müvekkil iletişimini kolaylaştırın.

## 🚀 Özellikler

### 📁 Dosya Yönetimi
- Çoklu dosya türü desteği (Dava, İcra, Danışmanlık)
- Dosya durumu takibi (Aktif, Beklemede, Kapalı, Arşivlenmiş)
- Müvekkil ve ekip atamaları
- Zaman çizelgesi ve notlar

### 📄 Belge Yönetimi
- Güvenli dosya yükleme ve depolama
- Belge versiyonlama sistemi
- OCR metin çıkarımı ve arama
- Etiketleme ve kategorilendirme
- Görünürlük kontrolü (İç kullanım / Müvekkil erişimi)

### 👥 Kullanıcı Yönetimi
- Rol tabanlı erişim kontrolü (RBAC)
- Çoklu firma desteği (Multi-tenant)
- Güvenli kimlik doğrulama
- İki faktörlü doğrulama (2FA)

### 💬 Güvenli Mesajlaşma
- Avukat-müvekkil iletişimi
- Dosya eki desteği
- Okundu bildirimleri
- Mesaj şablonları

### 📅 Takvim ve Etkinlikler
- Duruşma takvimleri
- Randevu yönetimi
- Otomatik hatırlatıcılar
- iCal (.ics) entegrasyonu

### 💰 Faturalandırma
- Otomatik fatura oluşturma
- Ödeme takibi
- PDF fatura çıktısı
- Online ödeme entegrasyonu (hazır)

### 🔒 Güvenlik
- KVKK ve GDPR uyumlu
- End-to-end şifreleme
- Denetim kayıtları
- Antivirüs taraması
- Güvenli başlıklar ve CSP

## 🛠️ Teknoloji Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **File Storage**: S3 uyumlu (MinIO/AWS S3)
- **Email**: SMTP (Nodemailer)
- **Internationalization**: next-intl (TR/EN)
- **Monitoring**: Audit logs, error tracking

## 📋 Kurulum

### Ön Gereksinimler

- Node.js 18+ 
- npm veya pnpm
- Docker ve Docker Compose (geliştirme ortamı için)

### 1. Projeyi Klonlayın

```bash
git clone <repository-url>
cd avukat-portali
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Çevre Değişkenlerini Ayarlayın

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin ve gerekli değişkenleri ayarlayın.

### 4. Geliştirme Ortamını Başlatın

Docker ile gerekli servisleri başlatın:

```bash
docker-compose up -d
```

Bu komut şunları başlatır:
- PostgreSQL veritabanı
- MinIO (S3 uyumlu dosya depolama)
- MailHog (e-posta testi)
- ClamAV (antivirüs)
- Redis (önbellek)

### 5. Veritabanını Hazırlayın

```bash
# Prisma geliştirme sunucusunu başlat
npx prisma dev

# Yeni terminalde migration çalıştır
npx prisma migrate dev --name init

# Prisma client oluştur
npx prisma generate

# Örnek veri ekle (opsiyonel)
npx prisma db seed
```

### 6. Uygulamayı Başlatın

```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## 👤 Test Kullanıcıları

Seed script çalıştırıldıktan sonra aşağıdaki test kullanıcıları kullanılabilir:

| Rol | E-posta | Parola | Açıklama |
|-----|---------|--------|----------|
| Firma Yöneticisi | admin@omerhukuk.com | admin123 | Tüm yetkilere sahip |
| Avukat | avukat1@omerhukuk.com | lawyer123 | Dosya ve müvekkil yönetimi |
| Avukat | avukat2@omerhukuk.com | lawyer123 | Dosya ve müvekkil yönetimi |
| Paralegal | paralegal@omerhukuk.com | paralegal123 | Belge ve görev yönetimi |
| Müvekkil | muvekkil1@example.com | client123 | Kendi dosyalarını görüntüleme |
| Müvekkil | muvekkil2@example.com | client123 | Kendi dosyalarını görüntüleme |

## 🔧 Geliştirme

### Kodlama Standartları

- TypeScript strict mode kullanılır
- ESLint ve Prettier ile kod formatlaması
- Husky ile pre-commit hooks
- Conventional commits

### Test

```bash
# Unit testler
npm run test

# E2E testler  
npm run test:e2e

# Coverage raporu
npm run test:coverage
```

### Build

```bash
# Production build
npm run build

# Build çıktısını çalıştır
npm start
```

## 🚀 Deployment

### 🌟 Hızlı Başlangıç (5 Dakikada!)

**En kolay yöntem - Vercel:**
1. [Vercel.com](https://vercel.com)'a kaydolun
2. GitHub repository'nizi bağlayın
3. Environment variables ekleyin
4. Deploy butonuna tıklayın!

**Detaylı rehber:** [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) dosyasına bakın.

### 📋 Deployment Seçenekleri

| Platform | Maliyet | Kurulum | SSL | Performans |
|----------|---------|---------|-----|------------|
| **Vercel** | Ücretsiz/Pro | ⭐⭐⭐⭐⭐ | Otomatik | ⭐⭐⭐⭐⭐ |
| **Netlify** | Ücretsiz/Pro | ⭐⭐⭐⭐⭐ | Otomatik | ⭐⭐⭐⭐ |
| **Docker (VPS)** | $5-20/ay | ⭐⭐⭐ | Manuel | ⭐⭐⭐⭐ |
| **AWS/GCP** | $10-50/ay | ⭐⭐ | Manuel | ⭐⭐⭐⭐⭐ |

### 🐳 Docker ile Deployment

```bash
# 1. Environment ayarları
cp .env.production.example .env.production
nano .env.production

# 2. SSL sertifikası (opsiyonel)
./scripts/setup-ssl.sh

# 3. Production deployment
./scripts/deploy.sh
```

### ☁️ Cloud Deployment

**Vercel/Netlify için:**
- Repository'yi platform'a bağlayın
- Environment variables ekleyin
- Otomatik deploy

**Detaylı adımlar:** [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)

### 🔧 Production Hazırlık

```bash
# Dependencies yükle
npm install

# Build test et
npm run build

# Environment dosyası oluştur
cp .env.example .env.production
```

## 📚 API Dokümantasyonu

API endpoint'leri için Swagger dokümantasyonu `/api/docs` adresinde bulunmaktadır.

### Temel Endpoint'ler

- `POST /api/auth/login` - Kullanıcı girişi
- `GET /api/cases` - Dosya listesi
- `POST /api/cases` - Yeni dosya oluşturma
- `GET /api/documents/:id/download` - Belge indirme
- `POST /api/messages` - Mesaj gönderme

## 🔒 Güvenlik

### OWASP Top 10 Korumaları

- ✅ Injection koruması (Prisma ORM)
- ✅ Broken Authentication koruması (NextAuth.js)
- ✅ Sensitive Data Exposure koruması (şifreleme)
- ✅ XML External Entities (XXE) koruması
- ✅ Broken Access Control koruması (RBAC)
- ✅ Security Misconfiguration koruması
- ✅ Cross-Site Scripting (XSS) koruması
- ✅ Insecure Deserialization koruması
- ✅ Using Components with Known Vulnerabilities koruması
- ✅ Insufficient Logging & Monitoring koruması

### KVKK Uyumluluğu

- Açık rıza yönetimi
- Veri minimizasyonu
- Silme hakkı (Right to be forgotten)
- Veri taşınabilirliği
- Denetim kayıtları

## 📊 Monitoring

### Sağlık Kontrolü

```bash
curl http://localhost:3000/api/health
```

### Metrikler

- `/api/metrics` - Prometheus uyumlu metrikler
- Grafana dashboard şablonları `monitoring/` klasöründe

### Loglar

Strukturlu JSON loglar kullanılır:

```bash
# Logları görüntüle
docker-compose logs -f app

# Belirli seviye logları
docker-compose logs -f app | grep "ERROR"
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 Destek

- 📧 E-posta: destek@avukatportali.com
- 📞 Telefon: +90 312 XXX XX XX
- 💬 Discord: [Davet Linki]
- 📖 Dokümantasyon: [docs.avukatportali.com]

## 🗺️ Roadmap

- [ ] Mobile uygulama (React Native)
- [ ] E-imza entegrasyonu
- [ ] UYAP entegrasyonu  
- [ ] AI destekli belge analizi
- [ ] WhatsApp Business entegrasyonu
- [ ] Slack/Teams entegrasyonu
- [ ] Advanced reporting ve analytics
- [ ] Multi-language support (AR, DE, FR)

---

Made with ❤️ for Turkish legal professionals
