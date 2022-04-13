#базовый образ
FROM node:16-alpine
#папка в которой будем работать
WORKDIR /opt/app
#что будем добавлять внутрь контейнера
ADD package.json package.json
RUN npm install
#--- если наш код изменился, а зависимости нет
#--- docker изменит только код
#теперь добавляем файлы проекта
ADD . .
#выполнить внутри контейнера
RUN npm run build
#почистить ненужные зависимости для production
RUN npm prune --production
#команда запуска
CMD ["node", "./dist.main.js"]
