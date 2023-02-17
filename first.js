/*
let a = 1;
let b = 2;

console.log(a+b);
*/

/*
const path = require('path');
const fs = require('fs');

console.log(path.resolve())

const writeFile = (path, data) => {
    return new Promise((res, rej) => {
        fs.appendFile(path, data, (err) => {
            if(err) rej('new Error(err.message)');
            res();
        })
    })
}

writeFile(path.resolve(__dirname, 'wow.txt'), 'first\n')
    .then(() => writeFile(path.resolve(__dirname, 'wow.txt'), 'second\n'))
    .then(()=> writeFile(path.resolve(__dirname, 'wow.txt'), 'third\n'))
    .catch(err => console.log(err))*/

/*
const path = require('path');
const fs = require('fs');

const str = 'done';

const writeFile = async(path, data) => {
    return new Promise((res, rej) => {
        fs.writeFile(path, data, (err) => {
            if(err) rej(err.message);
            res();
        })
    })
}

const readFile = async(path) => {
    return new Promise((res, rej) => {
        fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
            if(err) rej(err.message);
            res(data);
        })
    })
}

const removeFile = async(path) => {
    return new Promise((res, rej) => {
        fs.unlink(path, (err) => {
            if(err) rej(err.message);
            res();
        })
    })
}

writeFile(path.resolve(__dirname, 'test.txt'), str)
    .then(() => readFile(path.resolve(__dirname, 'test.txt')))
    .then(data => writeFile(path.resolve(__dirname, 'count.txt'), data.length.toString()))
    .then(() => removeFile(path.resolve(__dirname, 'test.txt')))
*/
// const EventEmitter= require('events');
// const PORT = process.env.PORT || 5050;
// const http = require('http');
// const emitter = new EventEmitter();
//
// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/html'})
//     const emitted = emitter.emit(`${req.url}`, req, res)
//     if(!emitted) res.end(req.method);
//     if(req.url === '/hello') return res(req.method);
// })
//
// emitter.on('/', (req, res) => {
//     console.log(req);
//     console.log(res);
//     res(req.method);
// })
//
// server.listen(PORT, () => console.log(1));

const PORT = process.env.PORT || 5050;

const routes = require('./src/routes');
const Application = require('./framework/Application');
const app = new Application();
app.listen(PORT, () => console.log(`Started with PORT ${PORT}`));

const jsonParser = require('./framework/jsonParser');
const urlParse = require('./framework/urlParse');

const baseURL = 'http://localhost:5050';
app.use(jsonParser);
app.use(urlParse(baseURL));

app.addRouter(routes);
// emitter.on(`[${path}]:[${method}]`, (req, res) => {
//     res.end(`[${req.url}]:[${req.method}]`);
// })


