FROM node:19
WORKDIR /usr/src/vue3
COPY . .
#RUN npm update
RUN npm install --force
RUN npm run build
CMD [ "npm", "run", "dev"]
EXPOSE 443
