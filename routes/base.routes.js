const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
	let user;
	req.session.currentUser ? user = req.session.currentUser : user = null;
	res.render("index", {user});
});

module.exports = router;
