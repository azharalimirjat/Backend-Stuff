const http = require('http');
// const fs = require('fs');
// const url = require('url');

const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send('Hello from Home Page');
});

// app.get('/about', (req, res) => {
//     return res.send('Hello from About Page');
// });
app.get('/about', (req, res) => {
    return res.send('Hello from About Page'+ "hey " + req.query.name+ "You are " + req.query.age);
});



// function myHandler(req, res){
//     if(req.url === "/favicon.ico") return res.end(); 
//     const log = `${Date.now()}: ${req.method} ${req.url} New Req Recieved\n`;
//     const myURL = url.parse(req.url, true);
//     fs.appendFile('log.txt', log, (err, data) =>{
//         // res.end("Hello from server");
//         switch(myURL.pathname){
//             case "/":
//                 if(req.method == 'GET') res.end('HomePage');
//                 res.end("HomePage");
//                 break;
//             case "/about":
//                 const username = myURL.query.myname;
//                 res.end(`Hi, ${username}`);
//                 break;
//             case '/search':
//                 const search = myURL.query.search_query;
//                 res.end("Here are you results for"+search);
//                 break;
//             case '/signup':
//                 if(req.method == 'GET') res.end('This is a signup page');
//                 else if (req.method  == 'POST'){
//                     // DB_Query
//                     res.end('Success');
//                 }
//                 break;
//             default:
//                 res.end("404 Not Found")
//         }
//     });
// }


const myServer = http.createServer(app);

myServer.listen(8000, () => {
    console.log('Server started!')
});