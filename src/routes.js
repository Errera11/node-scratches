const Router = require('../framework/Router');
const {getUser, createUser} = require("./controller");

const router = new Router();

router.get('/users', getUser)

router.post('/users', createUser);

module.exports = router;