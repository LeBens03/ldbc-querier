import mongoose from 'mongoose';

const personLikesPostSchema = new mongoose.Schema({
  creationDate: {
    type: String,
    required: true,
  },
  PersonId: {
    type: String,
    required: true,
  },
  PostId: {
    type: String,
    required: true,
  },
});

const PersonLikesPost = mongoose.model('Person_likes_Post', personLikesPostSchema, 'person_likes_post');

export default PersonLikesPost;