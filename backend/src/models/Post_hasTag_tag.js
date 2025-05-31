import mongoose from 'mongoose';

const postHasTagSchema = new mongoose.Schema({
  creationDate: {
    type: String,
    required: true,
  },
  PostId: {
    type: String,
    required: true,
  },
  TagId: {
    type: String,
    required: true,
  },
});

const PostHasTag = mongoose.model('Post_hasTag_Tag', postHasTagSchema, "post_hastag_tag");

export default PostHasTag;