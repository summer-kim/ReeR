import { useState, useEffect } from 'react';

export const usePressLike = ({
  loading = false,
  authUser,
  id = true,
  likes,
  unlikes,
}) => {
  //variables for changing button color depends on User already liked content or not
  const [Liked, setLiked] = useState(false);
  const [Unliked, setUnliked] = useState(false);

  //variable for changing button color depends on mybag already had content or not
  const [Bag, setBag] = useState(false);

  //variables of how many people liked/unliked this
  const [LikeNum, setLikeNum] = useState({
    like: likes.length,
    unlike: unlikes.length,
  });
  useEffect(() => {
    if (authUser && !loading) {
      const existed = someInArray(authUser.mybag, id);
      if (existed) setBag(true);
    }
  }, [authUser && authUser.mybag && authUser.mybag.length, loading]);

  useEffect(() => {
    if (!loading && authUser) {
      const existed = someInArray(likes, authUser.id);
      if (existed) setLiked(true);
    }
  }, [likes.length, loading, authUser]);

  useEffect(() => {
    if (!loading && authUser) {
      const existed = someInArray(unlikes, authUser.id);
      if (existed) setUnliked(true);
    }
  }, [unlikes.length, loading, authUser]);

  function someInArray(array, target) {
    return array.some((element) => element === target);
  }
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
