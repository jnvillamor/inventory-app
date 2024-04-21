import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists!'],
      require: [true, 'Email is required']
    },
    image: {
      type: String
    },
    firstName: {
      type: String,
      require: [true, 'First name is required']
    },
    lastName: {
      type: String,
      require: [true, 'Last Name is required']
    },
    password: {
      type: String,
      require: [true, 'Password is required']
    }
  },
  { timestamps: true }
);

const User = models.User || model('User', UserSchema);

export default User;
