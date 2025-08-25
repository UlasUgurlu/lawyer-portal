#!/bin/bash

# SSL Sertifikası Kurulum Script'i
# Bu script Let's Encrypt ile ücretsiz SSL sertifikası oluşturur

set -e

echo "🔐 Avukat Portalı - SSL Sertifikası Kurulumu"
echo "============================================="

# Domain kontrolü
read -p "📍 Domain adınızı girin (örn: avukat.example.com): " DOMAIN
read -p "📧 E-mail adresinizi girin: " EMAIL

if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
    echo "❌ Domain ve email adresi gereklidir!"
    exit 1
fi

echo "📋 Domain: $DOMAIN"
echo "📧 Email: $EMAIL"
echo ""

# Nginx konfigurasyon dosyasını güncelle
echo "🔧 Nginx konfigürasyonunu güncelleniyor..."
sed -i "s/yourdomain.com/$DOMAIN/g" ./nginx/nginx.conf

# SSL klasörünü oluştur
mkdir -p ./nginx/ssl

# Certbot ile SSL sertifikası al
echo "🔐 SSL sertifikası alınıyor..."

# Geçici nginx config (SSL olmadan)
cat > ./nginx/nginx-temp.conf << EOF
events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        server_name $DOMAIN www.$DOMAIN;
        
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }
        
        location / {
            return 301 https://\$server_name\$request_uri;
        }
    }
}
EOF

# Certbot için geçici volume oluştur
mkdir -p ./certbot/www

# Docker ile certbot çalıştır
echo "🚀 Certbot başlatılıyor..."

docker run --rm \
    -v "$PWD/nginx/ssl:/etc/letsencrypt" \
    -v "$PWD/certbot/www:/var/www/certbot" \
    certbot/certbot \
    certonly --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN

# Sertifika dosyalarını kopyala
cp "./nginx/ssl/live/$DOMAIN/fullchain.pem" "./nginx/ssl/fullchain.pem"
cp "./nginx/ssl/live/$DOMAIN/privkey.pem" "./nginx/ssl/privkey.pem"

# Geçici dosyaları temizle
rm ./nginx/nginx-temp.conf
rm -rf ./certbot

echo "✅ SSL sertifikası başarıyla kuruldu!"
echo "📁 Sertifika dosyaları: ./nginx/ssl/"
echo ""
echo "🚀 Şimdi production deployment'ınızı başlatabilirsiniz:"
echo "   docker-compose -f docker-compose.production.yml up -d"
echo ""
echo "🔄 Sertifika yenileme (90 günde bir):"
echo "   docker run --rm -v \$PWD/nginx/ssl:/etc/letsencrypt certbot/certbot renew"