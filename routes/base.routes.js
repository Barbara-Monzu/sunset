const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
	const currentUser = req.session.currentUser ? req.session.currentUser._id : null;
	res.render("index", { currentUser });
});

module.exports = router;
