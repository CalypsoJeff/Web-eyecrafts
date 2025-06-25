import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signup = async (req, res) => {
    const { username, password } = req.body;
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();
    res.status(201).json({ msg: 'User created' });
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username,password,"aaa")
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
};