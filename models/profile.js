const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	
	handle: {
		type: String,
		required: true,
		max: 40
	},
	
	website: {
		type: String
	},
	location: {
		type: String
	},
	
	twitter: {
		type: String
	},
	
	facebook: {
		type: String
	},
	
	linkedin: {
		type: String
	}
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);

//planners book vendors and venues
