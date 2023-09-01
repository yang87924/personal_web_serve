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

  //新增反饋
  app.post("/insertfeedback", (req, res) => {
    controller.insertFeedback(req, res);
  });

  //新增評論
  app.post("/insertcomment", (req, res) => {
    controller.insertComment(req, res);
  });

  //刪除牆
  app.post("/deletewall", (req, res) => {
    controller.deleteWall(req, res);
  });

  //刪除反饋
  app.post("/deletefeedback", (req, res) => {
    controller.deleteFeedback(req, res);
  });

  //刪除評論
  app.post("/deletecomment", (req, res) => {
    controller.deleteComment(req, res);
  });

  //分業查詢wall並獲取讚數，舉報，撤銷數據
  app.post("/findwallpage", (req, res) => {
    controller.findWallPage(req, res);
  });
  //倒敘分頁查牆的評論
  app.post("/findcommentpage", (req, res) => {
    controller.findCommentPage(req, res);
  });
  //用戶進入進行ip登記
  app.post("/signip", (req, res) => {
    var ip = req.ip;
    res.send({
      code: 200,
      ip: ip,
    });
  });
};
