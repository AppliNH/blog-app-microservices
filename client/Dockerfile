FROM mhart/alpine-node:10 AS builder
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .

EXPOSE 80

CMD ["serve", "-p", "80", "-s", "."]