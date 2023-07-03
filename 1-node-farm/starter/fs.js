
//Synchronous code

// const fs = require('fs');

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn)

// const textOut = `This is what we know about Avocada: ${textIn}\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('new file written!')


//Asynchrhonous code

const fs = require('fs')

// fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
//     console.log(data);
// })

fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if(err) return console.log('something wrong🤨');
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, err=>{
                console.log('Your file written!😊');
            } )
        })
    })
})

console.log("reading file...")
