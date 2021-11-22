const { Schema, model } = require("mongoose");

const pictureSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			requirred: true
		},

		description: {
			type: String,
			trim: true,
			requirred: true
		},

		imageUrl: {
			type: String,
			required: true,
			trim: true
		},

		public_id: {
			type: String,
			required: true,
			trim: true
		}
	}
)



const Picture = model("Picture", pictureSchema);


module.exports = Picture;