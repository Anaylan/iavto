import { PaperClip, Send } from 'assets/icon/icons';
import { sanitize } from 'libs/functions';
import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { forwardRef } from 'react';

interface IChildProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}

export const MessengerBottom = forwardRef<any, any>((props, ref) => {
  return (
    <div className={`messenger__bottom messenger-bottom`}>
      <form
        className={`messenger-bottom__form`}
        acceptCharset='UTF-8'
        id='formMessenger'>
        <div className={`messenger-bottom__row`}>
          <input type='file' name='' id='chatAttachFile' />
          <label
            className={`messenger-bottom__btn messenger-bottom__attach-file`}
            htmlFor='chatAttachFile'>
            <div className={`messenger-bottom__btn-wrap`}>
              <div className={'icon'}>
                <PaperClip />
              </div>
            </div>
          </label>
          <div className={`messenger-bottom__message`}>
            <div
              id='message'
              inputMode={'text'}
              spellCheck={true}
              ref={ref}
              tabIndex={0}
              onKeyDown={props.onKeyDown}
              onPaste={props.onPaste}
              className={`messenger-bottom__input text-break`}
              contentEditable='true'
              placeholder='Напишите сообщение...'
            />
          </div>
          <button
            className={`messenger-bottom__btn messenger-bottom__send`}
            type='submit'
            onClick={props.onClick}>
            <div className={`messenger-bottom__btn-wrap`}>
              <span className={'icon'}>
                <Send />
              </span>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
});

MessengerBottom.displayName = 'MessengerBottom';
