const repository = require("../repositories/user-repository");
const md5 = require("md5");
const authService = require("../services/auth-service");


exports.authenticate = async(req, res) => {
    try{
        const { email, password } = req.body;
        const user = await repository.getByEmailAndPassword({
            email: email,
            password: md5(password + global.SALT_KEY)
        });

        if (!user) {
            res.status(404).send({
                message: "User or Password incorrect"
            });
            return;
        }

        const token = authService.generateToken({
            id: user.id,
            email: user.email,
            nome: user.name
        });

        res.status(200).json({
            user: {
                email: user.email,
                nome: user.name
            },
            token: token
        });

    }catch(error){
        res.status(500).send({
            message: "Your request has failed",
            data: error.message
        });
    }
}

exports.create = async(req, res) => {
    try{
        const { name, email, password } = req.body;
        await repository.create({
            name: name, 
            email: email,
            password: md5(password + global.SALT_KEY)
        });

        res.status(201).send({
            message: "New user created"
        });
    }catch(error){
        res.status(500).send({
            message: "Your request has failed",
            data: error.message
        });
    }
}

exports.getAll = async(req, res) => {
    try{
        const users = await repository.getAll();
        res.status(200).send(users);
    }catch(error){
        res.status(500).send({
            message: "Your request has failed",
            data: error.message
        });
    }
}