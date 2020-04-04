FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build-env
WORKDIR /CaseExperis.Api

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c ANewEra -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:2.2
WORKDIR /CaseExperis.Api
COPY --from=build-env /CaseExperis.Api/out .

CMD ASPNETCORE_URLS=http://*:$PORT dotnet CaseExperis.Api.dll