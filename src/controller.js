const users = [
    {id: 1, name: 'Bruce'},
    {id: 2, name: 'Lily'}
]

createUser = (req, res) => {
    const x = req.body;
    users.push(x);
    res.send(users);
}

getUser = (req, res) => {
    if(req.params.id) {
        const user = users.find(item => item.id == req.params.id);
        res.send(user);
    }
    res.send(users);
}





module.exports = {
    createUser,
    getUser
}