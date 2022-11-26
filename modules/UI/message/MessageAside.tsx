import { URL_IMG } from 'app/config';
import { IDialogModel } from 'app/models';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { notInitialized } from 'react-redux/es/utils/useSyncExternalStore';

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
            className={`chat-aside__link`}
            href={`/chat?dialog=${message.dialogId}`}>
            <span className={`chat-aside__wrap`}>
              <span className={`chat-aside__photo`}>
                <Image
                  src={
                    message.company_img
                      ? URL_IMG +
                        '/img/cid/' +
                        message.cid +
                        '/' +
                        message.company_img
                      : '/media/user-bg.png'
                  }
                  width={100}
                  height={100}
                  alt=''
                />
              </span>
              {/* <span className={`chat-aside__main`}> */}
              {/* <span className={`chat-aside__main-top`}> */}
              <span className={`chat-aside__username-wrap`}>
                <span className={`chat-aside__username text-truncate`}>
                  {message.company_name}
                </span>
              </span>
              {message.new_msg == 1 ? <span className='orb'></span> : null}
              {/* <time className={`chat-aside__date`} dateTime='2022-10-15'> */}
              {/* {message.date} */}
              {/* Дaта */}
              {/* </time> */}
              {/* </span> */}
              {/* <span className={`chat-aside__message-wrap`}> */}
              {/* <span className={`chat-aside__sender`}> */}
              {/* {message.sender} */}
              {/* Отправитель */}
              {/* </span> */}
              {/* <span
                        className={`$chat-aside__message chat-aside__message_file`}
                      >
                        Фотография
                      </span> */}
              {/* <span className={`chat-aside__message`}>{message.message}</span> */}
              {/* </span> */}
              {/* </span> */}
            </span>
          </Link>
        ) : (
          <Link
            className={`chat-aside__link`}
            href={`/chat?dialog=${message.dialogId}`}>
            <span className={`chat-aside__wrap`}>
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
              {/* <span className={`chat-aside__main`}> */}
              {/* <span className={`chat-aside__main-top`}> */}
              <span className={`chat-aside__username-wrap`}>
                <span className={`chat-aside__username text-truncate`}>
                  {message.company_name}
                </span>
              </span>
              {message.new_msg == 1 ? <span className='orb'></span> : null}
              {/* <time className={`chat-aside__date`} dateTime='2022-10-15'> */}
              {/* {message.date} */}
              {/* Дaта */}
              {/* </time> */}
              {/* </span> */}
              {/* <span className={`chat-aside__message-wrap`}> */}
              {/* <span className={`chat-aside__sender`}> */}
              {/* {message.sender} */}
              {/* Отправитель */}
              {/* </span> */}
              {/* <span
                          className={`$chat-aside__message chat-aside__message_file`}
                        >
                          Фотография
                        </span> */}
              {/* <span className={`chat-aside__message`}>{message.message}</span> */}
              {/* </span> */}
              {/* </span> */}
            </span>
          </Link>
        )}
      </li>
    </>
  );
};
