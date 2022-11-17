import { IMessageModel } from 'app/models';
import { SearchInput } from 'modules/UI';
import { MessageAside } from 'modules/UI/message/MessageAside';
import Image from 'next/image';

export const messages: IMessageModel[] = [
  {
    sender: 'Я',
    companion: 'Витёк',
    full_message: 'Полное сообщение',
    mini_message: 'Сообщение слева',
    date: '12.10.2022',
    time: '10:11',
  },
  {
    sender: 'Поддержка ЯАВТО.РФ',
    companion: 'Поддержка ЯАВТО.РФ',
    full_message: 'Спасибо, что обратились к нам',
    mini_message: 'ЯАВТО.РФ слева',
    date: '15.10.2022',
    time: '12:00',
  },
  {
    sender: 'Я',
    companion: 'Быстрее ветра',
    full_message: 'Полное сообщение',
    mini_message: 'Сообщение слева',
    date: '01.11.2022',
    time: '01:00',
  },
];

export const ChatAside = () => {
  return (
    <div className={`chat-aside`}>
      <div className={`chat-aside__wrapper`}>
        <div className={`chat-aside__header`}>
          <SearchInput placeholder={'Поиск по диалогам...'} />
        </div>
        <div className={`chat-aside__body`}>
          <ul className={`chat-aside__list`}>
            {messages.map((message, index) => (
              <MessageAside key={index} message={message} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
