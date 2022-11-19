import { IFormInput } from 'app/models';
import { FC } from 'react';
import MaskedInput from 'react-text-mask';

export const FormInputWithLabel: FC<IFormInput> = ({
  title,
  className,
  children,
  ...props
}) => {
  return (
    <>
      <div className={'form__item'}>
        {/* <div className={'form__label'}>{title}</div> */}
        <div className={'form__wrap'}>
          <input className={`form__input ${className}`} {...props} />
          {children}
        </div>
      </div>
    </>
  );
};

export const FormInputWithMask: FC<IFormInput> = ({
  title,
  className,
  mask,
  ...props
}) => {
  // const phoneMask = createNumberMask({
  //   ...defaultMaskOptions,
  //   ...mask,
  // })
  return (
    <>
      <div className={'form__item'}>
        {/* <div className={'form__label'}>{title}</div> */}
        <div className={'form__wrap'}>
          {mask ? (
            <MaskedInput
              mask={mask}
              className={`form__input form__input_tel ${className}`}
              {...props}
            />
          ) : (
            <input className={`form__input ${className}`} {...props} />
          )}
        </div>
      </div>
    </>
  );
};

export const FormInputWithoutLabel: FC<IFormInput> = ({
  title,
  className,
  ...props
}) => {
  return (
    <>
      <div className={'form__wrap'}>
        <input className={`form__input ${className}`} {...props} />
      </div>
    </>
  );
};

export const FormInputWithMaskNotLabel: FC<IFormInput> = ({
  title,
  mask,
  className,
  ...props
}) => {
  return (
    <>
      <div className={'form__wrap'}>
        {mask ? (
          <MaskedInput
            mask={mask}
            className={`form__input ${className}`}
            {...props}
          />
        ) : (
          <input className={`form__input ${className}`} {...props} />
        )}
      </div>
    </>
  );
};
