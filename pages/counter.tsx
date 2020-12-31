import React, { useState } from 'react';

interface Props {
  initialCount: number;
}

const Counter: React.FC<Props> = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <div>{count}</div>
      <button type="button" onClick={() => setCount((cnt: number) => cnt + 1)}>
        increment
      </button>
      <button type="button" onClick={() => setCount((cnt: number) => cnt - 1)}>
        decrement
      </button>
    </div>
  );
};

export default Counter;
export const getServerSideProps = (): { props: Props } => ({ props: { initialCount: 10 } });
