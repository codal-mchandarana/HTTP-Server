const fs = require('fs').promises

/**************** Getting all the posts ****************/

const getAllPosts = async(req,res)=>{
    const values = await fs.readFile('Posts.txt','utf-8');

    if(values.length===0) {
        res.writeHead(500, 'NO POST AVAILABLE', {'content-type': 'text/plain'});
        res.end("NO POST AVAILABLE ");
    }
    res.end(values);
}

/**************** Getting the post of a particular User ****************/

const userPost = async(req,res)=>{
    const params = req.url.split('/');
    const userId = params[params.length-1];

    const values = await fs.readFile('Posts.txt','utf-8');

    if(values.length===0){
        res.writeHead(500, 'NO POST AVAILABLE', {'content-type': 'text/plain'});
        res.end("NO POST AVAILABLE ");
    }

    let Posts = JSON.parse(values);
    Posts = Posts.filter((post)=>{return post.userId==userId});

    if(Posts.length===0) {
        res.writeHead(200,'NO POST AVAILABLE',{'content-type':'text/plain'});
        return res.end('NO POST AVAILABLE')
    }

    res.end(JSON.stringify(Posts));
}

/**************** Create new Post ****************/

const addPost = (req,res)=>{
    const data = [];

    req.on('data',chunk=>{data.push(chunk)});

    return req.on('end',async()=>{
        const {title,description,userId} = JSON.parse(data);

        const values = await fs.readFile('Posts.txt','utf-8');

        let Posts = [];
        let productId = 1

        if(values.length>0){
            Posts=JSON.parse(values);
            productId = Posts.length+1;
        }


        Posts.push({productId,title,description,userId});

        const error = await fs.writeFile('Posts.txt',JSON.stringify(Posts));
        if(!error){
            res.writeHead(200,'Post Added Successfully',{'content-type': 'text/plain'});
            res.end('Post Added Successfully');
        }else{
            res.writeHead(500,"Some Error occured",{'content-type':'text/plain'});
            res.send('Some error occured!!!!');
        }
    })
}

module.exports = {addPost,getAllPosts,userPost};