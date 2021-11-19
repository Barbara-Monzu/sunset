// const router = require("express").Router();
// const { isLoggedIn, checkRoles } = require("../middlewares")
// const { capitalizeText, checkMongoID, isOwnerOfProfile, isAdmin } = require("../utils");
// const User = require("../models/User.model")
// const Sun = require("../models/Sun.model")


// //router.get("/students", (req, res, next) => res.render('auth/login', { errorMsg: 'Tienes que registrarte para entrar a ver todos los estudiantes' }));

// router.get("/profile", isLoggedIn, (req, res, next) => {
//   // checkRoles("PM", "STUDENT") aquí solo me dejaría entrar si es PM o STUDENT

//   User.findById(id)
//   .then(allStudents => {
//     console.log("estoy entrando a buscar", allStudents)
//     res.render("user/list-students", { allStudents})})
//   .catch(err => console.log(err))

// });

// router.get("/students/:id", isLoggedIn, (req, res, next) => {
//   const { id } = req.params

//   User.findById(id)
//   .then(userDetails => {
//     res.render("user/details", {
//       userDetails,
//       loggedUser: req.session.currentUser,
//       isAdmin: isAdmin(req.session.currentUser),
//       isOwner: isOwnerOfProfile(req.session.currentUser, id)
//     })})

//   .catch(err => console.log(err))

// });

// router.get("/students/delete/:id", checkRoles("PM"), (req, res) => {
//   const { id } = req.params

//   User.findByIdAndDelete(id)
//   .then(() => res.redirect("/students"))
//   .catch(err => console.log(err))

// });


// router.get("/students/edit/:id", isLoggedIn, (req, res) => {
//   const { id } = req.params

//   User.findById(id)
//     .then(student => res.render("user/edit", {
//       student,
//       loggedUser: req.session.currentUser,
//       isAdmin: isAdmin(req.session.currentUser),
//       isOwner: isOwnerOfProfile(req.session.currentUser, id)
//     }))
//     .catch(err => console.log(err))

// }),

// router.post("/students/edit/:id", isLoggedIn, (req, res) => {
//   const { id } = req.params
//   const { username, description, role, role2, role3 } = req.body

//   User.findByIdAndUpdate(id, { username, description, role: role, role2, role3 }, { new: true })
//     .then(student => res.redirect(`/students/${student._id}`))
//     .catch(err => console.log(err))
// })


module.exports = router;
