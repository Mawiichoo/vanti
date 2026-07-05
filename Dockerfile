FROM nginx:alpine

# Copiar archivos estáticos del dashboard al directorio de Nginx
COPY index.html styles.css app.js data.json favicon.ico convertidor_masivo.html /usr/share/nginx/html/

# Exponer el puerto por defecto de Nginx
EXPOSE 80
