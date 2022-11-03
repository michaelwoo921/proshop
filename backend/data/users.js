import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);


const users = [
    {name: 'Admin User', email: "michaelwoo921@gmail.com", password: bcrypt.hashSync("password", salt), isAdmin: true},
    {name:'John Doe', email: "john@gmail.com", password: bcrypt.hashSync("password", salt)},
    {name:'Jane Doe', email: "jane@gmail.com", password: bcrypt.hashSync("password", salt)},

]

export default users;