const express = require('express');
const router = express.Router();

const {
  createComment,
  deleteComment,
  getComments
} = require('../handlers/comment');

router.route('/:id/comments').get(getComments);

router.route('/:id').post(createComment);

router.route('/:id/comment/:comment_id').delete(deleteComment);

module.exports = router;