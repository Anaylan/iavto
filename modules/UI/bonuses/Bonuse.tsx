import { Check } from 'assets/icon/icons';
import { ReactNode } from 'react';

export const Bonuse = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <li>
      <div className='icon'>
        <Check />
      </div>
      <div className='car__bonuses-item'>
        <div className='car__bonuses-title'>{title}</div>
        <div className='car__bonuses-subtitle'>{children}</div>
      </div>
    </li>
  );
};
