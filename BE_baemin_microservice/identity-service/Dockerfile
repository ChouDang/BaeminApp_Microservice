FROM node:20

WORKDIR /root/identity-service

COPY package.json .
   
RUN yarn config set network-timeout 3000000
RUN yarn install

COPY ./prisma/schema.prisma ./prisma/schema.prisma
RUN yarn prisma generate

COPY . .

RUN yarn run build

CMD ["yarn","start:prod"]