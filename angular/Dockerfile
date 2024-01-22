FROM node:lts-alpine AS build
WORKDIR /usr/src/app
 
COPY package.json .
COPY package-lock.json .
RUN npm ci
 
COPY . .
RUN npm run build
 
FROM nginx:stable-alpine
 
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/lunch-buddy /usr/share/nginx/html
 
EXPOSE 80