import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className='footer pt-10 pb-5 d-flex flex-column flex-md-row flex-stack'>
      {/* begin::Container */}
      {/* begin::Copyright */}
      <div className='text-dark order-2 order-md-1 container'>
        <span className='text-muted fw-bold me-1'>
          {new Date().getFullYear()} &copy; ЯАВТО.РФ Все права защищены
        </span>
      </div>
      {/* end::Copyright */}
      {/* end::Container */}
    </footer>
  );
};

export { Footer };
