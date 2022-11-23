import React, { useEffect, useState, useRef } from 'react';
import { TITLE } from 'app/config';
import { ChatAside } from 'modules/elements/chat/ChatAside';
import { ChatMessenger } from 'modules/elements/chat/ChatMessenger';
import { MessengerBottom } from 'modules/elements/chat/MessengerBottom';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useRouter } from 'next/router';
import { getDialogs, getMessage } from 'api/Chat';
import { useSelector } from 'react-redux';
import * as auth from 'app/redux/reducers/authReducer';
import { IDialogModel } from 'app/models';

export default function Chat() {
  const didUnmount = useRef(false);
  const messageBottomRef = useRef<HTMLElement>(null);
  const [messageHistory, setMessageHistory] = useState<MessageEvent[]>([]);
  const router = useRouter();
  const [initDialogs, setInitDialogs] = useState([]);
  const [initMess, setInitMess] = useState([]);
  const [activeDialog, setActiveDialog] = useState<any | null>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      getDialogs().then(({ data }) => {
        setInitDialogs(data);
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const auth = useSelector(({ header }: { header: auth.IAuthState }) => header);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  useEffect(() => {
    if (!auth.title) {
      router.push('/auth/signin');
    }
  }, [auth, router]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `wss://chat.iavto.team:8080?dialog=${router.query.dialog}&uid=${auth.user?.id}`,
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

    if (initDialogs) {
      setActiveDialog(
        initDialogs.find(
          (p: IDialogModel) =>
            Number(p.dialogId) == Number(router.query.dialog),
        ),
      );
    }
  }, [router.query]);

  useEffect(() => {
    const onPaste = (e: any) => {
      var text = e.clipboardData.getData('text/plain');
      document.execCommand('insertText', false, text);
      setTimeout(() => {
        if (messageBottomRef.current) {
          // messageBottomRef.current. = '';
          messageBottomRef.current.textContent = text;
        }
      }, 0);

      // text area method
      // let textArea = document.createElement('textarea');
      // console.log(navigator.clipboard.readText());
      // textArea.value = 'dfs';
      // // make the textarea out of viewport
      // textArea.style.position = 'fixed';
      // textArea.style.left = '-999999px';
      // textArea.style.top = '-999999px';
      // document.body.appendChild(textArea);
      // textArea.focus();
      // textArea.select();
      // console.log(textArea.value);
      // return new Promise<void>((res, rej) => {
      //   // here the magic happens
      //   document.execCommand('paste') ? res() : rej();
      //   textArea.remove();
      // });
    };

    const onKeyDown = (e: any) => {
      if (e.keyCode === 13) {
        handleClickSendMessage(e);
      }
    };
    messageBottomRef.current?.addEventListener('keydown', onKeyDown);
    messageBottomRef.current?.addEventListener('paste', onPaste, false);
    return () => {
      messageBottomRef.current?.removeEventListener('keydown', onKeyDown);
      messageBottomRef.current?.removeEventListener('paste', onPaste);
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

  //   document.querySelector("div[contenteditable]").addEventListener("paste", function(e) {
  //     e.preventDefault();
  //     var text = e.clipboardData.getData("text/plain");
  //     document.execCommand("insertHTML", false, text);
  // });
  // ВОзможное решение делать через USEEFECT с return удаления слушателя!!!!!!!!!!!!!

  function escape_text(event: any) {}

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
            {activeDialog ? (
              <div
                className={`chat__messenger messenger ${
                  showDialog ? 'd-block' : 'd-none'
                } d-lg-block `}>
                <div className={'messenger__wrapper'}>
                  <ChatMessenger
                    activeDialog={activeDialog}
                    setShowDialog={setShowDialog}
                    status={connectionStatus}
                    messages={messageHistory}
                    init={initMess}
                  />
                  <MessengerBottom
                    onClick={handleClickSendMessage}
                    ref={messageBottomRef}
                  />
                </div>
              </div>
            ) : (
              <div className='messenger chat__want'>
                Выберите, кому хотели бы написать
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
