const router = require("express").Router()
const User = require("../models/User.model")
const Sun = require("../models/Sun.model")
const fileUploader = require("../config/cloudinary.config");
const APIHandler = require("../Classes/APIHandler");
const { checkFavorites, isOwner } = require("../utils/index");

const geoCoder = new APIHandler();



router.get("/:category/list", (req, res) => {

	const currentUser = req.session.currentUser ? req.session.currentUser._id : null;

	Sun.find({ category: req.params.category })
		.then(suns => {
			res.render('sun/every-sun', { suns, currentUser })
		})
		.catch(err => {
			console.log(err)
		});
})

router.get('/list/all', (req, res) => {

	const currentUser = req.session.currentUser ? req.session.currentUser._id : null;
	Sun.find({ category: "sunset" })
		.then(sunsets => {
			Sun.find({ category: "sunrise" })
				.then(sunrises => {
					res.render('sun/all-suns', { sunsets, sunrises, currentUser})
				})
		})
		.catch(err => {
			console.log(err)
		});
})


router.get('/:category/list/:id', (req, res) => {
	const currentUser = req.session.currentUser ? req.session.currentUser._id : null;
	Sun.findById(req.params.id)
		.populate('creator')
		.then(sun => {
			const owner = isOwner(sun.creator._id, req.session.currentUser._id)
			res.render('sun/details-sun', {sun, owner, currentUser})
		})
		.catch(err => {
			console.log(err)
		});
})

router.post('/:category/list/:id/add-favorite', (req, res) => {

	const user = req.session.currentUser;
	const newFavorite = req.params.id;
	let isFavorite = user.favorites.includes(newFavorite);
	
	if (!(isFavorite)) {
		User.findByIdAndUpdate(user._id, { $push: { favorites: newFavorite } }, { new: true })
			.then(user => {

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
	const currentUser = req.session.currentUser ? req.session.currentUser._id : null;
	res.render("sun/new-sun", { category, currentUser })
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

	const {id, category} = req.params
	const currentUser = req.session.currentUser ? req.session.currentUser._id : null;

	Sun.findById(id)
		.then(sun => {
			const owner = isOwner(sun.creator._id, req.session.currentUser._id)
			if (owner) {
				console.log("is owner")
				res.render('sun/edit-sun', {sun, currentUser})
			}
			else{
				res.redirect(`/suns/${category}/list/${id}`)
			}
			
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
	const files = req.files.map(elm => {
		return elm.path
	})
	const address = `${street}+${number}+${city}`

	console.log("estoy entrando en el post")

	geoCoder.getLocation(address)
		.then(location => {
			const { lat, lng } = location.data.results[0].geometry.location;
			Sun.findByIdAndUpdate(id, { name, comment, category, location: { coordinates: [lat, lng] }, address: { street, number, city }, pictures: files }, { new: true })
				.then(sun => {
					console.log(sun)
					res.redirect(`/suns/${category}/list/${id}`)
				})
		})
		.catch(err => { console.log(err) })

})

router.get('/:category/list/:id/delete', (req, res) => {
	const { id, category } = req.params
	Sun.findById(id)
		.then(sun => {
			const owner = isOwner(sun.creator._id, req.session.currentUser._id)
			if (owner) {
				sun.remove()
					.then(() => {
						res.redirect(`/suns/${category}/list/`)
					})
			}
		})
		.catch(err => { console.log(err) });
})

router.post('/', (req, res) => {

	const { city } = req.body;

	Sun.find( { city } )
		.then(sun => res.render('sun/all-suns', { sun }))
		.catch(err => { console.log(err) });
})


module.exports = router

