import { Star } from 'assets/icon/icons';

export const getStars = (rating: number) => {
  let content = [];
  for (let id = 0; id < rating; id++) {
    const item = id;
    content.push(
      <div className={'icon'} key={id}>
        <Star />
      </div>,
    );
  }
  return content;
};
