FROM node:20

WORKDIR /root/api-gateway

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["yarn","start:prod"]

# docker build . -t api-gateway
# docker run -d -p 8080:8080 --name api-gateway --net node-network api-gateway