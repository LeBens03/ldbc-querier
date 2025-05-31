import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  creationDate: {
    type: String,
    required: true, // Marked as required
  },
  id: {
    type: String,
    required: true, // Marked as required
    unique: true,
  },
  locationIP: {
    type: String,
    required: true, // Marked as required
  },
  browserUsed: {
    type: String,
    required: true, // Marked as required
  },
  content: {
    type: String,
    required: true, // Marked as required
  },
  length: {
    type: String,
    required: true, // Marked as required
  },
  CreatorPersonId: {
    type: String,
    required: true, // Marked as required
  },
  LocationCountryId: {
    type: String,
    required: true, // Marked as required
  },
  ParentPostId: {
    type: String,
    required: true, // Marked as required
  },
  ParentCommentId: {
    type: String,
    default: '', // Retains default value
  },
});

const Comment = mongoose.model('Comment', commentSchema, 'comment');

export default Comment;