const User = require("../models/User");

exports.getAll = async() => {
    return User.find({}, "name email password");
}

exports.create = async(data) => {
    const user = new User(data);
    await user.save();
}

exports.getByEmailAndPassword = async(data) => {
    return await User.findOne({
        email: data.email, 
        password: data.password
    });
}