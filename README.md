# JiUnbScore    

Sistema completo para gestão de competições esportivas universitárias, com backend em .NET (C#) e frontend em Next.js/React. Permite cadastro, acompanhamento e ranqueamento de atletas, equipes, partidas, estatísticas e edições de campeonatos.


## Estrutura do Projeto

```
JiUNBScore/
├── Backend/
│   ├── Entities/           # Entidades do domínio (Atletica, Competidor, Match, etc)
│   ├── ViewModels/         # ViewModels para API e frontend
│   ├── Services/           # Lógica de negócio (CRUD, rankings, standings)
│   ├── Controllers/        # Controllers da API
│   ├── Contexts/           # DbContext EF Core
│   ├── Program.cs          # Startup do backend
│   └── ...
├── Frontend/
│   ├── src/
│   │   ├── pages/          # Páginas Next.js
│   │   ├── components/     # Componentes React
│   │   ├── lib/            # ApiClient, types, helpers
│   │   └── ...
│   └── ...
├── Database/
├── src/
│   │   ├── database.sql    # Schema e procedures/views do banco
│   │   ├── seed.sql        # Povoamento do banco
│   │   └── ...
│   └── ...# Dados de exemplo
└── README.md
```

## Tecnologias Utilizadas

- **Backend:** .NET 9, C#
- **Frontend:** Next.js, React, TypeScript
- **Banco de Dados:** PostgreSQL

## Como rodar o projeto

### 1. Banco de Dados
- Crie um banco PostgreSQL
- Execute o `database.sql` para criar as tabelas, views e procedures
- (Opcional) Execute `seed.sql` para dados de exemplo

### 2. Backend
- Configure a connection string em `Backend/appsettings.Development.json`
- Compile e rode o backend:
  ```bash
  dotnet build
  dotnet run
  ```
- A API estará disponível em `http://localhost:5219` (ou porta configurada)

### 3. Frontend
- Instale as dependências:
  ```bash
  cd Frontend
  npm install
  ```
- Rode o frontend:
  ```bash
  npm run dev
  ```
- Acesse `http://localhost:3000`

