const router = require("express").Router()
const User = require("../models/User.model")
const Sun = require("../models/Sun.model")

router.get('/', (req, res, next) => {
	Sun.find({category: "sunset"})
		.then(sunsets => {
			res.render('/sun/every-sun', {sunsets})
		})
		.catch(err => {
			console.log(err)
		});
})


module.exports = router