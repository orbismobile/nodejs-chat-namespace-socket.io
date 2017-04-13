FROM node:latest

#COPY ./api /api
ADD ./api /api

WORKDIR /api

RUN npm install;

RUN mkdir jose

EXPOSE 8181

CMD ["npm","start"]
