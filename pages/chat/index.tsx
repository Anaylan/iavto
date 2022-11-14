import { TITLE } from 'app/config';
import { ChatAside } from 'modules/elements/chat/ChatAside';
import { ChatMessenger } from 'modules/elements/chat/ChatMessenger';
import { MessengerBottom } from 'modules/elements/chat/MessengerBottom';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import { io } from 'socket.io-client';

const socket = io('wss://localhost:6001', {
  withCredentials: false,
});

export default function Chat() {
  socket.on('connect', () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });
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
                <ChatMessenger />
                <MessengerBottom />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
