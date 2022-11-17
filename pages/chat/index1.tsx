import React, { useCallback, useEffect, useState, useRef } from 'react';
import { TITLE } from 'app/config';
import { ChatAside } from 'modules/elements/chat/ChatAside';
import { ChatMessenger } from 'modules/elements/chat/ChatMessenger';
import { MessengerBottom } from 'modules/elements/chat/MessengerBottom';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useRouter } from 'next/router';

export default function Chat() {
  const didUnmount = useRef(false);
  const messageBottomRef = useRef<HTMLElement>(null);
  const [messageHistory, setMessageHistory] = useState<MessageEvent[]>([]);
  const router = useRouter();

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `ws://193.38.235.89:2346?dialog=${router.query.dialog}`,
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
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  useEffect(() => {
    return () => {
      didUnmount.current = true;
    };
  }, []);
  console.log(messageHistory);
  const handleClickSendMessage = (e: any) => {
    e.preventDefault();
    if (messageBottomRef.current) {
      const object = {
        message: messageBottomRef.current?.textContent,
        dialog: router.query.dialog,
      };

      messageBottomRef.current.textContent = '';
      sendMessage(`${JSON.stringify(object)}`);
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
            <ChatAside />
            <div className={`chat__messenger messenger d-none d-lg-block `}>
              <div className={'messenger__wrapper'}>
                <ChatMessenger companion={'Витек'} messages={messageHistory} />
                <MessengerBottom
                  onClick={handleClickSendMessage}
                  ref={messageBottomRef}
                />
                <div>
                  <p>The WebSocket is currently {connectionStatus}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
