FROM node:18-alpine as build

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /usr/src/client
COPY package*.json .
USER root
RUN chown -R app:app .
USER app
RUN yarn
COPY . .
RUN yarn build


# nginx
FROM nginx:mainline-alpine3.18-perl
EXPOSE 3000
COPY ./nginx /etc/nginx/conf.d
COPY --from=build /usr/src/client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]