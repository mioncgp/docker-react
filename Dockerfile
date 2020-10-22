# FROM node:alpine
# WORKDIR '/app'
# COPY package*.json ./
# RUN npm install
# COPY ./ ./
# RUN npm run build

# FROM nginx
# EXPOSE 80
# COPY --from=0 /app/build /usr/share/nginx/html


# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build     

# production stage
FROM nginx:stable-alpine as production-stage
RUN rm -rf /var/www/html/index.nginx-debian.html
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]