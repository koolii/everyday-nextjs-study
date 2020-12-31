import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

type Middleware = (handler: NextApiHandler) => NextApiHandler;

// ログイン認証のmiddlewareの追加等ができる
export const withFoo: Middleware = (handler) => {
  // 処理
  console.log('withFooの呼び出し時/共通処理');
  return (req: NextApiRequest, res: NextApiResponse) => {
    // 処理
    console.log('withFooのリクエスト処理時/共通処理');
    return handler(req, res);
  };
};
export const withBar: Middleware = (handler) => (req, res) => handler(req, res);

const generalMiddleware: Middleware = (handler) => withFoo(withBar(handler));

export default generalMiddleware;
