const fs = require('fs').promises

/**************** Sign Up User ****************/

const signUp = (req,res)=>{
    const data = [];
    req.on('data',chunk=>{
        data.push(chunk);
    });

    return req.on('end',async()=>{
        const {email,password,name} = JSON.parse(data);

        const values = await fs.readFile('Users.txt','utf-8');

        let userId = 1;

        let Users = []
        if(values.length>0) {
            Users = JSON.parse(values);
            userId = Users.length+1;
        }

        Users.push({userId,email,password,name});

        const error = await fs.writeFile('Users.txt',JSON.stringify(Users));
        if(!error){
            res.writeHead(200, 'User Added Successfully', {'content-type': 'text/plain'});
            res.end('User Added Successfully');
        }
        else{
            res.writeHead(500,"Some Error occured",{'content-type':'text/plain'});
            res.end('Some error occured!!!!');
        }
    })
}

/**************** Login User ****************/

const loginUser = (req,res)=>{
    const body = [];

    req.on('data',chunk=>{
        body.push(chunk);
    })
    return req.on('end',async()=>{
        const {email,password} = JSON.parse(body);

        const data = await fs.readFile('Users.txt','utf-8');

        if(data==="") {
            res.writeHead(403, 'NO USER EXISTS', {'content-type': 'text/plain'});
            res.end("NO USER EXISTS");
        }

        const Users = JSON.parse(data);

        for(const User of Users){
            if(User.email===email && User.password===password) {
                res.writeHead(200);
                return res.end('Login SuccessFully');
            }
        }
        res.writeHead(403, 'USER NOT FOUND', {'content-type': 'text/plain'});
        res.end("USER NOT FOUND");
    })
}

module.exports = {
    signUp,
    loginUser
};