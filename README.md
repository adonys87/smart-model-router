# 🤖 Smart Model Router

> Projeto de aprendizado para testar e explorar modelos de LLM disponíveis no [OpenRouter](https://openrouter.ai).
>
> A learning project to test and explore LLM models available on [OpenRouter](https://openrouter.ai).

**[🇧🇷 Português](#português)** | **[🇺🇸 English](#english)**

---

## Português

### Sobre

**Smart Model Router** é um projeto de aprendizado com o objetivo de **testar e explorar modelos de LLM disponíveis no [OpenRouter](https://openrouter.ai)**.

O projeto expõe uma API REST simples: você envia uma pergunta e o OpenRouter roteia a requisição para **um dos modelos configurados**, escolhendo o melhor provedor/modelo de acordo com critérios configuráveis — **preço**, **latência** ou **throughput**. A resposta final indica qual modelo foi utilizado, facilitando a comparação prática entre eles.

### Funcionalidades

- 🔌 API REST com o endpoint `POST /chat`
- 🧠 Roteamento entre múltiplos modelos de LLM (realizado pelo OpenRouter)
- ⚖️ Critério de roteamento configurável: `price`, `latency` ou `throughput`
- ⚙️ Configuração centralizada e fácil de alterar (modelos, `temperature`, `maxTokens`, `systemPrompt`)
- ✅ Testes E2E com o runner de testes nativo do Node.js (`node:test`)

### Requisitos

- **Node.js 22.6+** (execução nativa de TypeScript — recomendado: Node.js 24)
- **npm**
- **Chave de API do OpenRouter** — crie uma conta em [openrouter.ai](https://openrouter.ai) e gere sua chave

### Instalação

```bash
git clone https://github.com/adonys87/smart-model-router.git
cd smart-model-router
npm install
```

### Configuração

1. Crie o arquivo de ambiente a partir do exemplo:

```bash
cp .env_example .env
```

2. Edite o `.env` e informe sua chave:

```env
OPENROUNTER_API_KEY=your-api-key
```

> ⚠️ O arquivo `.env` está no `.gitignore` — **nunca** versione sua chave de API.

### Modelos e parâmetros

Os parâmetros de geração ficam em [`src/config.ts`](src/config.ts):

| Campo | Descrição | Padrão |
| --- | --- | --- |
| `models` | Lista de modelos que o OpenRouter pode usar | `apodex/apodex-1.1-mini:free`, `liquid/lfm-2.5-2.6b:free` |
| `temperature` | Criatividade da resposta (menor = mais conservador) | `0.2` |
| `maxTokens` | Máximo de tokens da resposta | `50` |
| `systemPrompt` | Prompt de sistema que guia o comportamento do modelo | `your are a helpful assistant` |
| `provider.sort.by` | Critério de roteamento: `price`, `latency` ou `throughput` | `throughput` |
| `provider.sort.partition` | Particionamento de provedores | `none` |

### Rodando o servidor

```bash
npm run dev
```

O servidor sobe em <http://localhost:3003>.

### Usando a API

```bash
curl -X POST http://localhost:3003/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "What is rate limiting and how does it work?"}'
```

Exemplo de resposta:

```json
{
  "model": "liquid/lfm-2.5-2.6b:free",
  "content": "Rate limiting is..."
}
```

| Campo | Descrição |
| --- | --- |
| `model` | Modelo que atendeu a requisição |
| `content` | Resposta gerada pelo modelo |

> 📌 A `question` deve ter no mínimo 5 caracteres (validação no schema do endpoint).

### Testes

```bash
npm test          # executa os testes E2E
npm run test:dev  # executa em modo watch + debugger (--inspect)
```

Os testes em [`tests/router.e2e.test.ts`](tests/router.e2e.test.ts) exercitam o endpoint `POST /chat` de ponta a ponta e verificam qual modelo foi selecionado para cada critério de roteamento.

> ⚠️ Os testes fazem **chamadas reais** à API do OpenRouter: exigem chave válida e consomem créditos.

### Estrutura do projeto

```
smart-model-router/
├── src/
│   ├── index.ts              # ponto de entrada: cria o serviço e o servidor e escuta na porta 3003
│   ├── server.ts             # servidor Fastify com o endpoint /chat
│   ├── openrouterService.ts  # cliente do OpenRouter: roteia os modelos e gera a resposta
│   └── config.ts             # configuração do projeto (chave, modelos, parâmetros, roteamento)
├── tests/
│   └── router.e2e.test.ts    # testes E2E do roteamento de modelos
├── .env_example              # exemplo de variáveis de ambiente
├── .gitignore
├── package.json
└── tsconfig.json
```

### Como funciona o roteamento?

O serviço não decide sozinho qual modelo responde: ele envia a **lista completa de modelos** configurada para o OpenRouter, e a plataforma escolhe o melhor provedor/modelo conforme o critério `provider.sort` e a disponibilidade no momento da requisição.

Isso permite comparar os modelos na prática: basta alternar `provider.sort.by` entre `price`, `latency` e `throughput`, fazer as mesmas perguntas e observar — pelo campo `model` da resposta — qual modelo atendeu em cada cenário.

### Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Roda o servidor em modo desenvolvimento (watch + inspect) |
| `npm test` | Executa os testes E2E |
| `npm run test:dev` | Executa os testes em modo watch + inspect |

---

## English

### About

**Smart Model Router** is a learning project whose goal is to **test and explore LLM models available on [OpenRouter](https://openrouter.ai)**.

The project exposes a simple REST API: you send a question and OpenRouter routes the request to **one of the configured models**, picking the best provider/model based on configurable criteria — **price**, **latency** or **throughput**. The final response indicates which model was used, making it easy to compare models in practice.

### Features

- 🔌 REST API with the `POST /chat` endpoint
- 🧠 Routing between multiple LLM models (handled by OpenRouter)
- ⚖️ Configurable routing criteria: `price`, `latency` or `throughput`
- ⚙️ Centralized, easy-to-change configuration (models, `temperature`, `maxTokens`, `systemPrompt`)
- ✅ E2E tests with Node.js' built-in test runner (`node:test`)

### Requirements

- **Node.js 22.6+** (native TypeScript execution — Node.js 24 recommended)
- **npm**
- **OpenRouter API key** — create an account at [openrouter.ai](https://openrouter.ai) and generate your key

### Installation

```bash
git clone https://github.com/adonys87/smart-model-router.git
cd smart-model-router
npm install
```

### Configuration

1. Create the environment file from the example:

```bash
cp .env_example .env
```

2. Edit `.env` and set your key:

```env
OPENROUNTER_API_KEY=your-api-key
```

> ⚠️ The `.env` file is in `.gitignore` — **never** commit your API key.

### Models and parameters

Generation parameters live in [`src/config.ts`](src/config.ts):

| Field | Description | Default |
| --- | --- | --- |
| `models` | List of models OpenRouter may use | `apodex/apodex-1.1-mini:free`, `liquid/lfm-2.5-2.6b:free` |
| `temperature` | Response creativity (lower = more conservative) | `0.2` |
| `maxTokens` | Maximum number of tokens in the response | `50` |
| `systemPrompt` | System prompt guiding the model's behavior | `your are a helpful assistant` |
| `provider.sort.by` | Routing criteria: `price`, `latency` or `throughput` | `throughput` |
| `provider.sort.partition` | Provider partitioning | `none` |

### Running the server

```bash
npm run dev
```

The server starts at <http://localhost:3003>.

### Using the API

```bash
curl -X POST http://localhost:3003/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "What is rate limiting and how does it work?"}'
```

Example response:

```json
{
  "model": "liquid/lfm-2.5-2.6b:free",
  "content": "Rate limiting is..."
}
```

| Field | Description |
| --- | --- |
| `model` | Model that handled the request |
| `content` | Answer generated by the model |

> 📌 `question` must have at least 5 characters (validated by the endpoint schema).

### Tests

```bash
npm test          # run the E2E tests
npm run test:dev  # run in watch + debugger (--inspect) mode
```

The tests in [`tests/router.e2e.test.ts`](tests/router.e2e.test.ts) exercise the `POST /chat` endpoint end to end and verify which model is selected for each routing criteria.

> ⚠️ The tests make **real calls** to the OpenRouter API: they require a valid key and consume credits.

### Project structure

```
smart-model-router/
├── src/
│   ├── index.ts              # entry point: creates the service and server, listens on port 3003
│   ├── server.ts             # Fastify server with the /chat endpoint
│   ├── openrouterService.ts  # OpenRouter client: routes the models and generates the answer
│   └── config.ts             # project configuration (key, models, parameters, routing)
├── tests/
│   └── router.e2e.test.ts    # model routing E2E tests
├── .env_example              # environment variables example
├── .gitignore
├── package.json
└── tsconfig.json
```

### How does the routing work?

The service does not decide on its own which model answers: it sends the **full list of configured models** to OpenRouter, and the platform picks the best provider/model according to the `provider.sort` criteria and availability at request time.

This makes it possible to compare models in practice: just switch `provider.sort.by` between `price`, `latency` and `throughput`, ask the same questions, and observe — via the `model` field in the response — which model answered in each scenario.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Runs the server in development mode (watch + inspect) |
| `npm test` | Runs the E2E tests |
| `npm run test:dev` | Runs the tests in watch + inspect mode |

