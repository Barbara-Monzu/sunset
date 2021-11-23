const router = require("express").Router()
const User = require("../models/User.model")
const Sun = require("../models/Sun.model")
const Picture = require("../models/Picture.model")
const fileUploader = require("../config/cloudinary.config");
const APIHandler = require("../Clases/APIHandler");

const geoCoder = new APIHandler();


router.get('/list/:id', (req, res) => {
	Sun.findById(req.params.id)
		.then(sun => {
			res.render('sun/details-sun', sun)
		})
		.catch(err => {
			console.log(err)
		});
})

router.get('/', (req, res,) => {
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
	const {name, comment} = req.body;
	let pictures;
	req.file ? pictures = req.file.path : pictures = null;
	const category = "sunset";
	const {street, number, city} = req.body;
	const address = `${street}+${number}+${city}`;

	geoCoder.getLocation(address)
		.then(location => {
			const {lat, lng} = location.data.results[0].geometry.location;
			Sun.create({name, comment, category, location: {coordinates: [lat, lng]}, address: {street, number, city}, pictures})
				.then(sun => {
					console.log(sun)
				})
		})
		.catch(err => { console.log(err) })
	
});

router.get("/list", (req, res) => {
	Sun.find({category: "sunset"})
	.then(sun => {
		res.render('sun/every-sun', {sun})
	})
	.catch(err => {
		console.log(err)
	});
})

module.exports = router