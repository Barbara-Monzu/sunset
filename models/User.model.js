const { Schema, model } = require("mongoose");


const userSchema = new Schema(
	{
		username: {
			type: String,
			//unique: true,
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

		role: {
			type: String,
			default: "USER",
			enum: ['USER', 'ADMIN']
		},

		favorites: [{
			type: Schema.Types.ObjectId, ref: "Sun"
		}],
	},

	{ timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
