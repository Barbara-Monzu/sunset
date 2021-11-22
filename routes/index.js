module.exports = app => {

    app.use("/", require("./base.routes"));
    app.use("/", require("./auth.routes")); 
    // app.use("/", require("./user.routes"));
	app.use("/sunsets", require("./sunset.routes"));
	app.use("/sunrise", require("./sunrise.routes"));
 
  }