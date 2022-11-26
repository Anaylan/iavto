import { useSearch } from 'app/hooks';
import { IDialogModel } from 'app/models';
import { SearchInput } from 'modules/UI';
import { MessageAside } from 'modules/UI/message/MessageAside';
import { useDeferredValue, useMemo, useState } from 'react';

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
  const [value, setValue] = useState<string>('');
  const defferedValue = useDeferredValue(value);

  const filteredDialogs = useMemo(() => {
    return dialogs.filter((item) =>
      item.company_name?.toLowerCase().includes(defferedValue.toLowerCase()),
    );
  }, [defferedValue, dialogs]);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className={`chat-aside ${showDialog ? 'd-none' : ''} d-lg-block`}>
      <div className={`chat-aside__wrapper`}>
        <div className={`chat-aside__header`}>
          <SearchInput
            placeholder={'Поиск по диалогам...'}
            onChange={onChange}
            value={value}
          />
        </div>
        <div className={`chat-aside__body`}>
          <ul className={`chat-aside__list`}>
            {filteredDialogs.map((message, index) => (
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
