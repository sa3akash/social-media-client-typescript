FROM node:18-alpine as build

WORKDIR /usr/src/client
COPY package*.json .
RUN yarn
COPY . .
RUN yarn build


# nginx
FROM nginx:mainline-alpine3.18-perl
EXPOSE 8080
COPY ./nginx /etc/nginx/conf.d
COPY --from=build /usr/src/client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]