import { IMessageModel } from 'app/models';
import { SearchInput } from 'modules/UI';
import { MessageAside } from 'modules/UI/message/MessageAside';
import Image from 'next/image';

export const message: IMessageModel = {
  sender: 'Я',
  companion: 'Витёк',
  full_message: 'Полное сообщение',
  mini_message: 'Сообщение слева',
  date: '12.10.2022',
  time: '10:11',
};
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
                    alt={''}
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
            <MessageAside message={message} />
          </ul>
        </div>
      </div>
    </div>
  );
};
