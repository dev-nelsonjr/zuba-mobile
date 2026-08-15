# Zuba Mobile

Aplicativo mobile do **Zuba**, uma solução de controle financeiro pessoal. O app permite acompanhar o resumo mensal, navegar entre meses, registrar receitas e despesas e receber lembretes de vencimento.

O projeto foi desenvolvido individualmente e faz parte de um MVP full stack composto por este aplicativo, pela [API](https://github.com/dev-nelsonjr/Zuba-api) e pela [aplicação web](https://github.com/dev-nelsonjr/Zuba-web).

## Funcionalidades

- Cadastro e login de usuários
- Persistência local da sessão
- Dashboard com receitas, despesas e saldo mensal
- Navegação entre meses
- Cadastro e listagem de transações
- Notificações push com Firebase Cloud Messaging
- Testes dos principais fluxos de autenticação

## Tecnologias

- React Native 0.80 e React 19
- React Navigation
- TanStack Query
- Axios e AsyncStorage
- Formik e Yup
- styled-components e styled-system
- React Native Firebase Messaging
- Testing Library e Jest

## Como executar no Android

### Pré-requisitos

- Node.js 20.19.4 ou superior
- Yarn 1
- Android Studio, Android SDK e JDK configurados
- Emulador Android ou aparelho conectado por USB
- [Zuba API](https://github.com/dev-nelsonjr/Zuba-api) executando na porta `9900`

```bash
git clone https://github.com/dev-nelsonjr/zuba-mobile.git
cd zuba-mobile
yarn
```

Crie um arquivo `.env` na raiz:

```env
NODE_ENV=development
API_ENV=custom
CUSTOM_URL=http://localhost:9900
```

Inicie o Metro:

```bash
yarn start
```

Em outro terminal, instale e abra o aplicativo:

```bash
yarn android
```

O script `preandroid` configura o redirecionamento da porta `9900` com `adb reverse`, permitindo que o Android acesse a API local.

## Firebase

As notificações utilizam Firebase Cloud Messaging. Para outro projeto Firebase, substitua a configuração Android em `android/app/google-services.json` e informe a credencial administrativa na variável `FIREBASE_SERVICE_ACCOUNT` da API.

## Testes

```bash
yarn test --runInBand --forceExit
```

## Status

O aplicativo está em estágio de MVP e seu fluxo principal foi validado no Android.
