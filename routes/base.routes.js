const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
	let userId;
	req.session.currentUser ? userId = req.session.currentUser._id : userId = null;
	res.render("index", {userId});
});

module.exports = router;
