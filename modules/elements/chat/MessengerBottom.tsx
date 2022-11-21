import { PaperClip, Send } from 'assets/icon/icons';
import { sanitize } from 'libs/functions';
import { ButtonHTMLAttributes, useEffect } from 'react';
import { forwardRef } from 'react';

interface IChildProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}

export const MessengerBottom = forwardRef<any, IChildProps>((props, ref) => {
  return (
    <div className={`messenger__bottom messenger-bottom`}>
      <form
        className={`messenger-bottom__form`}
        acceptCharset='UTF-8'
        id='formMessenger'>
        <div className={`messenger-bottom__row`}>
          <div className={`messenger-bottom__attach-file`}>
            <input type='file' name='' id='chatAttachFile' />
            <label className={'icon'} htmlFor='chatAttachFile'>
              <PaperClip />
            </label>
          </div>
          <div className={`messenger-bottom__message`}>
            <div
              id='message'
              ref={ref}
              className={`messenger-bottom__input text-break`}
              contentEditable='true'
              placeholder='Напишите сообщение...'
            />
          </div>
          <div className={`messenger-bottom__send`}>
            <button
              className={`messenger-bottom__btn`}
              type='submit'
              {...props}>
              <span className={'icon'}>
                <Send />
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
});

MessengerBottom.displayName = 'MessengerBottom';
