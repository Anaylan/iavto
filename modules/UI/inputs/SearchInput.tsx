import { Search } from 'assets/icon/icons';
interface SearchField {
  placeholder: string;
}

export const SearchInput: React.FC<SearchField> = ({
  placeholder,
  ...props
}) => {
  return (
    <>
      <form className={'header-top__form'} acceptCharset='UTF-8' id='t-search'>
        <div className={'header-top__form-wrap'}>
          <input placeholder={placeholder} type='text' name='s' />
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
