var http = require('http');

const fs = require('fs');

var app = http.createServer(function(req,res){
   
    let data = {};
    req.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        data = (JSON.parse(chunk.toString('utf-8'))).data;
        fs.readFile('users.json', 'utf8',(errer,lines) => {
            if (errer) {
                throw errer;
            }else{
            //transform the file content to an array
            lines = lines.split("\n");
            
            // this code to detrmine the key for our new object
            //we count how many }, in the line containing the objetcs 
            // if there is 0 the two scebarios
            // first one is {} the file is empty then temp = 0;
            //the seonde one is the file conatining one elemnt then {"0":{..}} so temp = 0  but lines.length = 3
            //the last option is the filecontans more than one object so temp = temp+1
            var temp = (lines[1].match(/},/g) || []).length 
            if(temp == 0  && lines.length == 2){

            }
            else if(temp == 0 && lines.length == 3){
                ++temp;
            }else{
                ++temp;
            }

            // replace the last  } with the new inserted object 
            lines[lines.length-1] = "\""+ temp+"\":"+  JSON.stringify({
                fname:data.fname,
                lname:data.lname
            }); 
            // remove the first {
            lines.shift();
            //write to the file
            fs.writeFile('users.json',"{\n"+lines.toString()+"\n}",(err)=> {
                if(err) throw err;
                console.log("saved");
            });
            };
           
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


