const router = require("express").Router()
const User = require("../models/User.model")
const Sun = require("../models/Sun.model")
const fileUploader = require("../config/cloudinary.config");
const {isOwner} = require("../utils/index");

router.get('/:id/edit-profile', (req, res) => {

	const currentUser = req.session.currentUser ? req.session.currentUser._id : null;

	User.findById(req.params.id)
		.then(user => {
			res.render('user/edit-profile', {user, currentUser})
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
		res.redirect('/suns/list/all')
	})
		.catch(err => { console.log(err) })
})

router.get('/:id/profile', (req, res) => {

	const currentUser = req.session.currentUser ? req.session.currentUser._id : null;

	User.findById(req.params.id)
		.populate('favorites')
		.then(user => {
			const userId = user._id
			const profileId = req.session.currentUser._id
			const owner = isOwner(userId, profileId)
			res.render('user/show-profile', { user, owner: owner, currentUser})
		})
		.catch(err => {
			console.log(err)
		});
})









module.exports = router