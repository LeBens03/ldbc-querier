import mongoose from 'mongoose';

const forumHasMemberSchema = new mongoose.Schema({
  creationDate: {
    type: String,
    required: true,
  },
  ForumId: {
    type: String,
    required: true,
  },
  PersonId: {
    type: String,
    required: true,
  },
});

const ForumHasMember = mongoose.model('Forum_hasMember_Person', forumHasMemberSchema, 'forum_hasmember_person');

export default ForumHasMember;