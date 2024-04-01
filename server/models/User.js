import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
    unique: true,
  },
});

const UserModel = mongoose.model("User", UserSchema);

export{UserModel as User};
