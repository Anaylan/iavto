import { ITextArea } from 'app/models';
import { FC } from 'react';

export const Textarea: FC<ITextArea> = ({ children, className, ...props }) => {
  return (
    <>
      <textarea className={`form__input ${className}`} {...props}>
        {children}
      </textarea>
    </>
  );
};
