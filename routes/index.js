const { isLoggedIn } = require('../middlewares/index');

module.exports = app => {

  app.use("/", require("./base.routes"));
  app.use("/", require("./auth.routes"));
  app.use("/users", isLoggedIn, require("./user.routes"));
  app.use("/suns", isLoggedIn, require("./sun.routes"));
  //app.use("/suns", require("./sun.routes"));
  app.use("/api", require("./api.routes"));
}
