import React from 'react';
// import { useRouter } from 'next/router';

// const Greeting: React.FC = () => {
//   const router = useRouter();
//   const { name } = router.query;
//   return <div>Hello {name}</div>;
// };

// useRouterだとクライアント側で処理するために、レンダリング時のチラつきが気になるかもしれません。
// その場合はgetServerSidePropsを利用しましょう
interface Props {
  name: string;
}
const Greeting: React.FC<Props> = ({ name }) => <div>Hello {name}</div>;

export default Greeting;
export const getServerSideProps = (): { props: Props } => ({ props: { name: 'koolii' } });
