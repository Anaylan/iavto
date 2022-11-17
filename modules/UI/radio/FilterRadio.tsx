import { IFormInputCheckbox } from 'app/models';
import React, { FC, ReactNode } from 'react';

export const FilterRadioGroup = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className='search-additional__radio-group'>{children}</div>
    </>
  );
};

export const FilterRadioItem: FC<IFormInputCheckbox> = ({
  id,
  children,
  ...props
}) => {
  return (
    <>
      <div className='search-additional__radio'>
        <input type='radio' id={id} {...props} />
        <label htmlFor={id}>{children}</label>
      </div>
    </>
  );
};
