const EventEmitter = require('events');
const http = require('http');

module.exports = class Application {
    constructor() {
        this.emitter = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = [];
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    _createServer() {
        return http.createServer((req, res) => {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            })
            req.on('end', () => {
                if(body) {
                    req.body = JSON.parse(body);
                }
                this.middlewares.forEach(middleware => middleware(req,res));
                const emitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res);
                if(!emitted) {
                    res.end('No exactly route');
                }
            })

        })
    }

    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`;
    }

    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach(method => {
                this.emitter.on(this._getRouteMask(path, method), (req, res) => {
                    const handler = endpoint[method];
                    handler(req, res);
                })
            })
        })
    }

    listen(PORT, callback) {
        this.server.listen(PORT, callback);
    }
}