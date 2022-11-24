import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ArrowLeft, UpdateArrow } from 'assets/icon/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IDialogModel, IMessageModel } from 'app/models';
import { MessageItem } from 'modules/UI';
import { URL_IMG } from 'app/config';

export const ChatMessenger = ({
  messages,
  setShowDialog,
  activeDialog,
  updateMessages,
  active,
}: {
  messages: IMessageModel[];
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  activeDialog: IDialogModel;
  updateMessages: CallableFunction;
  active: boolean;
}) => {
  const [data, setData] = useState<IMessageModel[]>([]);
  const [id, setId] = useState<number>();
  const router = useRouter();
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id != router.query.dialog) {
      setData([]);
      setId(Number(router.query.dialog));
    }
  }, [id, router]);

  useEffect(() => {
    if (messageRef) {
      setTimeout(() => {
        messageRef.current?.scrollTo({
          top: 99999999,
          behavior: 'smooth',
        });
      }, 500);
    }
    //
  }, [data, messageRef]);

  useEffect(() => {
    setData(messages);
  }, [messages]);

  // console.log(data);
  return (
    <>
      <div className={`messenger__header messenger-header`}>
        <div className={`messenger-header__body`}>
          <div className='messenger-header__row'>
            <button
              onClick={() => setShowDialog(false)}
              className={`messenger-header__back d-lg-none `}>
              <span className={`icon`}>
                <ArrowLeft />
              </span>
            </button>
            <Link className={`messenger-header__user`} href='#'>
              <span className={`messenger-header__user-wrap`}>
                <span className={`messenger-header__img`}>
                  {activeDialog ? (
                    <Image
                      width={100}
                      height={100}
                      src={
                        URL_IMG +
                        '/img/cid/' +
                        activeDialog.cid +
                        '/' +
                        activeDialog.company_img
                      }
                      alt=''
                    />
                  ) : null}
                </span>
                <span className={`messenger-header__username-wrap`}>
                  <span className={`messenger-header__username text-truncate`}>
                    {activeDialog && activeDialog.company_name}
                  </span>
                </span>
              </span>
            </Link>
          </div>
          {/* <p>{status}</p> */}
          <button
            onClick={() => {
              updateMessages();
            }}
            className={active ? 'btn-update btn-update-anim' : 'btn-update'}
            id='btn-update-chat'
            type='button'>
            <div className='messenger-header__btn-wrap'>
              <div className={'icon'}>
                <UpdateArrow />
              </div>
            </div>
          </button>
        </div>
      </div>
      <div ref={messageRef} className={`messenger__body messenger-body`}>
        <ul className={`messenger-body__list`}>
          {/* <li className={`messenger-body__date`}>
            <time dateTime='2022-10-15'>15.10.2022</time>
          </li> */}
          {/* {init.map((msg, key) => (
            <MessageItem message={msg} key={key} />
          ))} */}
          {data.map((msg, key) => (
            <MessageItem message={msg} key={key} />
          ))}
        </ul>
      </div>
    </>
  );
};
function componentDidMount() {
  throw new Error('Function not implemented.');
}
