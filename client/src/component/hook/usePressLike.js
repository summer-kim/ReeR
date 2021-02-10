import { useState, useEffect } from 'react';

export const usePressLike = ({
  loading = false,
  authUser,
  _id = true,
  likes,
  unlikes,
}) => {
  //variables for changing button color depends on User already liked content or not
  const [Liked, setLiked] = useState(false);
  const [Unliked, setUnliked] = useState(false);

  //variable for changing button color depends on myBag already had content or not
  const [Bag, setBag] = useState(false);

  //variables of how many people liked/unliked this
  const [LikeNum, setLikeNum] = useState({
    like: likes.length,
    unlike: unlikes.length,
  });

  useEffect(() => {
    if (authUser && !loading) {
      likes.some((like) => like.user === authUser._id) && setLiked(true);

      unlikes.some((unlike) => unlike.user === authUser._id) &&
        setUnliked(true);

      authUser.myBag.some((list) => list.toString() === _id) && setBag(true);
    }
  }, [_id]);

  //when User click like heart button
  const onClickSet = (type) => {
    switch (type) {
      case 'like':
        setLiked(!Liked);
        setLikeNum({
          ...LikeNum,
          [type]: Liked ? LikeNum[type] - 1 : LikeNum[type] + 1,
        });
        break;
      case 'unlike':
        setUnliked(!Unliked);
        setLikeNum({
          ...LikeNum,
          [type]: Unliked ? LikeNum[type] - 1 : LikeNum[type] + 1,
        });
        break;
      case 'bag':
        setBag(!Bag);
        break;
      default:
        break;
    }
  };
  return { Liked, Unliked, Bag, LikeNum, onClickSet };
};
