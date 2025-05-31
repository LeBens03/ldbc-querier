import mongoose from 'mongoose';

const commentHasTagSchema = new mongoose.Schema({
  creationDate: {
    type: String,
    required: true,
  },
  CommentId: {
    type: String,
    required: true,
  },
  TagId: {
    type: String,
    required: true,
  },
});

const CommentHasTag = mongoose.model('Comment_hasTag_Tag', commentHasTagSchema, 'comment_hastag_tag');

export default CommentHasTag;