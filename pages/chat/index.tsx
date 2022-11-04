import { TITLE } from 'app/config'
import chat from 'assets/sass/components/chat/chat.module.scss'
import messenger from 'assets/sass/components/chat/messenger/messenger.module.scss'
import { ChatAside } from 'modules/elements/chat/ChatAside'
import { ChatMessenger } from 'modules/elements/chat/ChatMessenger'
import { MessengerBottom } from 'modules/elements/chat/MessengerBottom'
import Head from 'next/head'
import { Container } from 'react-bootstrap'

export default function Chat() {
  return (
    <>
      <Head>
        <title>Чат | {TITLE}</title>
      </Head>
      <section className={chat['chat']}>
        <Container>
          <div className={chat['chat__body']}>
            <ChatAside />
            <div className={` ${chat['chat__messenger']} ${messenger['messenger']} d-none d-lg-block `}>
              <div className={messenger['messenger__wrapper']}>
                <ChatMessenger />
                <MessengerBottom />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
