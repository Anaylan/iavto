import { SearchInput } from 'modules/UI'
import Image from 'next/image'
export const ChatAside = () => {
  return (
    <div className={`chat-aside`}>
      <div className={`chat-aside__wrapper`}>
        <div className={`chat-aside__header`}>
          <SearchInput placeholder={'Поиск по диалогам...'} />
        </div>
        <div className={`chat-aside__body`}>
          <ul className={`chat-aside__list`}>
            <li className={`chat-aside__item_edit`}>
              <a className={`chat-aside__item-wrap`} href='#'>
                <span className={`chat-aside__photo`}>
                  <Image
                    src='/media/carpark.png'
                    width={100}
                    height={100}
                    alt=''
                  />
                </span>
                <span className={`chat-aside__main`}>
                  <span className={`chat-aside__main-top`}>
                    <span className={`chat-aside__username`}>
                      Поддержка ЯАВТО.РФ
                    </span>
                    <time className={`chat-aside__date`} dateTime='2022-10-15'>
                      15.10.2022
                    </time>
                  </span>
                  <span className={`chat-aside__message-wrap`}>
                    <span className={`chat-aside__sender`}>
                      Поддержка ЯАВТО.РФ
                    </span>
                    <span className={`chat-aside__message`}>
                      Спасибо, что обратились к нам
                    </span>
                  </span>
                </span>
              </a>
            </li>

            <li className={`chat-aside__item`}>
              <a className={`chat-aside__item-wrap`} href='#'>
                <span className={`chat-aside__photo`}>
                  <Image
                    src='/media/user.png'
                    width={100}
                    height={100}
                    alt=''
                  />
                </span>
                <span className={`chat-aside__main`}>
                  <span className={`chat-aside__main-top`}>
                    <span className={`chat-aside__username`}>
                      Сергей Улыбка
                    </span>
                    <time className={`chat-aside__dat`} dateTime='2022-10-15'>
                      15.10.2022
                    </time>
                  </span>
                  <span className={`chat-aside__message-wrap`}>
                    <span className={`chat-aside__sender`}>Сергей Улыбка</span>
                    <span
                      className={`$chat-aside__message chat-aside__message_file`}
                    >
                      Фотография
                    </span>
                  </span>
                </span>
              </a>
            </li>

            <li className={`chat-aside__item`}>
              <a className={`chat-aside__item-wrap`} href='#'>
                <span className={`chat-aside__photo`}>
                  <Image
                    src='/media/user.png'
                    width={100}
                    height={100}
                    alt=''
                  />
                </span>
                <span className={`chat-aside__main`}>
                  <span className={`chat-aside__main-top`}>
                    <span className={`chat-aside__username`}>
                      Сергей Улыбка Улыбаааааака
                    </span>
                    <time className={`chat-aside__date`} dateTime='2022-10-15'>
                      15.10.2022
                    </time>
                  </span>
                  <span className={`chat-aside__message-wrap`}>
                    <span className={`chat-aside__sender`}>Вы</span>
                    <span className={`chat-aside__message`}>
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
