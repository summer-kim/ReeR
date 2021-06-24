import { Fragment } from 'react';

export const sortAndLimitTag = (tags) => {
  //sort tags by number of likes
  const tagsSorted = [];
  if (tags) {
    tags.sort((a, b) => {
      if (a.likes.length < b.likes.length) {
        return 1;
      }
      if (a.likes.length > b.likes.length) {
        return -1;
      }
      if (a.likes.length === b.likes.length) {
        return 0;
      }
      return 0;
    });
    if (tags.length > 3) tagsSorted = tags.slice(0, 3);
  }
  const restNumberedArr = Array(3 - tagsSorted.length).fill(0);
  return (
    <Fragment>
      {tagsSorted.map((tag) => (
        <span className='tag'>#{tag.tagName}</span>
      ))}
      {restNumberedArr.map((i) => (
        <span className='tag'>#No Tag! Make your own tag</span>
      ))}
    </Fragment>
  );
};
