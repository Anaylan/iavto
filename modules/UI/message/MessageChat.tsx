import React from 'react';
import Image from 'next/image';
import { IMessageModel } from 'app/models';
export const MessageChat = ({ message }: { message: IMessageModel }) => {
  return (
    <>
      <li className={`messenger-body__message message message-you`}>
        <div className={`message__wrapper`}>
          <div className={`message__body`}>
            <div className={`message__top message-top`}>
              <div className={`message-top__username`}>Вы</div>
              <time className={`message-top__time`} dateTime='2022-10-15 10:01'>
                message.date
              </time>
            </div>
            <div className={`message__main message-main`}>
              <div className={`message-main__text`}>
                <p>
                  Че ты пишешь постоянно??!! Я 3 минуты не отвечал... пи*дец...
                </p>
              </div>
              <div className={`message-main__photos`}>
                <a className={`message-main__img`} href='img/banners/01.png'>
                  <Image
                    width={100}
                    height={100}
                    src='/media/carpark.png'
                    alt=''
                    data-fancybox='messagePhotos1'
                    data-caption=''
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};
