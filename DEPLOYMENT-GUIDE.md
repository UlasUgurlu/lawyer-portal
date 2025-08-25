# 🚀 Avukat Portalı - Web Sitesi Olarak Paylaşım Rehberi

Bu rehber, Avukat Portalı uygulamanızı çevrimiçi olarak paylaşmak için farklı deployment seçeneklerini açıklamaktadır.

## 📋 Hazırlık Aşaması

### 1. Environment Variables Ayarlama

Öncelikle `.env.example` dosyasını `.env` olarak kopyalayın:

```bash
cp .env.example .env
```

`.env` dosyasını açın ve production değerlerini düzenleyin:

```bash
# Production için gerekli değişiklikler
DATABASE_URL="postgresql://kullanici:sifre@veritabani-host:5432/lawyer_portal"
NEXTAUTH_URL="https://sizin-domain-adiniz.com"
NEXTAUTH_SECRET="güçlü-bir-secret-anahtar-oluşturun"
```

### 2. Uygulama Build Test

```bash
npm install
npm run build
```

## 🌟 Deployment Seçenekleri

### Option 1: 🚀 Vercel (En Kolay - Önerilen)

**Avantajları:**
- Ücretsiz plan mevcut
- Otomatik HTTPS
- Global CDN
- GitHub entegrasyonu
- Çok kolay setup

**Adımlar:**

1. [Vercel.com](https://vercel.com) hesabı açın
2. GitHub repository'nizi Vercel'e bağlayın
3. Environment variables ekleyin:
   ```
   DATABASE_URL=your-postgres-url
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=your-secret
   ```
4. Deploy butonuna tıklayın!

**Veritabanı için:** [Neon](https://neon.tech) veya [Supabase](https://supabase.com) PostgreSQL servislerini kullanabilirsiniz.

### Option 2: 🌐 Netlify (Alternatif Hosting)

**Adımlar:**

1. [Netlify.com](https://netlify.com) hesabı açın
2. GitHub repository'nizi bağlayın
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Environment variables ekleyin
5. Deploy!

### Option 3: 🐳 Docker (Kendi Serverınızda)

**VPS/Dedicated Server sahibiyseniz:**

1. **Dockerfile ile build:**
```bash
docker build -t lawyer-portal .
```

2. **Environment dosyası oluşturun (.env.production):**
```bash
cp .env.example .env.production
# .env.production dosyasını production değerleriyle düzenleyin
```

3. **Container'ı çalıştırın:**
```bash
docker run -d \
  --name lawyer-portal \
  -p 3000:3000 \
  --env-file .env.production \
  lawyer-portal
```

4. **Docker Compose ile (Önerilen):**

`docker-compose.production.yml` oluşturun:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: lawyer_portal
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secure-password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

Çalıştırmak için:
```bash
docker-compose -f docker-compose.production.yml up -d
```

### Option 4: ☁️ Bulut Servisleri (AWS, Google Cloud, Azure)

**AWS EC2 ile:**

1. EC2 instance oluşturun (Ubuntu 20.04+)
2. Docker kurun
3. Yukarıdaki Docker adımlarını takip edin
4. Nginx reverse proxy ekleyin (SSL için)

**Google Cloud Run ile:**

1. Dockerfile'ı build edin
2. Google Container Registry'e push edin
3. Cloud Run'da deploy edin

## 🔐 Production Güvenlik Ayarları

### 1. Environment Variables

```bash
# Güçlü şifreler oluşturun
NEXTAUTH_SECRET=$(openssl rand -base64 32)
ENCRYPTION_KEY=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 32)
```

### 2. Veritabanı Güvenliği

- Güçlü şifreler kullanın
- Sadece gerekli IP'lerden erişime izin verin
- SSL bağlantı kullanın

### 3. Domain ve SSL

- SSL sertifikası edinin (Let's Encrypt ücretsiz)
- HTTPS yönlendirmesi yapın
- Security headers ayarlayın (zaten kod'da mevcut)

## 📊 Monitoring ve Bakım

### 1. Logları İzleme

```bash
# Docker logs
docker logs -f lawyer-portal

# Vercel'de
vercel logs
```

### 2. Veritabanı Backup

```bash
# PostgreSQL backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

### 3. Güncellemeler

```bash
git pull origin main
npm install
npm run build
# Docker için rebuild gerekebilir
```

## 🆘 Sorun Giderme

### Yaygın Sorunlar:

1. **"Build Failed" Hatası:**
   ```bash
   # Dependencies'i yeniden yükleyin
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Database Connection Error:**
   - DATABASE_URL'yi kontrol edin
   - Network erişimini kontrol edin
   - Veritabanı servisinin çalıştığından emin olun

3. **Environment Variables Tanınmıyor:**
   - NEXTAUTH_URL doğru domain'i gösteriyor mu?
   - Environment variables platform'da doğru set edilmiş mi?

## 💰 Maliyet Tahmini

### Vercel/Netlify (Hobby Plan):
- **Ücretsiz** (sınırlı kullanım)
- Pro Plan: ~$20/ay

### VPS Hosting:
- DigitalOcean Droplet: $5-20/ay
- AWS EC2 t3.micro: $8-15/ay
- Hetzner VPS: €3-10/ay

### Veritabanı:
- Neon/Supabase: $0-25/ay
- AWS RDS: $15-50/ay

## 📞 Destek

Deployment sırasında sorun yaşarsanız:

1. Bu rehberdeki adımları tekrar kontrol edin
2. GitHub Issues'a sorununuzu yazın
3. Discord topluluğumuzdan yardım alın

---

## 🎯 Hızlı Başlangıç - Vercel (5 dakikada!)

1. [Vercel.com](https://vercel.com)'a kaydolun
2. GitHub ile giriş yapın
3. "Import Project" → Repository seçin
4. Environment variables ekleyin
5. Deploy!

**Your app URL:** `https://your-project-name.vercel.app`

🎉 **Tebrikler! Avukat Portalınız artık çevrimiçi!**