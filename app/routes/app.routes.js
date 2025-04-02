var appRouter = new Object();
appRouter.initialize = function (app) {

  var user = require("./user.routes");
  app.use("/api/user", user);


};

module.exports = appRouter;
