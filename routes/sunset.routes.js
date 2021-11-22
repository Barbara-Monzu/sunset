const router = require("express").Router()
const User = require("../models/User.model")
const Sun = require("../models/Sun.model")
const Picture = require("../models/Picture.model")
const fileUploader = require("../config/cloudinary.config");

router.get('/', (req, res, next) => {
	Sun.find({category: "sunset"})
		.then(sunsets => {
			res.render('/sun/every-sun', {sunsets})
		})
		.catch(err => {
			console.log(err)
		});
})

router.get("/new", (req, res) => res.render("sun/new-sun"));

router.post("/new", fileUploader.single("sun-image"), (req, res) => {
	console.log(req.file)
	const { name, comment, location, adress, category } = req.body;
	// const { name, comment, location, adress, category } = req.body;
	
  Picture.create({ title: name, imageUrl: req.file.path })
    .then(() => {	
      res.redirect("/sunsets/list"); 
    })
    .catch((error) => console.log(`Error while creating a new picture: ${error}`));
});

router.get("/list", (req, res) => {
	Picture.find()
	.then(sunsets => {
		res.render('sun/every-sun', {sunsets})
	})
	.catch(err => {
		console.log(err)
	});
})

module.exports = router