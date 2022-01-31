FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env

RUN apt-get update && apt-get install -y \
    nodejs \
    npm

WORKDIR /src/FlowMock/FlowMock.Web/ClientApp/
COPY ./src/FlowMock/FlowMock.Web/ClientApp/package.json ./
RUN npm install

WORKDIR /src/FlowMock/
COPY ./src/FlowMock/FlowMock.sln ./
COPY ./src/FlowMock/FlowMock.Engine/FlowMock.Engine.csproj ./FlowMock.Engine/FlowMock.Engine.csproj
COPY ./src/FlowMock/FlowMock.Web/FlowMock.Web.csproj ./FlowMock.Web/FlowMock.Web.csproj

RUN dotnet restore

COPY ./src/ /src/

RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:6.0
COPY --from=build-env /out app
WORKDIR app
EXPOSE 80
ENTRYPOINT dotnet FlowMock.Web.dll
