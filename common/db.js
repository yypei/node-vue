var mysql = require('mysql');

var connect={
    table_name:'',
    pool:mysql.createPool({
        connectionLimit:100,
        acquireTimeout:10000,
        host: '127.0.0.1', //主机
        user: 'root',     //数据库用户名
        password: '123456',     //数据库密码
        port: '3306',
        database: 'yyp', //数据库名称
        charset: 'UTF8_GENERAL_CI' //数据库编码
    }),//创建连接池
    initVariable:function(){//初始化变量

    },
    insert:function(dataJson={}){//插入数据
        if(typeof dataJson==='object'){
            this.addSql='INSERT INTO '+this.table_name+'(';
            this.addSqlParams='';
            for(var key in dataJson){
                this.addSql+=key+',';
                this.addSqlParams+=mysql.escape(dataJson[key])+',';
            }
            this.addSql=this.addSql.substring(0,this.addSql.length-1);
            this.addSqlParams=this.addSqlParams.substring(0,this.addSqlParams.length-1);
            this.addSql+=') VALUES ('+this.addSqlParams+')';

            return this.sqlQuery(this.addSql);
        }else{
            return this.promiseBack('数据格式必须为json');
        }
    },
    insertList:function(dataArr=[]){//数据格式[{key:value},{key:value}...]
        if(dataArr instanceof Array){
            this.addSql='INSERT INTO '+this.table_name+'(';
            this.addSqlParams='';
            for(var key in dataArr[0]){
                this.addSql+=key+',';
            }
            for(var i=0;i<dataArr.length;i++){
                this.addSqlParams+='(';
                for(var key in dataArr[i]){
                    this.addSqlParams+=mysql.escape(dataArr[i][key])+',';
                }
                this.addSqlParams=this.addSqlParams.substring(0,this.addSqlParams.length-1)+'),';
            }
            this.addSql=this.addSql.substring(0,this.addSql.length-1);
            this.addSqlParams=this.addSqlParams.substring(0,this.addSqlParams.length-1);
            this.addSql+=') VALUES '+this.addSqlParams;
            return this.sqlQuery(this.addSql);
        }else{
            return this.promiseBack('数据格式必须为Array');
        }

    },
    delete:function(dataJson={}){//删除某条数据
        if(typeof dataJson==='object'){
            this.addSql='delete from '+this.table_name+' where ';
            for(var key in dataJson){
                this.addSql+=key+'='+mysql.escape(dataJson[key]);
            }
            return this.sqlQuery(this.addSql);
        }else{
            return this.promiseBack('数据格式必须为json');
        }
    },
    deleteList:function(dataArr=[]){//删除某些数据
        if(dataArr instanceof Array){
            this.addSql='delete from '+this.table_name+' where';
            for(var i=0;i<dataArr.length;i++){
                for(var key in dataArr[i]){
                    this.addSql+=' '+key+'='+mysql.escape(dataArr[i][key])+' or';
                }
            }
            this.addSql=this.addSql.substring(0,this.addSql.length-2);
            return this.sqlQuery(this.addSql);
        }else{
            return this.promiseBack('数据格式必须为Array');
        }
    },
    update:function(dataJson={}){//更新一条数据  dataJson格式  {where:{key:value},data:{key:value,key:value}} where条件  data要更新的数据
        if(typeof dataJson==='object'){
            this.addSql='update '+this.table_name+' set ';

            for(var key in dataJson.data){
                this.addSql+=key+'='+mysql.escape(dataJson.data[key])+',';
            }

            this.addSql=this.addSql.substring(0,this.addSql.length-1);

            for(var key in dataJson.where){
                this.addSql+=' where '+key+'='+mysql.escape(dataJson.where[key]);
            }

            return this.sqlQuery(this.addSql);
        }else{
            return this.promiseBack('数据格式必须为json');
        }
    },
    updateList:function(dataArr=[]){

    },
    selectAll:function(){//获取表中所有数据
        this.addSql='select * from '+this.table_name;
        return this.sqlQuery(this.addSql);
    },
    selectByKey:function(key){//取某一个字段的数据
        if(typeof key==='string'){
            this.addSql='select '+mysql.escape(key)+' from '+this.table_name;
            return this.sqlQuery(this.addSql);
        }else{
            return this.promiseBack('数据格式必须为string');
        }
    },
    selectByKeyVlaue:function(dataJson={}){//查找表中某个字段是否存在某条数据
        if(typeof dataJson==='object'){
            this.addSql='select * from '+this.table_name+' where ';
            for(var key in dataJson){
                this.addSql+=key+'='+mysql.escape(dataJson[key]);
            }
            return this.sqlQuery(this.addSql);
        }else{
            return this.promiseBack('数据格式必须为json');
        }
    },
    sqlQuery:function(addSql){//连接数据库处理sql命令
        return new Promise(function(res,rej){
            this.pool.getConnection(function(err, connection) {
                // 使用连接
                connection.query( addSql, function(err, result) {
                    // 使用连接执行查询
                    if(err){
                        console.log('[INSERT ERROR] - ',err.message);
                        rej(err);
                        return;
                    }
                    res(result);

                    connection.release();
                    //连接不再使用，返回到连接池
                }.bind(this));
            }.bind(this))
        });
    },
    promiseBack:function(resFn,rejFn){
        return new Promise(function(res,rej){
            res(resFn);
            rej(rejFn);
        });
    }
};

module.exports=connect;