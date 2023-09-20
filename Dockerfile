# Use uma imagem Node.js como base
FROM node:14

# Crie o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie os arquivos necessários para o contêiner
COPY package*.json ./
COPY config/.env ./.env
COPY . .

# Instale as dependências e construa o aplicativo
RUN npm install && npm run build

# Expõe a porta que a aplicação será executada
EXPOSE 8000

# Comando para iniciar a aplicação
CMD ["npm", "start"]