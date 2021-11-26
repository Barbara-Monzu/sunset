const { Schema, model } = require("mongoose");

const sunSchema = new Schema(

	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 50,
		},

		comment: {
			type: String,
			trim: true,
			maxlength: 500,
		},

		location: {
			type: {
				type: String,
				default: "Point",
			},
			coordinates: {
				type: [Number],
				maxlength: 2,
				index: "2dsphere",
			}
		},

		address: {
			street: {
				type: String,
				trim: true,
			},
			number:{
				type: Number,
				trim: true,
			},
			city: {
				type: String,
				trim: true,
			}
		},

		category: {
			type: String,
			trim: true,
			enum: ['sunset', 'sunrise']
		},

		creator: {
			type: Schema.Types.ObjectId,
			ref: "User"
		},

		pictures: [String],

	}
)

const Sun = model("Sun", sunSchema);


module.exports = Sun;