import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'assets/icon/icons';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IDialogModel, IMessageModel } from 'app/models';
import { MessageItem } from 'modules/UI';
import { URL_IMG } from 'app/config';

export const ChatMessenger = ({
  messages,
  status,
  init,
  setShowDialog,
  activeDialog,
}: {
  messages: MessageEvent[];
  status: string;
  init: IMessageModel[];
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  activeDialog: IDialogModel;
}) => {
  const [data, setData] = useState<IMessageModel[]>([]);
  const [id, setId] = useState<number>();
  const router = useRouter();
  const messageRef = useRef<HTMLDivElement>(null);
  console.log(activeDialog);
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
    messages.map((message, key) => {
      setData([...data, JSON.parse(message.data)]);
      // console.log([...data]);
    });

    console.log(messageRef.current);
  }, [messages]);

  // console.log(data);
  return (
    <>
      <div className={`messenger__header messenger-header`}>
        <div className={`messenger-header__row`}>
          <div className='d-flex align-items-center'>
            <button
              onClick={() => setShowDialog(false)}
              className={`messenger-header__back d-lg-none `}>
              <span className={`icon`}>
                <ArrowLeft />
              </span>
            </button>
            <a className={`messenger-header__user`} href='#'>
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
              <span className={`messenger-header__username`}>
                {activeDialog && activeDialog.company_name}
              </span>
            </a>
          </div>
          {/* <p>{status}</p> */}
          <button className='btn-param' type='button'>
            <span></span>
          </button>
        </div>
      </div>
      <div ref={messageRef} className={`messenger__body messenger-body`}>
        <ul className={`messenger-body__list`}>
          <li className={`messenger-body__date`}>
            <time dateTime='2022-10-15'>15.10.2022</time>
          </li>
          {init.map((msg, key) => (
            <MessageItem message={msg} key={key} />
          ))}
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
