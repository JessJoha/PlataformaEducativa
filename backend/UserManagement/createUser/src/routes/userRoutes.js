const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');

router.post('/register', userController.registerUser);

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const validPassword = await user.checkPassword(password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', user: user });
    } catch (err) {
        res.status(500).json({ error: 'Error during login' });
    }
});



module.exports = router;
