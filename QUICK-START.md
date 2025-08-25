# 🎯 WEB SİTESİ OLARAK PAYLAŞIM - HIZLI BAŞLANGIÇ

## ⚡ En Hızlı Yöntem (5 Dakika)

### 1. Vercel ile Deployment (Ücretsiz)

```bash
# 1. Vercel.com'a kaydolun (GitHub ile)
# 2. "New Project" → GitHub repository seçin
# 3. Bu environment variables'ları ekleyin:
```

**Gerekli Environment Variables:**
```
DATABASE_URL=postgresql://user:pass@host:5432/dbname
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=your-secret-key-min-32-chars
```

**4. Deploy butonuna tıklayın!**

🎉 **Sonuç:** `https://your-project-name.vercel.app`

---

## 🐳 Kendi Sunucunuzda (Docker)

### Hızlı Kurulum:

```bash
# 1. Environment ayarla
cp .env.production.example .env.production
nano .env.production  # değerleri güncelle

# 2. Deploy et
./scripts/deploy.sh
```

### Manuel Kurulum:

```bash
# 1. Build ve çalıştır
docker build -t lawyer-portal .
docker run -p 3000:3000 --env-file .env.production lawyer-portal

# 2. Tarayıcıda aç
# http://your-server-ip:3000
```

---

## 💾 Veritabanı Seçenekleri

### Ücretsiz PostgreSQL:
- **Neon.tech** - Ücretsiz 500MB
- **Supabase.com** - Ücretsiz 500MB  
- **ElephantSQL** - Ücretsiz 20MB

### Connection String Örneği:
```
postgresql://username:password@hostname:5432/database
```

---

## ✅ Test Checklist

- [ ] Uygulama açılıyor
- [ ] Giriş sistemi çalışıyor
- [ ] Test kullanıcıları ile giriş yapabiliyorum
- [ ] SSL sertifikası aktif (https://)
- [ ] Dosya yükleme çalışıyor

---

## 🆘 Sorun mu Yaşıyorsunuz?

### Yaygın Hatalar:

**"Build Failed"**
```bash
rm -rf node_modules .next
npm install
npm run build
```

**"Database Connection Error"**
- DATABASE_URL doğru mu?
- Veritabanı servisi çalışıyor mu?

**"Environment Variables Not Found"**
- Platform'da environment variables set edildi mi?
- NEXTAUTH_URL doğru domain'i gösteriyor mu?

---

## 📞 Yardım

1. **Detaylı Rehber:** [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)
2. **GitHub Issues:** Sorun bildirin
3. **Discord:** Topluluk desteği

---

## 🎊 Başarılı Deployment Sonrası

### Test Kullanıcıları:
- **Admin:** admin@omerhukuk.com / admin123
- **Avukat:** avukat1@omerhukuk.com / lawyer123  
- **Müvekkil:** muvekkil1@example.com / client123

### Sonraki Adımlar:
1. ✅ Kendi kullanıcılarınızı oluşturun
2. ✅ Firma bilgilerini güncelleyin
3. ✅ Email ayarlarını yapılandırın
4. ✅ Backup stratejinizi belirleyin

🚀 **Avukat Portalınız artık çevrimiçi!**