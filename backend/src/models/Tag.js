import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  TypeTagClassId: {
    type: String,
    required: true,
  },
});

const Tag = mongoose.model('Tag', tagSchema, 'tag');

export default Tag;