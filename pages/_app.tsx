import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { AppProps } from 'next/app';

dayjs.locale('ja');

// _document.tsx：最終的に出力するHTMLファイルの設定ができるファイル
// _app.tsx: Routeコンポーネントをラップする特殊なコンポーネントファイル
const App = (props: AppProps): JSX.Element => {
  // 共通して実行させたい処理や共通のレイアウト
  // ログイン認証監視等
  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
};

export default App;
