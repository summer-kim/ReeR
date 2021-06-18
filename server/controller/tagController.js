import Post from '../model/postModel.js';

export async function addTag(req, res) {
  const post = await Post.findById(req.params.id);
  post.tags.unshift({
    tagName: req.body.tagName,
    user: req.user.id,
  });

  await post.save();
  res.json(post.tags);
}
