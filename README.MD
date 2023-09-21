# Eng GruposBF Backend TypeScript

Descrição curta e informativa sobre o projeto.

## Estrutura de Pastas

- **.github**
  - **workflows**
    - *github.actions.config.yml*: Configuração para integração contínua (CI/CD) usando GitHub Actions.
- **config**
  - *`.env.test`*: Arquivo de configuração de variáveis de ambiente para ambiente de teste.
- **src**
  - **constants**: Constantes utilizadas no projeto.
  - **controllers**: Controladores para manipular as requisições.
  - **interfaces**: Interfaces TypeScript utilizadas no projeto.
  - **logics**: Lógicas de negócio.
  - **processors**: Processadores para processamento de dados.
  - **routes**: Definição de rotas da aplicação.
  - **services**: Serviços utilizados na aplicação.
  - *`server.ts`*: Ponto de entrada da aplicação.
- **tests**: Testes e de integração.

## Como Rodar o Projeto
- Interessante dizer que fiz uso de 2 recursos "externos"
  - Utilizei uma API que me devolve as cotações de moedas https://fixer.io/. Não deixei configaravel a chave por que não vi necessidade, apenas para esse exemplo e teste.
  - Uso de um redis para fazer cache da requisicao da api citada acima remoto gratuito disponibilizado pelo redislabs(https://redis.com/). Sendo assim é necessário usar a senha que irei descrever na config
  
### Pré-requisitos

- Node.js e npm instalados.
- Docker (para executar em contêiner).
- Chave de API (se aplicável).

### Instalação

1. Clone o repositório
2. Entre no diretório do projeto
3. Instale as dependências: `npm install`

### Configuração

- Copie o arquivo `.env.test` para `.env` e configure as variáveis de ambiente conforme necessário.

``` 
NODE_ENV='development'
API_URL='http://data.fixer.io/api/latest'
API_KEY='098cfd4dba04c11c44fdd3f6c9f3b9df'
```
Perceba que deixei o development, esse tratamento diferencia em teste e por não existir um cenário de produção.

### Rodando Localmente

- Para iniciar a aplicação: `npm run dev`
- Acesse a aplicação em: `http://localhost:8000` 

OBS: Não  deixei porta configuravel no exemplo, parafacilitar a tradução no container

### Testes

- Para rodar os testes: `npm test`

### Build

- Para buildar o projeto: `npm run build`

### Usando Docker
Como a aplicação tem outras ferramentas como Prometheus, grafana, etc... juntos, usei um docker-compose para instancialos 

- Use o comando : `docker-compose up .`


## API - Rota de Conversão de Moeda

### Endpoint

- `/convert/:id/:value`

### Parâmetros

- `id`: Código da moeda a ser convertida.
- `value`: Valor a ser convertido.

### Exemplo de Uso

- **URL**: `http://localhost:8000/convert/USD/10`
- **Método**: `GET`
- **Resposta**: Retorna o valor convertido.

## Monitoramento de Métricas

A aplicação foi configurada para coletar métricas essenciais, que oferecem insights valiosos sobre o desempenho e a saúde do sistema em execução. Essas métricas são coletadas utilizando o [Prometheus](https://prometheus.io/), um sistema de monitoramento e alerta de código aberto altamente escalável.

### Integração de Métricas

As métricas são geradas em pontos estratégicos do código-fonte e, posteriormente, expostas em um endpoint `/metrics`. Essas métricas são coletadas pelo Prometheus, permitindo monitoramento em tempo real e geração de alertas com base em regras pré-definidas.

A exposição das métricas é feita utilizando a biblioteca [prom-client](https://github.com/siimon/prom-client), que facilita a criação e o gerenciamento de métricas no formato aceito pelo Prometheus.

### Como Utilizar as Métricas

Para acessar as métricas, basta fazer acessar http://localhost:9090/ para o prompt do Prometheus, ou criar um dashboard no grafana no endereço http://localhost:3000/

### Configuração

Para configurar o sistema de monitoramento de métricas, consulte o arquivo [prometheus.yml](./prometheus-config/prometheus.yml). Esse arquivo contém a configuração do Prometheus para raspagem das métricas da aplicação.

A aplicação e o Prometheus estão integrados por meio de um [Docker Compose](./docker-compose.yml), permitindo a execução conjunta dos serviços de forma fácil e integrada.

### Personalização

É possível personalizar as métricas coletadas, incluindo novas métricas para monitorar aspectos específicos da aplicação. Para isso, consulte a documentação da biblioteca [prom-client](https://github.com/siimon/prom-client) para exemplos e técnicas de customização.



## Decisões Arquiteturais

- **Swagger e afins**: Como só temos uma rota, preferi descrever o uso da mesma, sem adicionar um ferramenta pra isso, para não adicionar mais complexidade ao exemplo. 

- **Valores fixos no código**: Pensando justamente na facilidade de uso, coisas que não precisam ser configuradas nesse contexto, como: _chave de cache, chave da api do seriço que utilzie, etc..._. Ponderei e deixei de forma que, apenas as configs no env são suficientes para o uso.

- **Estrutura de pastas**: A divisão do projeto em pastas (controllers, logics, etc.) foi escolhida para manter a organização e facilitar a manutenção. Não vi necessidade de estabelecer ainda mais complexidade diante do problema (como clean arquiteture ou uma arquitetura hexagonal, por exemplo...). 
