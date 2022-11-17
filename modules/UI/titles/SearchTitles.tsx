import { ReactNode } from 'react';

export const SearchTitleH3 = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <h3 className={`search__title-sm title-sm`}>{children}</h3>
    </>
  );
};
