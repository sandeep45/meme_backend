FROM nginx

MAINTAINER Sandeep Arneja <sandeep45@gmail.com>

RUN apt-get update && apt-get install -y -q \
  curl \
  net-tools \
  man \
  vim \
  dnsutils

ENV NGINX_CONFIG_HOME /etc/nginx

WORKDIR $NGINX_CONFIG_HOME

COPY nginx.conf $NGINX_CONFIG_HOME

COPY dist /usr/share/nginx/html

RUN mkdir logs

EXPOSE 8080

CMD ["nginx"]
