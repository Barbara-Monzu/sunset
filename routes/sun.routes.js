const router = require("express").Router()
const User = require("../models/User.model")
const Sun = require("../models/Sun.model")
const fileUploader = require("../config/cloudinary.config");
const APIHandler = require("../Classes/APIHandler");
const { checkFavorites } = require("../utils/index");

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

router.get('/list/all', (req, res) => {
	Sun.find({ category: "sunset" })
		.then(sunsets => {
			Sun.find({ category: "sunrise" })
				.then(sunrises => {
					res.render('sun/all-suns', { sunsets, sunrises })
				})
		})
		.catch(err => {
			console.log(err)
		});
})


router.get('/:category/list/:id', (req, res) => {
	Sun.findById(req.params.id)
		.populate('creator')
		.then(sun => {
			res.render('sun/details-sun', sun)
		})
		.catch(err => {
			console.log(err)
		});
})

router.post('/:category/list/:id/add-favorite', (req, res) => {
	const user = req.session.currentUser;
	const newFavorite = req.params.id;
	console.log("newFav:", typeof (newFavorite));
	console.log("user favorites:", user.favorites);
	let isFavorite = user.favorites.includes(newFavorite);
	console.log("newfavorite", newFavorite);
	console.log("isFavorite:", isFavorite);
	if (!(isFavorite)) {
		User.findByIdAndUpdate(user._id, { $push: { favorites: newFavorite } }, { new: true })
			.then(user => {
				req.session.currentUser = user;
				res.redirect(`/suns/${req.params.category}/list/${newFavorite}`)
			})
			.catch(err => {
				console.log(err)
			})
	}
	else {
		console.log("Already in favorites")
	}


})

router.post('/:category/list/:id/delete-favorite', (req, res) => {
	const user = req.session.currentUser;
	const newFavorite = req.params.id;
	User.findByIdAndUpdate(user._id, { $pull: { favorites: newFavorite } }, { new: true })
		.then(user => {
			console.log(user)
		})
		.catch(err => {
			console.log(err)
		})
})


router.get("/:category/new", (req, res) => {
	const category = req.params.category;
	res.render("sun/new-sun", { category })
});

router.post("/:category/new", fileUploader.array("sun-image", 3), (req, res) => {
	const { name, comment, street, number, city, latitude, longitude, checkNavigator } = req.body;
	const creator = req.session.currentUser._id
	let pictures;
	const files = req.files.map(elm => {
		return elm.path
	})


	req.file ? pictures = req.file.path : pictures = null;
	const category = req.params.category;
	const address = `${street}+${number}+${city}`;


	if (checkNavigator === "true") {
		console.log("en sin adddres")
		Sun.create({ name, comment, category, creator, location: { coordinates: [latitude, longitude] }, pictures: files })
			.then(sun => {
				console.log(sun)
				res.redirect(`/suns/${category}/list`)
			})
			.catch(err => { console.log(err) })

	}
	else {
		console.log("en geocoder")
		geoCoder.getLocation(address)
			.then(location => {
				const { lat, lng } = location.data.results[0].geometry.location;
				Sun.create({ name, comment, category, creator, location: { coordinates: [lat, lng] }, address: { street, number, city }, pictures: files })
					.then(sun => {
						console.log(sun)
						res.redirect(`/suns/${category}/list`)
					})
			})
			.catch(err => { console.log(err) })

	}
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

// router.get('/:category/list/:id/delete-favorite', (req, res) => {
// 	Sun.findByIdAndDelete(req.params.id)
// 		.then(() => res.redirect(`/suns/${req.params.category}/list`))
// 		.catch(err => { console.log(err) });
// })



module.exports = router

