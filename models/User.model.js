const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: { 
      type: String, 
	    trim: true,
    
    },
    password: {
	    type: String,
	    required: true,
	},
    profileImg: {
      type: String,

    },
    email: {
      type: String, 
      lowercase: true,
      required: [true, "can't be blank"], 
      match: [/\S+@\S+\.\S+/, 'is invalid'], 
      index: true,
	    unique: true
    },

    bio: String,
    
    role:  { 
      type: String, 
      default: "USER",
      enum: ['USER', 'ADMIN'] 
    },
	favorites: [{
		type: Schema.Types.ObjectId, ref: "Sun"}],
  },
  
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
