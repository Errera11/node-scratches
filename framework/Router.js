module.exports = class Router {
    constructor() {
        this.endpoints = {}

    }

    request(path, method, handler) {
        if(!this.endpoints[path]) {
            this.endpoints[path] = {};
        }

        const endpoint = this.endpoints[path];

        if(endpoint[method]) {
            throw new Error(`${method} по пути ${path} уже существует`);
        }

        endpoint[method] = handler;
    }

    get(path, handler) {
        this.request(path, 'GET', handler);
    }
    put(path, handler) {
        this.request(path, 'PUT', handler);
    }
    post(path, handler) {
        this.request(path, 'POST', handler);
    }
    delete(path, handler) {
        this.request(path, 'DELETE', handler);
    }
}