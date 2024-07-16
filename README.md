# Projeto Backend

Este projeto é um backend desenvolvido com Node.js, Express e TypeScript, utilizando o Prisma como ORM para gerenciamento do banco de dados PostgreSQL. O projeto está estruturado para seguir os princípios do SOLID, Clean Code e Clean Architecture, visando uma alta manutenibilidade e escalabilidade.

## Índice

- [Projeto Backend](#projeto-backend)
  - [Índice](#índice)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [Principais Dependências](#principais-dependências)
  - [Scripts Disponíveis](#scripts-disponíveis)
  - [Princípios Utilizados](#princípios-utilizados)
    - [SOLID](#solid)
    - [Clean Code](#clean-code)
    - [Clean Architecture](#clean-architecture)
  - [Documentação da API](#documentação-da-api)
  - [Como Rodar o Projeto](#como-rodar-o-projeto)
  - [Observação para criar um novo usuário](#observação-para-criar-um-novo-usuário)
    - [Como Gerar um Token JWT](#como-gerar-um-token-jwt)

## Estrutura do Projeto

```bash
src/
├── application/
│   ├── interfaces/
│   │   └── http/
│   │       ├── controllers/
│   │       │   ├── AuthController.ts
│   │       │   ├── ClientController.ts
│   │       │   ├── ContractController.ts
│   │       │   └── UserController.ts
│   │       └── middleware/
│   │           ├── ensureAdmin.ts
│   │           └── ensureAuthenticated.ts
│   ├── use-cases/
│       ├── client/
│       │   ├── CreateClientUseCase.ts
│       │   ├── DeleteClientUseCase.ts
│       │   ├── FilterClientsUseCase.ts
│       │   ├── FindByIdClientUseCase.ts
│       │   ├── ListClientsUseCase.ts
│       │   └── UpdateClientUseCase.ts
│       ├── contract/
│       │   ├── CancelContractUseCase.ts
│       │   ├── CreateContractUseCase.ts
│       │   ├── DeleteContractUseCase.ts
│       │   └── UpdateContractUseCase.ts
│       └── user/
│           ├── CreateUserUseCase.ts
│           ├── DeleteUserUseCase.ts
│           ├── FindByIdUserUseCase.ts
│           ├── ListUserUseCase.ts
│           ├── LoginUserUseCase.ts
│           └── UpdateUserUseCase.ts
├── main/
│   ├── config/
│   │   └── swagger.ts
│   └── server.ts
├── presentation/
│   └── routes/
│       ├── authRoutes.ts
│       ├── clientRoutes.ts
│       ├── contractRoutes.ts
│       └── userRoutes.ts
├── prisma/
│   ├── migrations/
│   │   ├── 20240714065534_init/
│   │   │   └── migration.sql
│   │   ├── 20240714071050_add_role_to_user/
│   │   │   └── migration.sql
│   │   └── 20240714090212_add_clients_and_contracts/
│   │       └── migration.sql
│   ├── migration_lock.toml
│   └── schema.prisma
├── application.ts
├── package.json
└── tsconfig.json
```

## Principais Dependências

- `express`: Framework web para Node.js.
- `prisma`: ORM para banco de dados PostgreSQL.
- `typescript`: Superconjunto de JavaScript que adiciona tipagem estática.
- `bcryptjs`: Biblioteca para hashing de senhas.
- `jsonwebtoken`: Implementação de JSON Web Tokens para autenticação.
- `cors`: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- `dotenv`: Carrega variáveis de ambiente de um arquivo `.env`.
- `swagger-jsdoc`: Gera documentação Swagger a partir de comentários JSDoc.
- `swagger-ui-express`: Servidor Swagger UI para Express.

## Scripts Disponíveis

- `start`: Inicia o servidor em produção.
- `dev`: Inicia o servidor em modo de desenvolvimento com recarregamento automático.
- `build`: Compila o projeto TypeScript para JavaScript.
- `clean`: Remove a pasta `dist`.
- `lint`: Executa o linter ESLint.

## Princípios Utilizados

### SOLID

- **Single Responsibility Principle (SRP)**: Cada classe tem uma única responsabilidade. Por exemplo, cada caso de uso tem uma única responsabilidade e cada controlador lida com as requisições HTTP de uma única entidade.
- **Open/Closed Principle (OCP)**: O sistema é aberto para extensão, mas fechado para modificação. Novas funcionalidades podem ser adicionadas através de novos casos de uso sem alterar o código existente.
- **Liskov Substitution Principle (LSP)**: Os objetos podem ser substituídos por instâncias de seus subtipos sem alterar a corretude do programa. 
- **Interface Segregation Principle (ISP)**: As interfaces são pequenas e específicas, garantindo que as classes não sejam obrigadas a implementar métodos que não utilizam.
- **Dependency Inversion Principle (DIP)**: As dependências internas das classes são injetadas, facilitando a testabilidade e o desacoplamento.

### Clean Code

- **Legibilidade**: Código claro e fácil de entender.
- **Simplicidade**: Evitar complexidade desnecessária.
- **Nominação significativa**: Nomes de variáveis, funções e classes que descrevem claramente seu propósito.
- **Comentários úteis**: Comentários que agregam valor e ajudam a entender a lógica do código.

### Clean Architecture

- **Divisão de responsabilidades**: Separação clara entre camadas de apresentação, aplicação, domínio e infraestrutura.
- **Independência de frameworks**: A aplicação não depende diretamente de frameworks, facilitando a troca de tecnologias.
- **Testabilidade**: Cada camada pode ser testada de forma isolada, garantindo a integridade do sistema como um todo.

## Documentação da API

A documentação da API é gerada automaticamente utilizando o Swagger. Para acessar a documentação, inicie o servidor e acesse:

`http://localhost:3000/api-docs`

## Como Rodar o Projeto

1. Clone o repositório.
2. Instale as dependências utilizando `npm install`.
3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   
```plain
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
JWT_SECRET=your_jwt_secret
```

4. Execute as migrações do banco de dados utilizando `npx prisma migrate dev`.
5. Inicie o servidor em modo de desenvolvimento utilizando `npm run dev`.


## Observação para criar um novo usuário

Foi implementado um controle de segurança para a rota de criação de usuários (`userRoutes.post('/users', ensureAuthenticated, userController.create);`) utilizando o middleware `ensureAuthenticated`. Para criar qualquer usuário, é necessário fornecer um token JWT válido.

### Como Gerar um Token JWT

Para gerar um token JWT, siga os passos abaixo:

1. Acesse [jwt.io](https://jwt.io/).
2. No campo **Payload**, adicione as informações necessárias conforme o exemplo abaixo:
   ```json
   {
     "sub": "user_id",
     "role": "USER"
   }
3. No campo Verify Signature, insira a secret que está definida no arquivo .env.
4. Clique em Encode para gerar o token.

Com o token gerado, você poderá utilizá-lo nas requisições para criar novos usuários. Insira o token no cabeçalho da requisição conforme o exemplo abaixo:

```bash
curl -X POST http://localhost:3000/api/users \
-H "Authorization: Bearer <seu_token_jwt>" \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "USER"
}'
```