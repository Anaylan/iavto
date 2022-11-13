import { DetailedHTMLProps, FC, SelectHTMLAttributes } from 'react';
import styles from 'assets/sass/components/blocks/search.module.scss';

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode;
  props?: SelectHTMLAttributes<HTMLSelectElement>;
}

export const SearchSelect: FC<ISelectProps> = ({ children, ...props }) => {
  return (
    <>
      <select
        className={`search-additional__select 
          search-form__input align-items-center`}
        {...props}
      >
        {children}
      </select>
    </>
  );
};
