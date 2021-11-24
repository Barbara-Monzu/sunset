const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
	const userId = req.session.currentUser._id
	res.render("index", {userId});
});

module.exports = router;
