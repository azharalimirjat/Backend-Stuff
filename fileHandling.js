const fs = require('fs');


// Creating and Writing in a new .txt file
// Sync...
// fs.writeFileSync('./test.txt', 'It is a new file');


// Async
fs.writeFile('./test1.txt', 'It is a new file Async', (err) => {});

// Reading the file sync....
const res = fs.readFileSync('./contacts.txt', 'utf-8');

console.log(res)

// Reading the file Async....
fs.readFile('./contacts.txt', 'utf-8', (err, result) => {
    console.log('This is file reading in Async way');
    if(err){
        console.log("Error", err);
    }
    else{
        console.log(result);
    }
})