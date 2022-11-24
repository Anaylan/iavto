import { IMessageModel } from 'app/models';
import { sanitize } from 'libs/functions';
import React, { Fragment } from 'react';
import { dbFormatChatDate, month } from 'libs/functions';

export const MessageItem = ({ message }: { message: IMessageModel }) => {
  return (
    <Fragment>
      <li
        className={
          'messenger-body__message message ' +
          (message.MeSend ? 'message-you' : 'message-companion')
        }>
        <div className={`message__wrapper`}>
          <div className={`message__body`}>
            <div className={`message__top message-top`}>
              <div className={`message-top__username`}>
                {message.MeSend ? 'Вы' : message.companion}
              </div>
              <time className={`message-top__time`} dateTime={message.date}>
                {dbFormatChatDate(message.date, month)}
              </time>
            </div>
            <div className={`message__main message-main`}>
              <div className={`message-main__text`}>
                <p
                  className='text-break'
                  dangerouslySetInnerHTML={sanitize(message.message)}></p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </Fragment>
  );
};
