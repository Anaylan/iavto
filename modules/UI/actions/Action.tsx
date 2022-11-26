import { requestAddToFavor, requestDelFromFavor } from 'api/User';
import { HeartFill } from 'assets/icon/icons';
import { useState } from 'react';

export const ActionFollow = ({
  id,
  favorite,
}: {
  id: number;
  favorite: boolean;
}) => {
  console.log(id);
  console.log(favorite);
  const [active, setActive] = useState<boolean>(favorite || false);
  const toFavor = (id: number) => {
    console.log(id);
    if (active) {
      requestDelFromFavor(id).then(({ data }) => {
        if (data) {
          setActive(false);
        }
      });
    } else {
      requestAddToFavor(id).then(({ data }) => {
        if (data) {
          setActive(true);
        }
      });
    }
  };

  return (
    <>
      <div
        onClick={() => {
          toFavor(id);
        }}
        className={'carpark-intro__action'}>
        <button
          className={
            active
              ? 'carpark-fav carpark-intro__action-btn'
              : 'carpark-intro__action-btn'
          }
          type='button'>
          <div className={'icon icon-heart'}>
            <HeartFill />
          </div>
        </button>
      </div>
    </>
  );
};
