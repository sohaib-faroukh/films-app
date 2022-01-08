# stage 1 building the code
FROM node as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# stage 2
FROM node
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production
RUN npm install -g db-migrate

COPY --from=builder /usr/app/dist ./dist

COPY database.docker.json ./database.json

ENV PORT=8080
ENV JWT_SECRET='app-secret-token'
ENV SEED_DB='true'

EXPOSE 8080

CMD ["npm", "start"]
