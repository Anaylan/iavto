import React, { useEffect, useState, useRef, useMemo } from 'react';
import { TITLE } from 'app/config';
import { ChatAside } from 'modules/elements/chat/ChatAside';
import { ChatMessenger } from 'modules/elements/chat/ChatMessenger';
import { MessengerBottom } from 'modules/elements/chat/MessengerBottom';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getDialogs, getMessage, requestMessage } from 'api/Chat';
import { useSelector } from 'react-redux';
import * as auth from 'app/redux/reducers/authReducer';
import { IDialogModel } from 'app/models';

export default function Chat() {
  const didUnmount = useRef(false);
  const messageBottomRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const [initDialogs, setInitDialogs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeDialog, setActiveDialog] = useState<any | null>(null);
  const [active, setActive] = useState<boolean>(false);

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

  useMemo(() => {
    // setMessageHistory(messageHistory.filter((p) => !p));
    // console.log(messageHistory);
    //
    getDialogs().then(({ data }) => {
      setInitDialogs(data);
    });
    getMessage(Number(router.query.dialog)).then(({ data }) => {
      setMessages(data);
    });
  }, [router.query.dialog]);

  useEffect(() => {
    if (initDialogs) {
      setActiveDialog(
        initDialogs.find(
          (p: IDialogModel) =>
            Number(p.dialogId) === Number(router.query.dialog),
        ),
      );
    }
  }, [initDialogs, router.query.dialog]);

  const onPaste = (e: any) => {
    var text = e.clipboardData.getData('text/plain');
    setTimeout(() => {
      if (messageBottomRef.current) {
        // messageBottomRef.current. = '';
        messageBottomRef.current.textContent = text;
      }
    }, 1);
  };

  useEffect(() => {
    return () => {
      didUnmount.current = true;
    };
  }, []);

  const update = () => {
    setActive(true);
    getMessage(Number(router.query.dialog)).then(({ data }) => {
      setMessages(data);
    });

    setTimeout(() => {
      setActive(false);
    }, 600);
  };

  const onKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      handleClickSendMessage(e);
    }
  };

  const handleClickSendMessage = (e: any) => {
    e.preventDefault();

    if (messageBottomRef.current) {
      if (messageBottomRef.current.textContent) {
        requestMessage(
          router.query.dialog,
          messageBottomRef.current?.textContent,
        ).then(() => {
          getMessage(Number(router.query.dialog)).then(({ data }) => {
            setMessages(data);
          });
        });
        messageBottomRef.current.textContent = '';
      }
    }
  };

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
                    active={active}
                    updateMessages={update}
                    activeDialog={activeDialog}
                    setShowDialog={setShowDialog}
                    messages={messages}
                  />
                  <MessengerBottom
                    onClick={handleClickSendMessage}
                    onKeyDown={onKeyDown}
                    onPaste={onPaste}
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
