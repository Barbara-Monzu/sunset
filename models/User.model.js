const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: { 
      type: String, 
      unique: true,
    
    },
    password: String,
    profileImg: {
      String,
      // default: "/images/sun-default.svg",
    },
    email: {
      type: String, 
      lowercase: true,
      required: [true, "can't be blank"], 
      match: [/\S+@\S+\.\S+/, 'is invalid'], 
      index: true
    },
    bio: String,
    role:  { 
      type: String, 
      default: "USER",
      enum: ['USER', 'ADMIN'] 
    },
	favorites: [{
		type: Schema.Types.ObjectId, ref: "Sun"}],
    createdTime: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
