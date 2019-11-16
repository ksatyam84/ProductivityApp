const db = require('../models');

exports.createPost =  (req, res) => {
  db.Post.create({
    title: req.body.title,
    body: req.body.body,
    author: req.body.user
  }, (err, post) => {
    if(err) {
      return console.log(err);
    }
    return res.status(200).json(post);
  });
};

exports.getPost = (req, res) => {
  db.Post.findById(req.params.id).populate('comments').exec((err, post) => {
    if(err) {
      return console.log(err);
    }
    return res.status(200).json(post);
  });
}

exports.getPosts = (req, res) => {
  db.Post.find({}, (err, posts) => {
    if(err) {
      return console.log(err);
    }
    return res.status(200).json(posts);
  });
};

exports.deletePost = (req, res) => {
  db.Post.findByIdAndRemove(req.params.id, (err) => {
    if(err) {
      return console.log(err);
    }
    return console.log('Post removed');
  });
};