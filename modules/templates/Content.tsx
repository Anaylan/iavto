import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
        ref.current.classList.add('main-auth');
      }
    } else {
      ref.current.classList.remove('d-flex');
      ref.current.classList.remove('align-items-center');
      ref.current.classList.remove('justify-content-center');
      ref.current.classList.remove('main-auth');
    }
  }, [router]);
  return (
    <main ref={ref} className={'main'}>
      {children}
      {/* Тогда закрывай */}
      {/* Мне кажется да, я посмотрел, работает при нажатии на блок, увидел сообщение и тогда появилась ссылка */}
      <div className="open-carpark shadow-lg"><Link href="https://xn--80aaf7asgim.xn--80ae0bp6d.xn--p1ai/register">Открыть автопарк</Link></div>
    </main>
  );
};

export default Content;
