var responseData={
    sueecss:function (msg='', status=0, data={}){
        return {
            status:status,
            message:msg,
            data:data
        }
    },
    error:function (msg='', status=1, data={}){
        return {
            status:status,
            message:msg,
            data:data
        }
    }
};


module.exports=responseData;