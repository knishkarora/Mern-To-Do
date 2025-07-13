const UserModel = require('../Models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({ msg: 'User registered successfully', success: true });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error', success: false });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exists', success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);

        if (!isPassEqual) {
            return res.status(400).json({ msg: 'Invalid credentials', success: false });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200).json({
            msg: 'login successfully',
            success: true,
            jwtToken,
            email,
            name: user.name
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error', success: false });
    }
}
module.exports = {
    signup,
    login
}