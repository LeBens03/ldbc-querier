import mongoose from 'mongoose';

const tagClassSchema = new mongoose.Schema({
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
  SubclassOfTagClassId: {
    type: String,
    default: '',  // Optional field, could be empty
  },
});

const TagClass = mongoose.model('TagClass', tagClassSchema, 'tagClass');

export default TagClass;