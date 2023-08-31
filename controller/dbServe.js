const db = require("../lib/db");
//新增walls
exports.insertWall = async (req, res) => {
  let data = req.body;
  //console.log(data)
  await db
    .insertWall([
      data.type,
      data.message,
      data.name,
      data.userId,
      data.moment,
      data.label,
      data.color,
      data.imgurl
    ])
    .then((result) => {
      res.send({
        code: 200,
        message: result,
      });
    });
};
//新增反饋
exports.insertFeedback = async (req, res) => {
  let data = req.body;
  //console.log(data)
  await db
    .insertFeedbacks([data.wallId, data.userId, data.type, data.moment])
    .then((result) => {
      res.send({
        code: 200,
        message: result,
      });
    });
};

//新增評論
exports.insertFeedback = async (req, res) => {
  let data = req.body;
  //console.log(data)
  await db
    .insertComments([data.wallId, data.userId, data.imgurl, data.moment])
    .then((result) => {
      res.send({
        code: 200,
        message: result,
      });
    });
};