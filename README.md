# Products Service

Microserviço responsável pelo gerenciamento de produtos do marketplace.

## Funcionalidades

- CRUD completo de produtos
- Busca e filtros avançados
- Controle de estoque
- Validação de vendedores
- API REST com documentação Swagger

## Tecnologias

- NestJS
- TypeORM
- PostgreSQL
- Swagger/OpenAPI
- Jest (testes)

## Instalação

```bash
npm install
```

## Configuração

Configure as variáveis de ambiente:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=products_db
PORT=3001
NODE_ENV=development
```

## Execução

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run start:prod
```

## Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## API Endpoints

### Produtos

- `GET /products` - Listar produtos com paginação e filtros
- `GET /products/:id` - Buscar produto por ID
- `POST /products` - Criar novo produto
- `PATCH /products/:id` - Atualizar produto
- `DELETE /products/:id` - Deletar produto (soft delete)
- `PATCH /products/:id/stock` - Atualizar estoque
- `GET /products/seller/:sellerId` - Listar produtos por vendedor

### Documentação

Acesse a documentação Swagger em: `http://localhost:3001/api`

## Estrutura do Projeto

```
src/
├── products/
│   ├── entities/
│   │   └── product.entity.ts
│   ├── products.controller.ts
│   ├── products.service.ts
│   └── products.module.ts
├── common/
│   └── dto/
│       ├── create-product.dto.ts
│       ├── update-product.dto.ts
│       └── product-query.dto.ts
├── config/
│   └── database.config.ts
├── app.module.ts
└── main.ts
```

## Modelo de Dados

### Product

- `id`: UUID (chave primária)
- `name`: Nome do produto
- `description`: Descrição do produto
- `price`: Preço (decimal)
- `stock`: Quantidade em estoque
- `category`: Categoria do produto
- `imageUrl`: URL da imagem (opcional)
- `sellerId`: ID do vendedor
- `isActive`: Status ativo/inativo
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

## Filtros de Busca

- `search`: Busca por nome ou descrição
- `category`: Filtro por categoria
- `minPrice`/`maxPrice`: Filtro por faixa de preço
- `sellerId`: Filtro por vendedor
- `page`/`limit`: Paginação

## Validações

- Nome: obrigatório, máximo 255 caracteres
- Descrição: obrigatória
- Preço: obrigatório, valor positivo
- Estoque: obrigatório, valor não negativo
- Categoria: obrigatória, máximo 100 caracteres
- SellerId: obrigatório, formato UUID