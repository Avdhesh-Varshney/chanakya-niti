import bcrypt from 'bcrypt';
import User from '../Models/user.model.js';
import { emailRegex, formatDataToSend, passwordRegex } from '../utils/helpers.js';

export const register = async (req, res) => {
    let { fullname, email, password } = req.body;

    if (fullname.length < 3) return res.status(400).json({ error: "Full name should be at least 3 letters long" });
    if (!emailRegex.test(email)) return res.status(400).json({ error: "Invalid email" });
    if (!passwordRegex.test(password)) return res.status(400).json({
        error: "Password should be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
    });

    try {
        const hashed_password = await bcrypt.hash(password, 10);
        const user = new User({
            fullname,
            email,
            password: hashed_password
        });
        const savedUser = await user.save();
        return res.status(201).json(formatDataToSend(savedUser));
    } catch (err) {
        if (err.code === 11000) return res.status(409).json({ error: "User with this email already exists" });
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    let { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

        return res.status(200).json(formatDataToSend(user));
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}