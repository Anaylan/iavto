import { IMessageModel } from 'app/models';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

export const MessageAside = ({ message }: { message: IMessageModel }) => {
  return (
    <>
      <li className={`chat-aside__item`}>
        <Link className={`chat-aside__item-wrap`} href={`/chat?dialog=${1}`}>
          <span className={`chat-aside__photo`}>
            <Image src={'/media/user.png'} width={100} height={100} alt='' />
          </span>
          <span className={`chat-aside__main`}>
            <span className={`chat-aside__main-top`}>
              <span className={`chat-aside__username`}>
                {message.companion}
              </span>
              <time className={`chat-aside__date`} dateTime='2022-10-15'>
                {message.date}
              </time>
            </span>
            <span className={`chat-aside__message-wrap`}>
              <span className={`chat-aside__sender`}>{message.sender}</span>
              {/* <span
                      className={`$chat-aside__message chat-aside__message_file`}
                    >
                      Фотография
                    </span> */}
              <span className={`chat-aside__message`}>
                {message.full_message}
              </span>
            </span>
          </span>
        </Link>
      </li>
    </>
  );
};
