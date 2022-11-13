import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

interface IChild {
  children: React.ReactNode;
}

const Content: React.FC<IChild> = ({ children }) => {
  const ref: React.RefObject<any> = useRef();
  const router = useRouter();
  useEffect(() => {
    if (router.pathname.includes('/auth/')) {
      if (
        !ref.current.classList.contains(
          'd-flex align-items-center justify-content-center',
        )
      ) {
        ref.current.classList.add('d-flex');
        ref.current.classList.add('align-items-center');
        ref.current.classList.add('justify-content-center');
      }
    } else {
      ref.current.classList.remove('d-flex');
      ref.current.classList.remove('align-items-center');
      ref.current.classList.remove('justify-content-center');
    }
  }, [router]);
  return (
    <main ref={ref} className={'main'}>
      {children}
    </main>
  );
};

export default Content;
