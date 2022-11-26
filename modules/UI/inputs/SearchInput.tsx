import { Search } from 'assets/icon/icons';
import { HTMLAttributes, InputHTMLAttributes } from 'react';

interface SearchField extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  props?: InputHTMLAttributes<HTMLInputElement>;
}

export const SearchInput: React.FC<SearchField> = ({
  placeholder,
  ...props
}) => {
  return (
    <>
      <form className={'header-top__form'} acceptCharset='UTF-8' id='t-search'>
        <div className={'header-top__form-wrap'}>
          <input placeholder={placeholder} {...props} />
          <button className={'header-top__form-btn'} disabled type='submit'>
            <span className={'icon'}>
              <Search />
            </span>
          </button>
        </div>
      </form>
    </>
  );
};
