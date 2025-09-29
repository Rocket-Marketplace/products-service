# 🛍️ Products Service

Serviço responsável pelo gerenciamento de produtos, catálogo, estoque e informações de vendedores no marketplace. Este serviço fornece todas as funcionalidades necessárias para o gerenciamento completo do catálogo de produtos.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Docker](#docker)
- [API Endpoints](#api-endpoints)
- [Contratos de Dados](#contratos-de-dados)
- [Monitoramento](#monitoramento)
- [Testes](#testes)
- [Deploy](#deploy)

## 🎯 Visão Geral

O Products Service é responsável por:

- **Gerenciamento de Produtos**: CRUD completo de produtos
- **Controle de Estoque**: Gestão de quantidade disponível
- **Catálogo**: Listagem, filtros e busca de produtos
- **Vendedores**: Produtos por vendedor
- **Validação**: Validação de dados e regras de negócio
- **Soft Delete**: Exclusão lógica de produtos
- **Paginação**: Listagem paginada com filtros

## 🏗️ Arquitetura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Checkout Service│    │  Users Service  │    │  Admin Panel    │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │     Products Service      │
                    │  ┌─────────────────────┐  │
                    │  │   Product CRUD      │  │
                    │  │   Stock Management  │  │
                    │  │   Catalog Search    │  │
                    │  │   Seller Products   │  │
                    │  │   Data Validation   │  │
                    │  └─────────────────────┘  │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │      PostgreSQL           │
                    │    Products Database      │
                    └───────────────────────────┘
```

## ⚡ Funcionalidades

### 📦 Gerenciamento de Produtos
- **Criação**: Cadastro de novos produtos
- **Listagem**: Lista paginada com filtros
- **Detalhes**: Informações completas do produto
- **Atualização**: Modificação de dados do produto
- **Exclusão**: Soft delete (exclusão lógica)

### 📊 Controle de Estoque
- **Atualização de Estoque**: Modificação de quantidade disponível
- **Validação**: Verificação de estoque suficiente
- **Histórico**: Rastreamento de mudanças de estoque
- **Alertas**: Notificações de estoque baixo

### 🔍 Catálogo e Busca
- **Filtros**: Por categoria, preço, vendedor
- **Paginação**: Navegação eficiente
- **Ordenação**: Por preço, data, popularidade
- **Busca**: Pesquisa por nome e descrição

### 👥 Gestão por Vendedor
- **Produtos do Vendedor**: Lista específica por vendedor
- **Estatísticas**: Métricas de vendas
- **Controle**: Gerenciamento de catálogo próprio

### ✅ Validação e Regras
- **Dados de Entrada**: Validação rigorosa
- **Regras de Negócio**: Aplicação de políticas
- **Integridade**: Consistência dos dados

## 🛠️ Tecnologias

- **Framework**: NestJS 11.x
- **Linguagem**: TypeScript 5.x
- **Banco de Dados**: PostgreSQL 15
- **ORM**: TypeORM
- **Validação**: class-validator + class-transformer
- **Documentação**: Swagger/OpenAPI
- **Monitoramento**: Prometheus + Grafana
- **Tracing**: OpenTelemetry + Jaeger
- **Containerização**: Docker + Docker Compose

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- npm 9.x ou superior
- PostgreSQL 15
- Docker e Docker Compose (opcional)

## 🚀 Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd products-service
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Servidor
PORT=3001
NODE_ENV=development

# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=products_db

# Serviços Externos
MESSAGING_SERVICE_URL=http://localhost:3005

# Monitoramento
JAEGER_ENDPOINT=http://localhost:14268/api/traces
PROMETHEUS_PORT=9090

# Configurações de Produto
MAX_PRODUCTS_PER_PAGE=50
DEFAULT_PAGE_SIZE=20
MIN_STOCK_ALERT=5
```

### Configuração do Banco de Dados

1. **Crie o banco de dados**
```sql
CREATE DATABASE products_db;
```

2. **Execute as migrações**
```bash
npm run migration:run
```

## 🏃‍♂️ Execução

### Desenvolvimento

```bash
# Modo desenvolvimento com hot reload
npm run start:dev

# Modo debug
npm run start:debug

# Build e execução
npm run build
npm run start:prod
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev          # Inicia com watch mode
npm run start:debug        # Inicia em modo debug

# Build
npm run build              # Compila TypeScript
npm run start:prod         # Executa versão compilada

# Testes
npm run test               # Executa testes unitários
npm run test:watch         # Executa testes em watch mode
npm run test:cov           # Executa testes com coverage
npm run test:e2e           # Executa testes end-to-end

# Qualidade de Código
npm run lint               # Executa ESLint
npm run format             # Formata código com Prettier
```

## 🐳 Docker

### Docker Compose (Recomendado)

```bash
# Inicia todos os serviços
docker-compose up -d

# Inicia apenas o serviço
docker-compose up products-service

# Para os serviços
docker-compose down

# Rebuild da imagem
docker-compose up --build
```

### Docker Manual

```bash
# Build da imagem
docker build -t products-service .

# Executa o container
docker run -p 3001:3001 \
  -e DB_HOST=host.docker.internal \
  products-service
```

### Serviços Incluídos no Docker Compose

- **products-service**: Aplicação principal (porta 3001)
- **products-db**: PostgreSQL (porta 5432)
- **Prometheus**: Monitoramento (porta 9090)
- **Grafana**: Dashboards (porta 3000)

## 📡 API Endpoints

### 🛍️ Produtos

| Método | Endpoint | Descrição | Parâmetros |
|--------|----------|-----------|------------|
| POST | `/products` | Cria novo produto | Body: CreateProductDto |
| GET | `/products` | Lista produtos com filtros | Query: ProductQueryDto |
| GET | `/products/seller/:sellerId` | Lista produtos por vendedor | Query: ProductQueryDto |
| GET | `/products/:id` | Obtém produto por ID | - |
| PATCH | `/products/:id` | Atualiza produto | Body: UpdateProductDto |
| DELETE | `/products/:id` | Remove produto (soft delete) | - |
| PATCH | `/products/:id/stock` | Atualiza estoque | Body: { quantity: number } |

### 🏥 Health Check

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/health` | Status da aplicação |
| GET | `/health/ready` | Readiness probe |
| GET | `/health/live` | Liveness probe |

## 📊 Contratos de Dados

### CreateProductDto
```typescript
{
  name: string;
  description: string;
  price: number;
  category: string;
  sellerId: string;
  stock: number;
  images?: string[];
  tags?: string[];
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
}
```

### UpdateProductDto
```typescript
{
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
  images?: string[];
  tags?: string[];
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
}
```

### ProductQueryDto
```typescript
{
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sellerId?: string;
  search?: string;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'ASC' | 'DESC';
}
```

### Product Entity
```typescript
{
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sellerId: string;
  stock: number;
  images: string[];
  tags: string[];
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
```

### Product Response
```typescript
{
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sellerId?: string;
    search?: string;
  };
}
```

## 📈 Monitoramento

### Métricas Prometheus

- `products_total`: Total de produtos cadastrados
- `products_by_category`: Produtos por categoria
- `products_low_stock`: Produtos com estoque baixo
- `product_operations_total`: Operações CRUD
- `product_search_requests_total`: Requisições de busca
- `product_stock_updates_total`: Atualizações de estoque

### Dashboards Grafana

Acesse: `http://localhost:3000`

- **Products Dashboard**: Métricas de produtos
- **Inventory Dashboard**: Controle de estoque
- **Seller Metrics**: Métricas por vendedor

### Tracing Jaeger

Acesse: `http://localhost:16686`

- Traces de operações de produtos
- Performance analysis
- Query optimization

## 🧪 Testes

### Executar Testes

```bash
# Testes unitários
npm run test

# Testes com coverage
npm run test:cov

# Testes end-to-end
npm run test:e2e

# Testes em watch mode
npm run test:watch
```

### Estrutura de Testes

```
test/
├── app.e2e-spec.ts          # Testes E2E
├── jest-e2e.json           # Configuração Jest E2E
src/
├── **/*.spec.ts            # Testes unitários
└── **/*.controller.spec.ts # Testes de controllers
```

### Testes de Integração

```bash
# Testa criação de produto
curl -X POST http://localhost:3001/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Produto Teste",
    "description": "Descrição do produto",
    "price": 99.99,
    "category": "Eletrônicos",
    "sellerId": "seller-123",
    "stock": 10
  }'

# Testa listagem com filtros
curl "http://localhost:3001/products?category=Eletrônicos&minPrice=50&maxPrice=200&page=1&limit=10"

# Testa atualização de estoque
curl -X PATCH http://localhost:3001/products/product-id/stock \
  -H "Content-Type: application/json" \
  -d '{"quantity": 5}'
```

## 🚀 Deploy

### Script de Deploy

```bash
# Executa o script de deploy
./deploy.sh
```

### Deploy Manual

```bash
# Build da aplicação
npm run build

# Executa migrações
npm run migration:run

# Inicia em produção
npm run start:prod
```

### Variáveis de Ambiente para Produção

```env
NODE_ENV=production
PORT=3001
DB_HOST=your-production-db-host
MESSAGING_SERVICE_URL=https://messaging.yourdomain.com
```

## 🔧 Troubleshooting

### Problemas Comuns

1. **Erro de conexão com banco**
   - Verifique se o PostgreSQL está rodando
   - Confirme as credenciais no `.env`

2. **Erro de validação de dados**
   - Verifique os dados de entrada
   - Confirme se os DTOs estão corretos

3. **Produto não encontrado**
   - Verifique se o ID existe
   - Confirme se não foi soft deleted

4. **Estoque insuficiente**
   - Verifique a quantidade disponível
   - Confirme se o produto está ativo

### Logs

```bash
# Logs da aplicação
docker-compose logs -f products-service

# Logs do banco
docker-compose logs -f products-db
```

## 🔍 Busca e Filtros

### Filtros Disponíveis

- **Categoria**: Filtra por categoria específica
- **Preço**: Range de preços (min/max)
- **Vendedor**: Produtos de um vendedor específico
- **Busca**: Pesquisa por nome e descrição
- **Estoque**: Produtos com estoque disponível

### Ordenação

- **Nome**: Ordem alfabética
- **Preço**: Ordem crescente/decrescente
- **Data**: Mais recentes/antigos primeiro

### Paginação

- **Página**: Número da página (padrão: 1)
- **Limite**: Itens por página (padrão: 20, máximo: 50)

## 📚 Documentação Adicional

- [Swagger UI](http://localhost:3001/api) - Documentação interativa da API
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido com ❤️ para o Marketplace API**