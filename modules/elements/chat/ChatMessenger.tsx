import React, { Fragment, useEffect, useState } from 'react';
import { ArrowLeft } from 'assets/icon/icons';
import Image from 'next/image';

interface dataMessage {
  MeSend: boolean;
  message: string;
}

export const ChatMessenger = ({
  companion,
  messages,
}: {
  companion: string;
  messages: MessageEvent[];
}) => {
  const [data, setData] = useState<dataMessage[]>([]);

  useEffect(() => {
    messages.map((message, key) => {
      setData([...data, JSON.parse(message.data)]);
      console.log(JSON.parse(message.data));
    });
  }, [messages]);
  return (
    <>
      <div className={`messenger__header messenger-header`}>
        <div className={`messenger-header__row`}>
          <div className='d-flex align-items-center'>
            <button className={`messenger-header__back d-lg-none `}>
              <span className={`icon`}>
                <ArrowLeft />
              </span>
            </button>
            <a className={`messenger-header__user`} href='#'>
              <span className={`messenger-header__img`}>
                <Image width={100} height={100} src='/media/user.png' alt='' />
              </span>
              <span className={`messenger-header__username`}>{companion}</span>
            </a>
          </div>
          <button className='btn-param' type='button'>
            <span></span>
          </button>
        </div>
      </div>
      <div className={`messenger__body messenger-body`}>
        <ul className={`messenger-body__list`}>
          <li className={`messenger-body__date`}>
            <time dateTime='2022-10-15'>15.10.2022</time>
          </li>
          {data.map((msg, key) => (
            <Fragment key={key}>
              <li
                className={
                  'messenger-body__message message ' +
                  (msg.MeSend ? 'message-you' : 'message-companion')
                }>
                <div className={`message__wrapper`}>
                  <div className={`message__body`}>
                    <div className={`message__top message-top`}>
                      <div className={`message-top__username`}>
                        {msg.MeSend ? 'Вы' : companion}
                      </div>
                      <time
                        className={`message-top__time`}
                        dateTime='2022-10-15 10:01'>
                        {}
                      </time>
                    </div>
                    <div className={`message__main message-main`}>
                      <div className={`message-main__text`}>
                        <p className='text-break' key={key}>
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    </>
  );
};
