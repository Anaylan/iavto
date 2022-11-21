import React, { useCallback, useEffect, useState, useRef } from 'react';
import { TITLE } from 'app/config';
import { ChatAside } from 'modules/elements/chat/ChatAside';
import { ChatMessenger } from 'modules/elements/chat/ChatMessenger';
import { MessengerBottom } from 'modules/elements/chat/MessengerBottom';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useRouter } from 'next/router';
import { getDialogs, getMessage } from 'api/Chat';
import { IMessageEvent } from 'websocket';
import { useSelector } from 'react-redux';
import * as auth from 'app/redux/reducers/authReducer';

export default function Chat() {
  const didUnmount = useRef(false);
  const messageBottomRef = useRef<HTMLElement>(null);
  const [messageHistory, setMessageHistory] = useState<MessageEvent[]>([]);
  const router = useRouter();
  const [initDialogs, setInitDialogs] = useState();
  const [initMess, setInitMess] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      getDialogs().then(({ data }) => {
        setInitDialogs(data);
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const user_id = useSelector(
    ({ header }: { header: auth.IAuthState }) => header.user?.id,
  );
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `ws://193.38.235.89:2346?dialog=${router.query.dialog}&uid=${user_id}`,
    {
      shouldReconnect: (closeEvent) => {
        return didUnmount.current === true;
      },
      reconnectAttempts: 3,
      reconnectInterval: 10,
    },
    // textContent,
  );

  useEffect(() => {
    // setMessageHistory(messageHistory.filter((p) => !p));
    // console.log(messageHistory);
    //
    getDialogs().then(({ data }) => {
      setInitDialogs(data);
    });
    getMessage(Number(router.query.dialog)).then(({ data }) => {
      setInitMess(data);
    });
  }, [router.query]);

  useEffect(() => {
    const onKeyDown = (e: any) => {
      if (e.keyCode === 13) {
        handleClickSendMessage(e);
      }
    };
    messageBottomRef.current?.addEventListener('keydown', onKeyDown);
    return () => {
      messageBottomRef.current?.removeEventListener('keydown', onKeyDown);
    };
  }, [messageBottomRef]);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
    console.log(lastMessage);
  }, [lastMessage, setMessageHistory]);

  useEffect(() => {
    return () => {
      didUnmount.current = true;
    };
  }, []);

  const handleClickSendMessage = (e: any) => {
    e.preventDefault();
    if (messageBottomRef.current) {
      if (messageBottomRef.current.textContent) {
        const object = {
          message: messageBottomRef.current?.textContent,
          dialog: router.query.dialog,
        };
        sendMessage(`${JSON.stringify(object)}`);
        messageBottomRef.current.textContent = '';
      }
    }
  };

  /*  1. При отправке нужно показывать сообщение со стороны отправителя, 2.Отслеживать получение ответа со стороны аппонента */
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  return (
    <>
      <Head>
        <title>Чат | {TITLE}</title>
      </Head>
      <section className={'chat'}>
        <Container>
          <div className={'chat__body'}>
            {initDialogs && (
              <ChatAside
                setShowDialog={setShowDialog}
                showDialog={showDialog}
                id={router.query.dialog}
                dialogs={initDialogs}
              />
            )}
            <div
              className={`chat__messenger messenger ${
                showDialog ? 'd-block' : 'd-none'
              } d-lg-block `}>
              <div className={'messenger__wrapper'}>
                <ChatMessenger
                  setShowDialog={setShowDialog}
                  status={connectionStatus}
                  messages={messageHistory}
                  init={initMess}
                />
                <MessengerBottom
                  onClick={handleClickSendMessage}
                  ref={messageBottomRef}
                />
                <div></div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
