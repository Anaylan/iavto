import { URL_IMG } from 'app/config';
import { IDialogModel } from 'app/models';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

export const MessageAside = ({
  message,
  active,
  onClick,
}: {
  message: IDialogModel;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <>
      <li
        onClick={onClick}
        className={
          `chat-aside__item ` + (active == true ? `chat-aside__item_edit` : ``)
        }>
        {!active ? (
          <Link
            className={`chat-aside__item-wrap`}
            href={`/chat?dialog=${message.dialogId}`}>
            <span className={`chat-aside__photo`}>
              <Image
                src={
                  URL_IMG +
                  '/img/cid/' +
                  message.cid +
                  '/' +
                  message.company_img
                }
                width={100}
                height={100}
                alt=''
              />
            </span>
            <span className={`chat-aside__main`}>
              <span className={`chat-aside__main-top`}>
                <span className={`chat-aside__username`}>
                  {message.company_name}
                </span>
                <time className={`chat-aside__date`} dateTime='2022-10-15'>
                  {/* {message.date} */}
                  Дaта
                </time>
              </span>
              <span className={`chat-aside__message-wrap`}>
                <span className={`chat-aside__sender`}>
                  {/* {message.sender} */}
                  Отправитель
                </span>
                {/* <span
                      className={`$chat-aside__message chat-aside__message_file`}
                    >
                      Фотография
                    </span> */}
                <span className={`chat-aside__message`}>{message.message}</span>
              </span>
            </span>
          </Link>
        ) : (
          <div className={`chat-aside__item-wrap`}>
            <span className={`chat-aside__photo`}>
              <Image
                src={
                  URL_IMG +
                  '/img/cid/' +
                  message.cid +
                  '/' +
                  message.company_img
                }
                width={100}
                height={100}
                alt=''
              />
            </span>
            <span className={`chat-aside__main`}>
              <span className={`chat-aside__main-top`}>
                <span className={`chat-aside__username`}>
                  {message.company_name}
                </span>
                <time className={`chat-aside__date`} dateTime='2022-10-15'>
                  {/* {message.date} */}
                  Дaта
                </time>
              </span>
              <span className={`chat-aside__message-wrap`}>
                <span className={`chat-aside__sender`}>
                  {/* {message.sender} */}
                  Отправитель
                </span>
                {/* <span
                      className={`$chat-aside__message chat-aside__message_file`}
                    >
                      Фотография
                    </span> */}
                <span className={`chat-aside__message`}>{message.message}</span>
              </span>
            </span>
          </div>
        )}
      </li>
    </>
  );
};
