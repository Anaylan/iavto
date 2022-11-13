import { PaperClip, Send } from 'assets/icon/icons';

export const MessengerBottom = () => {
  const Submit = (e: any) => {
    e.preventDefault();
    console.log('САБМИТ!!!!!!!!!!! СМОТРЕТЬ В MESSENGERBOOTOM');
  };
  return (
    <div className={`messenger__bottom messenger-bottom`}>
      <form
        onSubmit={Submit}
        className={`messenger-bottom__form`}
        acceptCharset='UTF-8'
        id='formMessenger'
      >
        <div className={`messenger-bottom__row`}>
          <div className={`messenger-bottom__attach-file`}>
            <input type='file' name='' id='chatAttachFile' />
            <label className={'icon'} htmlFor='chatAttachFile'>
              <PaperClip />
            </label>
          </div>
          <div className={`messenger-bottom__message`}>
            <div
              className={`messenger-bottom__input`}
              contentEditable='true'
              placeholder='Напишите сообщение...'
            />
          </div>
          <div className={`messenger-bottom__send`}>
            <button className={`messenger-bottom__btn`} type='submit'>
              <span className={'icon'}>
                <Send />
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
