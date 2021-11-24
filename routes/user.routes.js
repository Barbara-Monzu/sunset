const router = require("express").Router()
const User = require("../models/User.model")
const Sun = require("../models/Sun.model")
const fileUploader = require("../config/cloudinary.config");

router.get('/:id/edit-profile', (req, res) => {
	User.findById(req.params.id)
		.then(user => {
			res.render('user/edit-profile', user)
		})
		.catch(err => {
			console.log(err)
		});
})

router.post('/:id/edit-profile', fileUploader.single("profile-image"), (req, res) => {
 	const { username, bio } = req.body;
	req.file ? profileImg = req.file.path : profileImg = null;

	User.findByIdAndUpdate(req.params.id, {username, bio, profileImg}, {new: true})
		.then(userEdit => {
		res.render("user/user-index", userEdit)
	})
		.catch(err => { console.log(err) })
})




module.exports = router