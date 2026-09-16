# Zuba Mobile

Aplicativo Android do **Zuba**, um MVP de controle financeiro pessoal. O app mantém o fluxo principal da aplicação Web e adiciona lembretes de vencimento por notificação push.

O projeto foi desenvolvido individualmente e integra a [API](https://github.com/dev-nelsonjr/Zuba-api) e a [aplicação web](https://github.com/dev-nelsonjr/Zuba-web).

## Funcionalidades

- Cadastro e login
- Sessão autenticada com persistência no dispositivo
- Dashboard de receitas, despesas e saldo mensal
- Navegação entre meses e anos
- Cadastro de receitas e despesas
- Definição de data de vencimento
- Alteração do status entre pendente e concluída
- Exclusão de transações
- Estados de carregamento, vazio e erro
- Menu lateral e navegação adaptados ao mobile
- Lembretes de vencimento com Firebase Cloud Messaging
- Testes dos fluxos principais

## Tecnologias

- React Native e TypeScript
- React Navigation
- TanStack Query e Axios
- AsyncStorage
- Formik e Yup
- styled-components e styled-system
- React Native Firebase Messaging
- Testing Library e Jest

## Estrutura

```text
src/
  components/   componentes, navegação visual e providers
  lib/          integrações e utilitários compartilhados
  pages/        autenticação, dashboard e transações
  services/     SDK e comunicação com a API
  types/        declarações TypeScript auxiliares
```

O SDK mantém o contrato com a mesma API usada pela Web. O TanStack Query controla o estado remoto, enquanto o AsyncStorage preserva a sessão entre aberturas do aplicativo.

## Executando no Android

### Pré-requisitos

- Node.js e Yarn
- Android Studio, Android SDK e JDK configurados
- Emulador Android ou aparelho conectado por USB
- [Zuba API](https://github.com/dev-nelsonjr/Zuba-api) em execução

```bash
git clone https://github.com/dev-nelsonjr/zuba-mobile.git
cd zuba-mobile
yarn install
```

Copie `.env.example` para `.env` e informe a URL da API:

```env
NODE_ENV=development
API_URL=http://localhost:9900
```

Inicie o Metro:

```bash
yarn start
```

Em outro terminal, instale e abra o aplicativo:

```bash
yarn android
```

Antes do build Android, o script `preandroid` executa `adb reverse tcp:9900 tcp:9900`. Isso permite que um dispositivo conectado por USB acesse a API local pela porta `9900`.

Para usar uma API remota, altere `API_URL` para um endereço HTTPS acessível pelo dispositivo.

## Firebase

As notificações utilizam Firebase Cloud Messaging. Para conectar outro projeto Firebase:

1. adicione a configuração Android em `android/app/google-services.json`;
2. configure `FIREBASE_SERVICE_ACCOUNT` somente no ambiente da API;
3. execute o aplicativo em um dispositivo compatível e permita as notificações.

O token do dispositivo é registrado na API após o login. Em segundo plano, o aplicativo pode receber os lembretes enviados pelo job de notificações.

## Qualidade

```bash
yarn typecheck
yarn lint
yarn test --runInBand --watch=false
```

Para validar uma build Android local:

```bash
yarn android
```

## Escopo do MVP

O cliente Mobile cobre autenticação, gerenciamento mensal de transações e notificações no Android. Distribuição pelas lojas, recuperação de senha, categorias e suporte validado ao iOS permanecem como evoluções futuras.
