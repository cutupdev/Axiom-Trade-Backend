import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String },
  wallet: { type: String },
  isLedger: { type: Boolean},
  avatar: { type: String },
  date: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
