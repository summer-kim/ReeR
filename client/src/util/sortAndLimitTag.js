import { Fragment } from 'react';

export const sortAndLimitTag = (tags) => {
  //sort tags by number of likes
  let tagsSorted = [];
  if (tags) {
    tagsSorted = tags.sort((a, b) => {
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
      {tagsSorted.map((tag, i) => (
        <span key={tag + i} className='tag'>
          #{tag.tagName}
        </span>
      ))}
      {restNumberedArr.map((a, index) => (
        <span key={index} className='tag'>
          #No Tag! Make your own tag
        </span>
      ))}
    </Fragment>
  );
};
