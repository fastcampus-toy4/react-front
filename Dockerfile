# 1단계: Build React 앱
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# 2단계: 정적 파일을 Nginx로 서빙
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
