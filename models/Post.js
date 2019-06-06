const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  userName: { //user name to avoid having to query user table
    type: String
  },
  avatar: { //user avatar to avoid having to query user table
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId, //Ref to user liking post
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId, //Ref to user posting comment
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      userName: { //user name to avoid having to query user table
        type: String
      },
      avatar: { //user avatar to avoid having to query user table
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Post = mongoose.model('post', PostSchema);