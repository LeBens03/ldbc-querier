import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  creationDate: {
    type: String,
    required: true, // Marked as required
  },
  id: {
    type: String, 
    unique: true,
    required: true, // Marked as required
  },
  imageFile: {
    type: String,
    default: '',
  },
  locationIP: {
    type: String,
    required: true, // Marked as required
  },
  browserUsed: {
    type: String,
    required: true, // Marked as required
  },
  language: {
    type: String,
  },
  content: {
    type: String,
  },
  length: {
    type: String,
    required: true, // Marked as required
  },
  CreatorPersonId: {
    type: String,
    required: true, // Marked as required
  },
  ContainerForumId: {
    type: String,
    required: true, // Marked as required
  },
  LocationCountryId: {
    type: String,
    required: true, // Marked as required
  },
});

const Post = mongoose.model('Post', postSchema, 'post');

export default Post;