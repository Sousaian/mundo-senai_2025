# Etapa de build (se você quiser construir o jar dentro do container — opcional)
# FROM maven:3.9-eclipse-temurin-17 AS build
# WORKDIR /app
# COPY . .
# RUN mvn clean package -DskipTests

# Etapa de execução
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copia o arquivo .jar para o container
COPY chat/target/chat-0.0.1-SNAPSHOT.jar app.jar

# Expõe a porta que sua aplicação usa
EXPOSE 3308

# Comando para rodar a aplicação
CMD ["java", "-jar", "app.jar"]

