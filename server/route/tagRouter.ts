import express from 'express';
import isAuth from '../middleware/auth';
import * as tagContr from '../controller/tagController';

const router = express.Router();

router.put('/create/:postid', isAuth, tagContr.addTag);

router.put('/likes/:tagid', isAuth, tagContr.likeTag);

router.put('/likesBack/:tagid', isAuth, tagContr.likeTagUndo);

router.put('/unlikes/:tagid', isAuth, tagContr.unlikeTag);

router.put('/unlikesBack/:tagid', isAuth, tagContr.unlikeTagUndo);

router.put('/delete/:tagid', isAuth, tagContr.deleteTag);

export default router;
