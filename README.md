# Next.js study

## 状態管理について

素直にページごとを独立した SPA と考えて実装していくほうが素直らしい
Redux も頻度が減るだろうという考えらしい

## Pages でのみ実行される特殊な関数

### getServerSideProps

Next.js がサーバーサイドで実行される際に実行

### getStaticProps

getServerSideProps と同じ効果ですが、`next build` をしたタイミング等に一括で処理が実行される

### getStaticPaths

`next build` 時に生成するパスを決定
全ユーザページを作成する際などに使用

```typescript
// user/[uid].tsx
export async function getStaticPaths() {
  const users = await getAllUsers();
  return {
    paths: users.map((user) => `/user/${user.id}`),
    fallback: true,
  };
}
```

## API

API を実装する際は `pages/` 以下に作成する

### API の共通処理

refs: https://nextjs.org/docs/api-routes/api-middlewares

Next.js が 9 系の段階では共通処理を行うための仕組みはまだないので少々工夫する必要がある

- src/middleware.ts
- pages/api/holidays/[year].ts

### API のハンドラ自体 `(req, res) => void` を拡張するやり方について

refs: https://nextjs.org/docs/api-routes/api-middlewares#extending-the-reqres-objects-with-typescript

### 向かないもの

- MySQL 等と直接やりとりする
  - ORM のの習熟がいまいち？
- WebSocket 等を使ったコネクションを永続化させるもの
  - Pusher 等をかませると利用できそう(Nest.js/Blitz.js 等も利用してみると良いかも知れない)

## 共通処理

### \_app.js と\_document.js

全てのページをラップするもので、全ページで共通化したいときに便利です
例えば認証機能などは\_app.js から呼び出すと良い
グローバルな CSS もここで追加することになる

また、類似のものとして\_document.js というファイルもあり、
これは更に上位で<html>に相当する部分の組み立てから行うもの

例えば簡単な部分で言えば<Html lang="en">のようにしたい場合はわかりやすいです
その他、Google Analytics のタグ設定や、上記でも説明してるように、CSS in JS のセットアップは概ね\_document.js で行います

## エラーページ

pages/404.js を作ると 404 ページをカスタマイズ出来ます
400 や 403 は標準には存在しないので getServerSideProps 等で res を加工する必要があるかもしれません

500 エラーの場合は pages/\_error.js を利用します

## Tip

### 動的 loading 用のコンポーネント

loadable-components や react-loadable といった動的 import 用のライブラリは `next/dynamic` で置き換え可能

### サーバレスとして活用する Next.js

`pages/api` で API としての機能を備えているので独自のサーバレス環境(API サーバ)としても動作します
(Typescript でも普通に動作するという利点等がある)

Express 等と異なり、ファイル単位でのルーティングなので、猥雑にならず、動的ルーティングにも対応している

https://vercel.com/docs/serverless-functions/introduction

### 認証周り

`next-auth` がかなり強力

Slack 認証をする(OAuth Provider)
https://zenn.dev/terrierscript/articles/2020-09-23-internal-admin-tools-auth-slack

### Babel の利用

`next/babel` をインストールし、 `.babelrc` を作成することで Babel を利用できる

### AMP 対応

`next/amp`
https://nextjs.org/docs/advanced-features/amp-support/introduction

### リダイレクト/リライト

- https://nextjs.org/docs/api-reference/next.config.js/redirects
- https://nextjs.org/docs/api-reference/next.config.js/rewrites

### 簡易機能を備えた LP

- pages で LP、フォーム部分など動的な部分を作成する
- api/form.ts のような形でフォームの受口を作る
- API の内部でフォームを別なサーバーへポストするなり必要な処理をする
- CORS 回避の必要があれば api か getServerSideProps を利用する
