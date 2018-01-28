var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var firebase = require("firebase-admin").database();

/* GET home page. */
router.get('/', function(req, res, next) {
  firebase.ref().once('value', (snapshot)=>{
    let data = snapshot.val();
    res.render('index', { title: data.title.value, todoList: data.todo });
  });
});

// 新增 API：塞入資料到 firbase
router.post('/addContent', function(req, res, next) {
  console.log('req', req.body);
  let content = req.body.content;
  let firbaseRef = firebase.ref('todo').push();
    // 塞入資料到 firebase 且再回傳資料
    firbaseRef.set({'content': content}).then(()=>{
      firebase.ref('todo').once('value', (snapshot)=>{
        res.send({
          "result": snapshot.val(),
          "message": "成功",
          "returnCode": 200
        });
      });
    });
  
});

// 刪除 API：更新資料到 firbase
router.delete('/deleteContent', function(req, res, next) {
  let id = req.body.id;
  // 移除資料到 firebase 且再回傳資料
  firebase.ref('todo').child(id).remove().then(()=>{
    firebase.ref('todo').once('value', (snapshot)=>{
      res.send({
        "result": snapshot.val(),
        "message": "成功",
        "returnCode": 200
      });
    });
  });
});

module.exports = router;
