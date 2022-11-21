import { IDialogModel, IMessageModel } from 'app/models';
import { SearchInput } from 'modules/UI';
import { MessageAside } from 'modules/UI/message/MessageAside';
import Image from 'next/image';

export const ChatAside = ({
  dialogs,
  id,
  setShowDialog,
  showDialog,
}: {
  dialogs: IDialogModel[];
  id: string | string[] | undefined;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  showDialog: boolean;
}) => {
  return (
    <div className={`chat-aside ${showDialog ? 'd-none' : ''} d-lg-block`}>
      <div className={`chat-aside__wrapper`}>
        <div className={`chat-aside__header`}>
          <SearchInput placeholder={'Поиск по диалогам...'} />
        </div>
        <div className={`chat-aside__body`}>
          <ul className={`chat-aside__list`}>
            {dialogs.map((message, index) => (
              <MessageAside
                onClick={() => {
                  setShowDialog(true);
                }}
                active={Number(id) == message.dialogId}
                key={index}
                message={message}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
