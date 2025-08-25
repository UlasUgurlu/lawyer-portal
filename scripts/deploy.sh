#!/bin/bash

# Avukat Portalı - Hızlı Deployment Script'i
# Bu script production deployment'ını otomatik olarak yapar

set -e

echo "🚀 Avukat Portalı - Production Deployment"
echo "========================================="

# Environment dosyası kontrolü
if [ ! -f ".env.production" ]; then
    echo "⚠️  .env.production dosyası bulunamadı!"
    echo "📋 Lütfen .env.production.example dosyasını kopyalayıp düzenleyin:"
    echo "   cp .env.production.example .env.production"
    echo "   nano .env.production"
    exit 1
fi

echo "✅ Environment dosyası bulundu"

# Build test
echo "🔨 Uygulama build test ediliyor..."
npm install
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build başarılı!"
else
    echo "❌ Build başarısız! Lütfen hataları düzeltin."
    exit 1
fi

# Deployment seçenekleri
echo ""
echo "🎯 Deployment seçenekleri:"
echo "1) Docker (Kendi sunucunuzda)"
echo "2) Vercel (Cloud hosting)"
echo "3) Netlify (Cloud hosting)"
echo "4) Manuel build (Kendi setup'ınız için)"

read -p "Seçiminizi yapın (1-4): " CHOICE

case $CHOICE in
    1)
        echo "🐳 Docker deployment başlatılıyor..."
        
        # Docker build
        echo "📦 Docker image oluşturuluyor..."
        docker build -t lawyer-portal:latest .
        
        # SSL sertifikası var mı kontrol et
        if [ ! -f "./nginx/ssl/fullchain.pem" ]; then
            echo "⚠️  SSL sertifikası bulunamadı!"
            read -p "SSL kurulumu yapmak ister misiniz? (y/n): " SSL_CHOICE
            if [ "$SSL_CHOICE" = "y" ]; then
                ./scripts/setup-ssl.sh
            fi
        fi
        
        # Production deployment
        echo "🚀 Production containers başlatılıyor..."
        docker-compose -f docker-compose.production.yml --env-file .env.production up -d
        
        echo "✅ Docker deployment tamamlandı!"
        echo "🌐 Uygulamanız şu adreste: https://$(grep NEXTAUTH_URL .env.production | cut -d'=' -f2)"
        ;;
        
    2)
        echo "☁️ Vercel deployment..."
        
        # Vercel CLI kurulu mu kontrol et
        if ! command -v vercel &> /dev/null; then
            echo "📦 Vercel CLI kuruluyor..."
            npm install -g vercel
        fi
        
        # Vercel login
        vercel login
        
        # Environment variables ekle
        echo "🔧 Environment variables ekleniyor..."
        while IFS='=' read -r key value; do
            if [[ ! $key =~ ^#.*$ && ! -z $key ]]; then
                vercel env add $key production <<< $value
            fi
        done < .env.production
        
        # Deploy
        vercel --prod
        
        echo "✅ Vercel deployment tamamlandı!"
        ;;
        
    3)
        echo "🌐 Netlify deployment..."
        
        # Netlify CLI kurulu mu kontrol et
        if ! command -v netlify &> /dev/null; then
            echo "📦 Netlify CLI kuruluyor..."
            npm install -g netlify-cli
        fi
        
        # Build
        npm run build
        
        # Deploy
        netlify deploy --prod --dir=.next
        
        echo "✅ Netlify deployment tamamlandı!"
        ;;
        
    4)
        echo "📦 Manuel build hazırlanıyor..."
        
        # Production build
        npm run build
        
        echo "✅ Build tamamlandı!"
        echo "📁 Build dosyaları: .next/"
        echo "🚀 Bu dosyaları web sunucunuza kopyalayıp Node.js ile çalıştırabilirsiniz:"
        echo "   npm start"
        ;;
        
    *)
        echo "❌ Geçersiz seçim!"
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment tamamlandı!"
echo "📋 Sonraki adımlar:"
echo "   - Domain DNS ayarlarını kontrol edin"
echo "   - SSL sertifikasının çalıştığını doğrulayın"
echo "   - Veritabanı migration'larını çalıştırın"
echo "   - Test kullanıcıları ile giriş yaparak test edin"
echo ""
echo "🆘 Sorun yaşarsanız:"
echo "   - DEPLOYMENT-GUIDE.md dosyasını inceleyin"
echo "   - GitHub Issues'da yardım isteyin"
echo "   - Discord topluluğumuzdan destek alın"