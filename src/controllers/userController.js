const UserModel = require('../models/userModel');

exports.createUser = async (req, res) => {
    try {
        const user = await UserModel.create(req.body); 
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
