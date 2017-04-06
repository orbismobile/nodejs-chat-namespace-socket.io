FROM node:latest

ADD ./api /api

RUN cd api; \
    npm install;

EXPOSE 8080

CMD["node","/api/app.js"]
