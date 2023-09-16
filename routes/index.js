const controller = require("../controller/dbServe");
module.exports = function (app) {
  app.get("/api/test", (req, res) => {
    res.type("html"); // 設定回應的Content-Type為HTML
    res.render("test");


  });
app.get("/api/bbb", (req, res) => {
    res.send("bbb");
  });

  app.get("/api/aaa", (req, res) => {
    res.send("Hello World!");
  });
  //新增wall數據
  app.post("/api/insertwall", (req, res) => {
    controller.insertWall(req, res);
  });

  //新增反饋
  app.post("/api/insertfeedback", (req, res) => {
    controller.insertFeedback(req, res);
  });

  //新增評論
  app.post("/api/insertcomment", (req, res) => {
    controller.insertComment(req, res);
  });

  //刪除牆
  app.post("/api/deletewall", (req, res) => {
    controller.deleteWall(req, res);
  });

  //刪除反饋
  app.post("/api/deletefeedback", (req, res) => {
    controller.deleteFeedback(req, res);
  });

  //刪除評論
  app.post("/api/deletecomment", (req, res) => {
    controller.deleteComment(req, res);
  });

  //分業查詢wall並獲取讚數，舉報，撤銷數據
  app.post("/api/findwallpage", (req, res) => {
    controller.findWallPage(req, res);
  });
  //倒敘分頁查牆的評論
  app.post("/api/findcommentpage", (req, res) => {
    controller.findCommentPage(req, res);
  });
  //用戶進入進行ip登記
  app.post("/api/signip", (req, res) => {
    var ip = req.ip;
    res.send({
      code: 200,
      ip: ip,
    });
  });
};
