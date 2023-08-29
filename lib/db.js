const mysql = require('mysql');
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
    Label INT NOT NULL COMMENT '標籤',
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
