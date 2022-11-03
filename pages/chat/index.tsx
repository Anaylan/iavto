import { TITLE } from 'app/config'
import Head from 'next/head'
import { Container } from 'react-bootstrap'
import chatAside from '/assets/sass/components/chat/chat/chat-aside.module.scss'
import chat from '/assets/sass/components/chat/chat/chat.module.scss'
import { ChatAside} from '/modules/elements/chat/ChatAside'
import { ChatMessenger} from '/modules/elements/chat/ChatMessenger'
import { MessengerBottom} from '/modules/elements/chat/MessengerBottom'

export default function Chat() {
  return (
    <>
      <Head>
        <title>Чат | {TITLE}</title>
      </Head>
      <section className='chat'>
        <Container>
          <div className='chat__body'>
            <ChatAside />
            <div className='chat__messenger messenger d-none d-lg-block'>
              <div className='messenger__wrapper'>
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
