import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export const Bullet = ({ getData }: { getData: CallableFunction }) => {
  const [count, setCount] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if (typeof window != 'undefined') {
      getData().then(({ data }: { data: any }) => {
        setCount(data.count);
      });
    }
  }, [getData, router]);

  return (
    <>
      {count > 0 ? (
        <span className='btn-bullet'>
          {count > 99 ? '99+' : count}
        </span>
      ) : null}
    </>
  );
};
