const router = require("express").Router()
const User = require("../models/User.model")

router.get("/get-favorites", (req, res) => {
    User
        .findById(req.session.currentUser._id)
        .then(user => res.json(user.favorites))
        .catch(err => console.log(err))
})

router.get("/user-id", (req, res) => {
    const { _id } = req.session.currentUser
    return res.json(_id)
})

module.exports = router