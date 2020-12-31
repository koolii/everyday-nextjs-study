import { useRouter } from 'next/dist/client/router';
import React from 'react';

const Greeting: React.FC = () => {
  const router = useRouter();
  const { name } = router.query;
  return <div>Hello {name}</div>;
};

export default Greeting;
