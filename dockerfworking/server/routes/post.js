const express = require('express');
const router = express.Router();

const {
  createPost,
  getPost,
  getPosts,
  deletePost
} = require('../handlers/post');

router.route('/').post(createPost);
router.route('/').get(getPosts);

router.route('/:id')
  .get(getPost)
  .delete(deletePost);

module.exports = router;