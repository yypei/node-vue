var routerConfig={
    indexRouter:{
        router:require('../controller/index'),
        path:'/'
    },
    usersRouter:{
        router:require('../controller/users'),
        path:'/users'
    },
    registerRouter:{
        router:require('../controller/register'),
        path:'/register'
    },
    chatRouter:{
        router:require('../controller/chat'),
        path:'/chat'
    }
};


module.exports=routerConfig;