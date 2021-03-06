FROM ruby:2.1.3

MAINTAINER Sandeep Arneja <sandeep45@gmail.com>

RUN apt-get update && apt-get install -y -q \
  build-essential \
  libxml2-dev \
  libxslt1-dev \
  libpq-dev \
  libqt4-webkit \
  libqt4-dev \
  xvfb \
  nodejs \
  curl \
  net-tools \
  man \
  vim \
  postgresql-client \
  dns utils

ENV APP_HOME /myapp

RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD Gemfile* $APP_HOME/

RUN bundle install

ADD . $APP_HOME

EXPOSE 3000

CMD ["bundle", "exec", "rails", "server"]
