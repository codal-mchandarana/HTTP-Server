

const {signUp,loginUser} = require('../Utils/Helper');
const {addPost,getAllPosts,userPost} = require('../Utils/PostsHelper')

const requestHandler = (req,res)=>{
    const {url,method} = req;

    switch (true){
        case (url==='/' && method==='GET'):
            getAllPosts(req,res);
            break;

        case (url==='/signUP' && method==='POST' && req.headers['content-type']==='application/json'):
            signUp(req,res);
            break;

        case (url==='/login' && method==='POST' && req.headers['content-type']==='application/json'):
            loginUser(req,res);
            break;

        case (url==='/addProduct' && method==='POST' && req.headers['content-type']==='application/json'):
            addPost(req,res);
            break;

        case (url.startsWith('/userPost/') && method==='GET'):
            userPost(req,res);
            break;

        default:
            res.end("Not a valid URL");
    }
}

module.exports = requestHandler;