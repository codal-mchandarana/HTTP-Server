const http = require('http');
const requestHandler = require('./routes/routes')

const server = http.createServer(requestHandler);

server.listen(3000,()=>{console.log("Server Started Successfully on PORT 3000 !!");})