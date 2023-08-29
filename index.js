const express = require("express");
const path = require("path");
//解析html
var ejs = require("ejs");
var config = require("./config/default");

const app = express();

//獲取靜態路徑
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/data")); //後端上傳的圖片路徑

//設置允許跨域訪問該服務
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header(
    "Access-Control-Allow-Headers",
    "Origin X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Creadentials", true);
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  res.header("X-powered-By", "3.2.1");
  //跨域允许的请求方式
  res.header("Content-Type,'application/json;chartset=utf-8");
  if (req.method == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});
//加入html視圖
//app.set('views',path.join(__dirname, '/viewssss));
app.engine("html", ejs.__express);
app.set("view engine", "html");

//解析前端數據
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//引入路由
require("./routes/index")(app);
//require('./routes/files')(app);

app.listen(config.port, () => {
  console.log(`啟動了服務器${config.port}`);
});
