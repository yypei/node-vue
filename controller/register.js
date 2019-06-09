var express = require('express');
var responseData = require('../common/responseData');
var router = express.Router();
/* GET users listing. */
router.post('/', function(req, res, next) {
    let params=req.query;
    if(params['user_name']){
        if(params['user_name']!=='yangyp'){
            res.send(responseData.error('用户不存在'));
            return;
        }
    }else{
        res.send(responseData.error('用户名不能为空'));
        return;
    }

    if(params['psd']){
        if(params['psd']!=='123456'){
            res.send(responseData.error('密码不正确'));
            return;
        }else{
            res.send(responseData.sueecss('登录成功'));
        }
    }else{
        res.send(responseData.error('密码不能为空'));
        return;
    }
    res.send(responseData);
});

module.exports = router;