import { AriaAttributes, FC, HTMLAttributes, ReactNode } from 'react';

interface IPagination {
  children: ReactNode;
  props?: AriaAttributes;
}

export const Pagination: FC<IPagination> = ({ children, props }) => {
  return (
    <>
      <nav {...props}>
        <ul
          className={`pagination-wrapper pagination justify-content-center align-items-center`}
        >
          {children}
        </ul>
      </nav>
    </>
  );
};

export const PaginationItem = ({
  children,
  props,
}: {
  children: ReactNode;
  props?: HTMLAttributes<HTMLLIElement>;
}) => {
  return (
    <>
      <li className='page-item' {...props}>
        {children}
      </li>
    </>
  );
};

const PaginationCurrent = ({
  currentPage,
  totalPage,
}: {
  currentPage: number;
  totalPage: number;
}) => {
  return (
    <>
      <li className={`tables__pagination-value`}>
        <span>{currentPage}</span> из <span>{totalPage}</span>
      </li>
    </>
  );
};
