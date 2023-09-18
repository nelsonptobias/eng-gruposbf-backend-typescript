# Use a imagem oficial do Node.js como base
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código-fonte para o diretório de trabalho
COPY . .

# Compilar o código TypeScript
RUN npm run build

# Expor a porta em que o aplicativo será executado
EXPOSE 8000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]