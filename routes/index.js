const  controller =require('../controller/dbServe')
module.exports = function (app) {
  app.get("/test", (req, res) => {
    res.type("html"); // 設定回應的Content-Type為HTML
    res.render("test");
  });
};
