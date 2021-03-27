var http = require('http');

const fs = require('fs');

var app = http.createServer(function(req,res){
   
    let data = {};
    req.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        data = (JSON.parse(chunk.toString('utf-8'))).data;
        fs.appendFile('users.json',JSON.stringify(data)+"\n", (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });
    }).on('end', () => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
        res.end(JSON.stringify({ message: 'well added' }));
    });
    
});
app.listen(8080);


