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
			required: true,
			maxlength: 500,
		},

		location: {
			type: {
				type: String,
			},
			coordinates: {
				lat: {
					type: Number,
					required: true
				},
				lng: {
					type: Number,
					required: true
				}
			}
		},

		address: {
			street: {
				type: String,
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

		picture: [{ type: Schema.Types.ObjectId, ref: "Picture" }],

		sunTime: {
			start: {
				type: Date,
				required: true,
			},
			end: {
				type: Date,
				required: true,
			}
		}

	}
)

const Sun = model("Sun", sunSchema);


module.exports = Sun;