FROM node:18

# Cria uma pasta no container
WORKDIR /usr/src/app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o restante do projeto
COPY . .

# Expõe a porta 3334 (onde seu backend vai rodar)
EXPOSE 3334

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
