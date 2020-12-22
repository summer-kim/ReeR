import { Fragment } from 'react';

export const sortAndLimitTag = (tags) => {
  //sort tags by number of likes
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
  }
  if (tags.length > 3) {
    tags = tags.slice(0, 3);
  }
  switch (tags.length) {
    case 0:
      return (
        <Fragment>
          <span className='tag'>#No Tag! Make your own tag</span>
          <span className='tag'>#No Tag! Make your own tag</span>
          <span className='tag'>#No Tag! Make your own tag</span>
        </Fragment>
      );
    case 1:
      return (
        <Fragment>
          <span className='tag'>#{tags[0].tagName}</span>
          <span className='tag'>#No Tag! Make your own tag</span>
          <span className='tag'>#No Tag! Make your own tag</span>
        </Fragment>
      );
    case 2:
      return (
        <Fragment>
          {tags.map((tag) => (
            <span className='tag'>#{tag.tagName}</span>
          ))}
          <span className='tag'>#No Tag! Make your own tag</span>
        </Fragment>
      );
    case 3:
      return tags.map((tag) => <span className='tag'>#{tag.tagName}</span>);
    default:
      break;
  }
};
