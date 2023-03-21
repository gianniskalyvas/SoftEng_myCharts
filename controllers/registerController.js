const usersDB = {
    //load from database
    users: require(),
    setUsers: function (data) {this.users = data}
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req,res) => {
    const {user, pwd} = req.body;
    if(!user || !pwd) return res.status(400).json({'message':'Username and pwd are required'});
    const duplicate = usersDB.users.find(person => person.username === user);
    if(duplicate) return res.sendStatus(409);
    try{
        //encrypt
        const hashedPwd = await bcrypt.hash(pwd,10);
        //store new user
        const newUser = { "username": user, "password":hashedPwd};
        //store to DATABASE ...
        console.log(usersDB.users);
        res.status(201).json({"success": `New user ${user} created!`})
    } catch (err) {
        res.status(500).json({'message':err.message});
    }
}

module.exports = {handleNewUser};