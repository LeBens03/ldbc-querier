import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  creationDate: {
    type: String,
    required: true, 
  },
  id: {
    type: String, 
    unique: true,
    required: true, 
  },
  imageFile: {
    type: String,
    default: '',
  },
  locationIP: {
    type: String,
    required: true, 
  },
  browserUsed: {
    type: String,
    required: true, 
  },
  language: {
    type: String,
  },
  content: {
    type: String,
  },
  length: {
    type: String,
    required: true, 
  },
  CreatorPersonId: {
    type: String,
    required: true, 
  },
  ContainerForumId: {
    type: String,
    required: true, 
  },
  LocationCountryId: {
    type: String,
    required: true, 
  },
});

const Post = mongoose.model('Post', postSchema, 'post');

export default Post;