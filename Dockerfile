# Use uma imagem base do Nginx
FROM nginx:alpine

RUN mkdir -p /app/build

# Copie o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie o build da aplicação para o Nginx
COPY ./build /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
