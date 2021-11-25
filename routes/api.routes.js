const router = require("express").Router()
const User = require("../models/User.model")

router.get("/get-favorites", (req, res) => {
    User
        .findById(req.session.currentUser._id)
        .then(user => res.json(user.favorites))
        .catch(err => console.log(err))
})

module.exports = router