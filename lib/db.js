const mysql = require("mysql");
var config = require("../config/default");
const db = mysql.createConnection({
  host: config.database.HOST,
  user: config.database.User,
  password: config.database.PASSWORD,
});

const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.User,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
});

let bdbs = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release(); // 释放连接
        });
      }
    });
  });
};

let MyWeb = `create database if not exists MyWeb default charset utf8 collate utf8_general_ci`;

let createDatebase = async (db) => {
  await bdbs(MyWeb, []);
};

let walls = `CREATE TABLE IF NOT EXISTS walls (
    id INT NOT NULL AUTO_INCREMENT,
    type INT NOT NULL COMMENT '類型0信息1圖片',
    message VARCHAR(1000) COMMENT '留言',
    name VARCHAR(100) NOT NULL COMMENT '用户名',
    userId VARCHAR(100) NOT NULL COMMENT '創建者ID',
    moment VARCHAR(100) NOT NULL COMMENT '時間',
    label INT NOT NULL COMMENT '標籤',
    color INT COMMENT '颜色',
    imgurl VARCHAR(100) COMMENT '图片路徑',
    PRIMARY KEY(id));
`;

let feedbacks = `create table if not exists feedbacks(
                                                         id INT NOT NULL AUTO_INCREMENT,
                                                         wallId INT NOT NULL COMMENT '牆留言ID',
                                                         userId VARCHAR(100) NOT NULL COMMENT '反饋者ID',
    type INT NOT NULL COMMENT '反饋類型 喜欢1舉報2撤銷',
    moment VARCHAR(100) NOT NULL COMMENT '時間',
    PRIMARY KEY (id));
`;

let comments = `create table if not exists comments(
                                                       id INT NOT NULL AUTO_INCREMENT,
                                                       wallId INT NOT NULL COMMENT '牆留言ID',
                                                       userId VARCHAR(100) NOT NULL COMMENT '評論者ID',
    imgurl VARCHAR(100) COMMENT '頭像路徑',
    comment VARCHAR(1000) COMMENT '評論内容',
    name VARCHAR(100) NOT NULL COMMENT '用户名',
    moment VARCHAR(100) NOT NULL COMMENT '時間',
    PRIMARY KEY(id));
`;

let createTable = async (sql) => {
  await query(sql, []);
};

async function create() {
  await createDatebase(MyWeb);
  await createTable(walls);
  await createTable(feedbacks);
  await createTable(comments);
}

create();
exports.insertWall = (value) => {
  let _sql =
    "insert into walls set type=?,message=?,name=?,userId=?,moment=?,Label=?,color=?,imgurl=?";
  return query(_sql, value);
};

//新增反饋
exports.insertFeedbacks = (value) => {
  let _sql =
    "insert into feedbacks set wallId=?,userId=?,Type=?,moment=?";
  return query(_sql, value);
};

//新增評論
exports.insertComments = (value) => {
  let _sql =
    "insert into comments set wallId=?,userId=?,imgurl=?,moment=?,comment=?,name=?";
  return query(_sql, value);
};

//刪除留言，主表對應多子表一起刪
exports.deleteWall = (id) => {
  let _sql =
    `"delete a,b,c from walls a left join feedbacks b on a.id=b.wallId left join comments c  on a.id=c.wallId where a.id="${id}"`;
  return query(_sql);
};

//刪除反饋
exports.deleteFeedbacks = (id) => {
  let _sql =
    `"delete from feedbacks where id="${id}"`;
  return query(_sql);
};

//刪除評論
exports.deleteComments = (id) => {
  let _sql =
    `"delete from comments where id="${id}"`;
  return query(_sql);
};

//分頁查詢牆
exports.findWallPage=(page,pagesize,type,label)=>{
  let _sql;
  if(label==-1){//label從0開始，沒選任何標籤就是-1
    _sql=`select * from walls where type="${type}" order by id desc limit ${(page-1)*pagesize},${pagesize}`
  }
  else{
    //當有
    _sql=`select * from walls where type="${type}" and label="${label}" order by id desc limit ${(page-1)*pagesize},${pagesize}`
  }
}

//倒敘分頁查牆的評論
exports.findCommentPage=(page,pagesize,id)=>{
  let _sql;
  _sql=`select * from comments where wallId="${id}" order by id desc limit ${(page-1)*pagesize},${pagesize}`
}

//查詢各反饋總數據
exports.feedbackCount=(wid,type)=>{//type=0查詢點讚的
  let _sql;
  _sql=`select count(*) as count from feedbacks where wallId="${wid}" and type="${type}"`
}
//查詢評論總數
exports.CommentCount=(wid)=>{
  let _sql;
  _sql=`select count(*) as count from comment where wallId="${wid}"`
}

//是否點讚
exports.CommentCount=(wid,uid)=>{
  let _sql;//type=0代表點讚
  _sql=`select count(*) as count from feedbacks where wallId="${wid}" and userId="${uid}" and type=0`
}