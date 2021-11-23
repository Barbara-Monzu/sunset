module.exports = {
	isLoggedIn: (req, res, next) => {
		req.session.currentUser ? next() : res.render("auth/not-registered", { errorMsg: "Has de estar logueado para ver este contenido" })
	},

	checkRoles: (...roles) => (req, res, next) => {
		roles.includes(req.session.currentUser.role) ? next() : res.status(401).render("auth/login", { errorMsg: "No tienes los permisos adecuados" })
	}

}