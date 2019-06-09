var express = require('express');
var router = express.Router();
var connect=require('../common/db');
connect.table_name='user';
connect.dataCallback=function(result){
    if(result.err){
        console.log(result.err);
    }else{
        console.log(result.result);
    }
};
// connect.insert({user_name:'yyp3',password:'123456'});
// connect.selectAll();
// connect.selectByKey('user_name');
// connect.selectByKeyVlaue({'user_name':'yyp'});
connect.insertList([{'user_name':'yyp1','password':'123456'},{'user_name':'yyp2','password':'123456'},{'user_name':'yyp3','password':'123456'}]);
// connect.delete({'user_name':'yyp6'});
// connect.deleteList([{'user_name':'yyp4'},{'user_name':'yyp5'}]);
// connect.update({where:{user_name:'yyp6'}, data:{id:100, password:'111111'}});

