# 基础镜像
FROM node:alpine
# 指定工作目录
WORKDIR /excellentlld/blog/frontend
#
COPY package.json .
#
RUN npm config set registry https://registry.npmmirror.com/
#
RUN npm install
#
COPY . .
#
RUN npm run build
#
EXPOSE 3000
