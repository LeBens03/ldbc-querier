import mongoose from 'mongoose';

const forumHasTagSchema = new mongoose.Schema({
  creationDate: {
    type: String,
    required: true,
  },
  ForumId: {
    type: String,
    required: true,
  },
  TagId: {
    type: String,
    required: true,
  },
});

const ForumHasTag = mongoose.model('Forum_hasTag_Tag', forumHasTagSchema, 'forum_hastag_tag');

export default ForumHasTag;