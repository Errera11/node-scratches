
module.exports = (baseURL) => (req, res) => {
    const url = new URL(req.url, baseURL);
    const params = {};
    url.searchParams.forEach((value, key) => params[key] = value);
    req.pathname = url.pathname;
    req.params = params;
}
