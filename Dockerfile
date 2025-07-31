# 1단계: React 애플리케이션 빌드
# Node.js 18 버전을 사용하여 빌드 환경을 설정합니다.
FROM node:18 AS builder

# 작업 디렉토리를 /app으로 설정합니다.
WORKDIR /app

# package.json 및 package-lock.json 파일을 먼저 복사하여 npm install 캐시를 활용합니다.
COPY package*.json ./

# 모든 Node.js 의존성을 설치합니다.
RUN npm install

# 나머지 모든 소스 코드를 복사합니다.
COPY . .

# 빌드 시점에 주입할 환경 변수 (docker-compose.yml에서 args로 전달됨)
ARG REACT_APP_SPRING_API_URL
ARG REACT_APP_FASTAPI_API_URL

# 환경 변수를 컨테이너 내부로 설정하여 React 빌드 시 사용되도록 합니다.
ENV REACT_APP_SPRING_API_URL=${REACT_APP_SPRING_API_URL}
ENV REACT_APP_FASTAPI_API_URL=${REACT_APP_FASTAPI_API_URL}

# React 애플리케이션을 프로덕션 모드로 빌드합니다.
# 빌드된 정적 파일은 일반적으로 /app/build 디렉토리에 생성됩니다.
RUN npm run build

# 2단계: 빌드된 React 앱을 서비스할 경량 이미지 생성
# Node.js 런타임만 포함된 경량 Alpine 이미지를 사용합니다.
FROM node:18-alpine

# 작업 디렉토리를 /app으로 설정합니다.
WORKDIR /app

# 빌드 단계에서 생성된 정적 파일들을 현재 단계로 복사합니다.
# /app/build 디렉토리만 복사하여 이미지 크기를 최소화합니다.
COPY --from=builder /app/build ./build

# 정적 파일을 서비스하기 위한 'serve' 패키지를 전역으로 설치합니다.
RUN npm install -g serve

# 컨테이너가 80번 포트에서 리스닝할 것임을 외부에 알립니다.
# docker-compose.yml의 "3000:80" 매핑과 일치시킵니다.
EXPOSE 80

# 컨테이너 시작 시 실행될 명령을 정의합니다.
# 'serve' 명령을 사용하여 /app/build 디렉토리의 정적 파일을 80번 포트로 서비스합니다.
CMD ["serve", "-s", "build", "-l", "80"]
