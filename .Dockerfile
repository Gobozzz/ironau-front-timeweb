# Используем официальный Node.js образ как базовый, рекомендуется LTS версия
FROM node:18-alpine AS builder

# Создаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json/yarn.lock для установки зависимостей
COPY package.json package-lock.json* yarn.lock* ./

# Устанавливаем зависимости
RUN npm install --frozen-lockfile

# Копируем весь проект
COPY . .

# Собираем проект (приложение Next.js)
RUN npm run build

# Создаем финальный этап для production
FROM node:18-alpine AS runner

# Создаем рабочую директорию в рабочем контейнере
WORKDIR /app

# Копируем только необходимые файлы из сборочного этапа
COPY --from=builder /app/package.json /app/package-lock.json* /app/yarn.lock* ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Устанавливаем только production зависимости
RUN npm install --prod --frozen-lockfile

# Устанавливаем переменную окружения
ENV NODE_ENV=production

# Открываем порт Next.js по умолчанию (3000)
EXPOSE 3000

# Запускаем сервер
CMD ["npm", "start"]