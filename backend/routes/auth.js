const express = require('express');
const router = express.Router();

let users = [];

router.post('/frontend/src/pages/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const newUser = { name, email, password };
    users.push(newUser);

    res.status(201).json({ success: true, message: 'User registered successfully' });
});

module.exports = router;
