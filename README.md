# Projeto base de como eu organinzo as pastas em projetos corporativos

#### Essas doc está em processo de desenvolvimento...

## Requisitos
Ter o node com o postgres e o redis instalados rendo opcional usar o docker junto com o docker compose

### Configurando as variáveis de ambiente
```

BACKEND_URL="http://localhost"
BACKEND_PORT=3000

JWT_SECRET="SECRET"

POSTGRES_HOST=localhost
POSTGRES_USER=user
POSTGRES_PASSWORD=pass
POSTGRES_DB=db
POSTGRES_PORT=5432

REDIS_HOST=localhost:3000
REDIS_PORT=6379
REDIS_PASSWORD=pass

```

### instalando as dependências

```bash
npm install
```

### subindo os containers com docker compose (opcional se tiver)

```bash
docker compose up -d
```

### rodando a aplicação

```bash
$ npm run build
$ npm run start
```