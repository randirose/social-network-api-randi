const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
  {
    // assignmentId: {
    //   type: Schema.Types.ObjectId,
    //   default: () => new Types.ObjectId(),
    // },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/],
    },
    students: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
    ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = assignmentSchema;
