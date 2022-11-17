import { requestAddToFavor } from 'api/User';
import { Heart } from 'assets/icon/icons';

export const ActionFollow = ({ id }: { id: number }) => {
  const toFavor = (id: number) => {
    requestAddToFavor(id);
  };

  return (
    <>
      <div
        onClick={() => {
          toFavor(id);
        }}
        className={'carpark-intro__action'}>
        <button className={'carpark-intro__action-btn'} type='button'>
          <div className={'icon'}>
            <Heart />
          </div>
        </button>
      </div>
    </>
  );
};
