# This dockerfile is for Meza assets upload
FROM nexus.svc.talkdeskapp.com/node:15.2.0-slim

# Update image and install dependencies

RUN set -x \
  && apt-get update \
  && apt-get install -y procps build-essential git --no-install-recommends \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ARG $BUNDLE_GITHUB__COM
RUN git config --global url."https://$$BUNDLE_GITHUB__COM@github.com/Talkdesk/".insteadOf "https://github.com/Talkdesk/" \
&& git config --global url."https://5$$BUNDLE_GITHUB__COM@github.com/talkdesk-tdx/".insteadOf "https://github.com/talkdesk-tdx/"

ENV APP_DIR /usr/src/app

RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}
COPY . .
#COPY .npmrc .

ENV CHILD_CONCURRENCY=1
RUN yarn install --network-concurrency 1

CMD ["yarn", "prepare"]
