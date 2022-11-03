import React from "react";
import messengerBottom from '/assets/sass/components/chat/chat/messenger/messenger-bottom.module.scss'
import messenger from '/assets/sass/components/chat/chat/messenger/messenger.module.scss'

import { PaperClip, Send } from 'assets/icon/icons'

export const MessengerBottom = () => {
  return (
    <div className={`${messenger['messenger__bottom']} ${messengerBottom['messenger-bottom']}`}>
        <form
        className={`${messengerBottom['messenger-bottom__form']}`}
        method='POST'
        action=''
        accept-charset='UTF-8'
        id='formMessenger'
        >
        <div className={`${messengerBottom['messenger-bottom__row']}`}>
            <div className={`${messengerBottom['messenger-bottom__attach-file']}`}>
            <input type='file' name='' id='chatAttachFile' />
            <label className='icon' htmlfor='chatAttachFile'>
                <PaperClip color={`${messengerBottom['icon__item']}`} />
            </label>
            </div>
            <div className={`${messengerBottom['messenger-bottom__message-file']}`}>
            <div
                className={`${messengerBottom['messenger-bottom__input']}`}
                contentEditable='true'
                type='text'
                name=''
                placeholder='Напишите сообщение...'
            ></div>
            </div>
            <div className={`${messengerBottom['messenger-bottom__send']}`}>
            <button className={`${messengerBottom['messenger-bottom__btn']}`} type='submit'>
                <span className='icon'>
                <Send color={`${messengerBottom['icon__item']}`} />
                </span>
            </button>
            </div>
        </div>
        </form>
    </div>
  )
};
