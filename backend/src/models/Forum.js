import mongoose from 'mongoose';

const forumSchema = new mongoose.Schema({
  creationDate: {
    type: String,
    required: true,  // Required field
  },
  id: {
    type: String,
    required: true,  // Required field
    unique: true,
  },
  title: {
    type: String,
    required: true,  // Required field
  },
  ModeratorPersonId: {
    type: String,
    required: true,  // Required field
  },
});

const Forum = mongoose.model('Forum', forumSchema, 'forum');

export default Forum;