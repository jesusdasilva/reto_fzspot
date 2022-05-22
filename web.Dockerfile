FROM nginx
LABEL MAINTENER "jesusdasilva@gmail.com"

COPY /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80