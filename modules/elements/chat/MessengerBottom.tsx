import { PaperClip, Send } from 'assets/icon/icons';
import messengerBottom from 'assets/sass/components/chat/messenger/messenger-bottom.module.scss';
import messenger from 'assets/sass/components/chat/messenger/messenger.module.scss';

export const MessengerBottom = () => {
    const Submit = (e: any) => {
        e.preventDefault();
        console.log('САБМИТ!!!!!!!!!!! СМОТРЕТЬ В MESSENGERBOOTOM')
    }
  return (
    <div className={`${messenger['messenger__bottom']} ${messengerBottom['messenger-bottom']}`}>
        <form
            onSubmit={Submit}
            className={`${messengerBottom['messenger-bottom__form']}`}
            acceptCharset='UTF-8'
            id='formMessenger'
            >
            <div className={`${messengerBottom['messenger-bottom__row']}`}>
                <div className={`${messengerBottom['messenger-bottom__attach-file']}`}>
                    <input type='file' name='' id='chatAttachFile' />
                    <label className={messengerBottom['icon']} htmlFor='chatAttachFile'>
                        <PaperClip color={messengerBottom['icon__item']} />
                    </label>
                </div>
                <div className={`${messengerBottom['messenger-bottom__message']}`}>
                    <div
                        className={`${messengerBottom['messenger-bottom__input']}`}
                        contentEditable='true'
                        placeholder='Напишите сообщение...'
                    />
                </div>
                <div className={`${messengerBottom['messenger-bottom__send']}`}>
                    <button className={`${messengerBottom['messenger-bottom__btn']}`} type='submit'>
                        <span className={messengerBottom['icon']}>
                        <Send color={messengerBottom['icon__item']} />
                        </span>
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
};
