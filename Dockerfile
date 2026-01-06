# Используем Node.js версии 20 для совместимости с Next.js 16+
FROM node:20-alpine AS builder

# Создаем рабочую папку
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json* yarn.lock* ./

# Устанавливаем зависимости
RUN npm install --frozen-lockfile

# Копируем весь проект
COPY . .

# Строим проект Next.js
RUN npm run build

# Создаем финальный образ для запуска
FROM node:20-alpine AS runner

# Создаем рабочую папку
WORKDIR /app

# Копируем только необходимые файлы и папки из сборочного этапа
COPY --from=builder /app/package.json /app/package-lock.json* /app/yarn.lock* ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Устанавливаем только production зависимости
RUN npm install --prod --frozen-lockfile

# Устанавливаем переменную окружения
ENV NODE_ENV=production

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]