const controller = require("../controller/dbServe");
module.exports = function (app) {
  app.get("/test", (req, res) => {
    res.type("html"); // 設定回應的Content-Type為HTML
    res.render("test");
  });
  //新增wall數據
  app.post("/insertwall", (req, res) => {
    controller.insertWall(req, res);
  });
 
};
