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
      data.imgurl,
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
exports.insertComment = async (req, res) => {
  let data = req.body;
  //console.log(data)
  await db
    .insertComment([
      data.wallId,
      data.userId,
      data.imgurl,
      data.moment,
      data.name,
    ])
    .then((result) => {
      res.send({
        code: 200,
        message: result,
      });
    });
};

//刪除牆，主表對應多條子表一起刪除
exports.deleteWall = async (req, res) => {
  let data = req.body;
  // if(data.imgurl){
  //   //如果地址存在，刪除對應圖片
  //   Mkdir.deleteWall('data/'+data.imgurl)
  // }
  await db.deleteWall(data.id).then((result) => {
    res.send({
      code: 200,
      message: result,
    });
  });
};

//刪除反饋
exports.deleteFeedback = async (req, res) => {
  let data = req.body;
  await db.deleteFeedback(data.id).then((result) => {
    res.send({
      code: 200,
      message: result,
    });
  });
};

//刪除評論
exports.deleteComment = async (req, res) => {
  let data = req.body;
  await db.deleteComment(data.id).then((result) => {
    res.send({
      code: 200,
      message: result,
    });
  });
};

//分業查詢wall並獲取讚數，舉報，撤銷數據
exports.findWallPage = async (req, res) => {
  let data = req.body;
  await db.findWallPage(data.page,data.pagesize,data.type,data.label)
  .then(async result=>{
    for(let i=0;i<result.lenght;i++){
      //查詢對應強的讚，舉報，撤銷數據
      result[i].like=await db.feedbackCount(result[i].id,0);
      result[i].report=await db.feedbackCount(result[i].id,1);
      result[i].revoke=await db.feedbackCount(result[i].id,2);
      result[i].islike=await db.likeCount(result[i].id,data.userId);
      result[i].comcount=await db.CommentCount(result[i].id);
    }
    res.send({
      code:200,
      message:result,
    })
  })
};
//倒敘分頁查牆的評論
exports.findCommentPage = async (req, res) => {
  let data = req.body;
  await db.findCommentPage(data.page,data.pagesize,data.id).then((result) => {
    res.send({
      code: 200,
      message: result,
    });
  });
};