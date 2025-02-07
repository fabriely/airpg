# AIRPG
Aplicação web que tem a funcionalidade de resumir e analisar dados de um arquivo submetido pelo usuário. 

# Instruções para Rodar o Código

Este projeto possui duas partes: **client** (frontend) e **server** (backend). Siga as etapas abaixo para rodar ambos os servidores localmente.

## Pré-requisitos

Certifique-se de ter o [pnpm](https://pnpm.io/) instalado para o frontend e [FastAPI](https://fastapi.tiangolo.com/) e [uvicorn](https://www.uvicorn.org/) para o backend.

## Configuração do Arquivo `.env`

Antes de rodar o código, é necessário configurar o arquivo `.env` para ambos o backend. 

   - No **backend** (server), crie um arquivo `.env` na pasta `server`.

2. Edite o arquivo `.env` de acordo com as configurações do seu ambiente local (como variáveis de banco de dados, API keys, etc.).

## Passos para Rodar o Código

### 1. Rodando o Frontend (Client)

Abra um terminal e navegue até a pasta `client`:

```bash
cd client
````
Instale as dependências com o pnpm:
```bash
pnpm i
````
Após a instalação, inicie o servidor de desenvolvimento:
```bash
pnpm run dev
````
O frontend estará disponível em http://localhost:3000.

### 2. Rodando o Backend (Server)
Abra outro terminal e navegue até a pasta `server`:
```bash
cd server
````
Sincronize o banco de dados e a máquina virtual:
```bash
uv sync
````

Caso seja sua primeira vez, se não for pode pular para o próximo passo: 
 - No terminal
   ```bash
   cd .venv 
   ````
   ```bash
   cd Scprits
   ````
   ```bash
   .\activate
   ````
- Logo após de ativar, volte para o server
  ```bash
   cd ../../ 
   ````
- No server:
  ```bash
   .\.venv\Scripts\activate.bat
   ````
Inicie o servidor utilizando o arquivo main.py:
```bash
fastapi dev main.py
````


O backend estará disponível em http://localhost:8000


