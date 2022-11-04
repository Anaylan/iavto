import chatAside from 'assets/sass/components/chat/chat-aside.module.scss'
import { SearchInput } from 'modules/UI'
import Image from 'next/image'
export const ChatAside = () => {
  return (
    <div className={` ${chatAside['chat-aside']}`}>
      <div className={` ${chatAside['chat-aside__wrapper']}`}>
        <div className={` ${chatAside['chat-aside__header']}`}>
          <SearchInput placeholder={'Поиск по диалогам...'}/>
        </div>
        <div className={`${chatAside['chat-aside__body']}`}>
          <ul className={`${chatAside['chat-aside__list']}`}>

            
          <li className={`${chatAside['chat-aside__item_edit']}`}>
              <a className={`${chatAside['chat-aside__item-wrap']}`} href='#'>
                <span className={`${chatAside['chat-aside__photo']}`}>
                <Image src='/media/carpark.png' width={100} height={100} alt='' />
                </span>
                <span className={`${chatAside['chat-aside__main']}`}>
                  <span className={`${chatAside['chat-aside__main-top']}`}>
                    <span className={`${chatAside['chat-aside__username']}`}>Поддержка ЯАВТО.РФ</span>
                    <time className={`${chatAside['chat-aside__date']}`} dateTime='2022-10-15'>
                      15.10.2022
                    </time>
                  </span>
                  <span className={`${chatAside['chat-aside__message-wrap']}`}>
                    <span className={`${chatAside['chat-aside__sender']}`}>Поддержка ЯАВТО.РФ</span>
                    <span className={`${chatAside['chat-aside__message']}`}>
                    Спасибо, что обратились к нам
                    </span>
                  </span>
                </span>
              </a>
            </li>


            <li className={`${chatAside['chat-aside__item']}`}>
              <a className={`${chatAside['chat-aside__item-wrap']}`} href='#'>
                <span className={`${chatAside['chat-aside__photo']}`}>
                  <Image src='/media/user.png' width={100} height={100} alt='' />
                </span>
                <span className={`${chatAside['chat-aside__main']}`}>
                  <span className={`${chatAside['chat-aside__main-top']}`}>
                    <span className={`${chatAside['chat-aside__username']}`}>Сергей Улыбка</span>
                    <time className={`${chatAside['chat-aside__date']}`} dateTime='2022-10-15'>
                      15.10.2022
                    </time>
                  </span>
                  <span className={`${chatAside['chat-aside__message-wrap']}`}>
                    <span className={`${chatAside['chat-aside__sender']}`}>Сергей Улыбка</span>
                    <span className={`${chatAside['chat-aside__message']} ${chatAside['chat-aside__message_file']}`}>
                      Фотография
                    </span>
                  </span>
                </span>
              </a>
            </li>

            <li className={`${chatAside['chat-aside__item']}`}>
              <a className={`${chatAside['chat-aside__item-wrap']}`} href='#'>
                <span className={`${chatAside['chat-aside__photo']}`}>
                  <Image src='/media/user.png' width={100} height={100} alt='' />
                </span>
                <span className={`${chatAside['chat-aside__main']}`}>
                  <span className={`${chatAside['chat-aside__main-top']}`}>
                    <span className={`${chatAside['chat-aside__username']}`}>
                      Сергей Улыбка Улыбаааааака
                    </span>
                    <time className={`${chatAside['chat-aside__date']}`} dateTime='2022-10-15'>
                      15.10.2022
                    </time>
                  </span>
                  <span className={`${chatAside['chat-aside__message-wrap']}`}>
                    <span className={`${chatAside['chat-aside__sender']}`}>Вы</span>
                    <span className={`${chatAside['chat-aside__message']}`}>
                      Как я радуюсь своей работе, братик, ты бы знал
                    </span>
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
