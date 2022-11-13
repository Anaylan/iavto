import { IButton } from 'app/models';
import { FC } from 'react';

export const Button: FC<IButton> = ({ className, children, ...props }) => {
  return (
    <>
      <button className={`btn-main ${className}`} {...props}>
        {children}
      </button>
    </>
  );
};
