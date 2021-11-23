const router = require("express").Router()
const User = require("../models/User.model")
const Sun = require("../models/Sun.model")
const fileUploader = require("../config/cloudinary.config");
const APIHandler = require("../Clases/APIHandler");

const geoCoder = new APIHandler();


router.get("/:category/list", (req, res) => {
	Sun.find({ category: req.params.category })
		.then(suns => {
			res.render('sun/every-sun', { suns })
		})
		.catch(err => {
			console.log(err)
		});
})

router.get('/:category/list/:id', (req, res) => {
	Sun.findById(req.params.id)
		.then(sun => {
			res.render('sun/details-sun', sun)
		})
		.catch(err => {
			console.log(err)
		});
})


router.get("/:category/new", (req, res) => {
	const category = req.params.category;
	res.render("sun/new-sun", {category})
});

router.post("/:category/new", fileUploader.array("sun-image", 3), (req, res) => {
	const { name, comment, street, number, city } = req.body;
	let pictures;
	const files = req.files.map(elm => {
		 return elm.path
	})
	
	console.log("ESTOY VIENDO LAS FOTOS:", req.files.forEach)
	req.file ? pictures = req.file.path : pictures = null;
	const category = req.params.category;
	const address = `${street}+${number}+${city}`;

	geoCoder.getLocation(address)
		.then(location => {
			const { lat, lng } = location.data.results[0].geometry.location;
			Sun.create({ name, comment, category, location: { coordinates: [lat, lng] }, address: { street, number, city }, pictures: files })
				.then(sun => {
					console.log(sun)
					res.redirect(`/suns/${category}/list`)
				})
		})
		.catch(err => { console.log(err) })

});



router.get('/:category/list/:id/edit', (req, res) => {
	Sun.findById(req.params.id)
		.then(sun => {
			res.render('sun/edit-sun', sun)
		})
		.catch(err => {
			console.log(err)
		});
})

router.post('/:category/list/:id/edit', fileUploader.array("sun-image", 3), (req, res) => {
	const { id } = req.params;
	const { name, comment, street, number, city, category } = req.body;
	let pictures;
	req.files ? pictures = req.files.path : pictures = null;
	const address = `${street}+${number}+${city}`

	console.log("estoy entrando en el post")

	geoCoder.getLocation(address)
		.then(location => {
			const { lat, lng } = location.data.results[0].geometry.location;
			Sun.findByIdAndUpdate(id, { name, comment, category, location: { coordinates: [lat, lng] }, address: { street, number, city }, pictures }, { new: true })
				.then(sun => {
					console.log(sun)
					res.redirect(`/suns/${category}/list/${id}`)
				})
		})
		.catch(err => { console.log(err) })

})

router.get('/:category/list/:id/delete', (req, res) => {
	Sun.findByIdAndDelete(req.params.id)
		.then(() => res.redirect(`/suns/${req.params.category}/list`))
		.catch(err => { console.log(err) });
})

module.exports = router