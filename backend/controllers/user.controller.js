const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const zod = require('zod');

const SignUpBody = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8)
});

module.exports.signUp = async (req, res, next) => {
    try {
        const result = SignUpBody.safeParse(req.body);

        if (!result.success) {
            res.status(411).json({ message: "Incorrect inputs" });
        }

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(411).json({ message: "Email already taken" })
        }

        const passwordHash = await User.createHash(password);

        const user = await User.create({ name, email, password: passwordHash });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(200).json({ message: "User created successfully", token });

    } catch (error) {
        next(error);
    }
}

const SignInBody = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8)
});

module.exports.signIn = async (req, res, next) => {
    try {
        const result = SignInBody.safeParse(req.body);

        if (!result.success) {
            res.status(411).json({ message: "Invalid inputs" });
        }

        console.log(result);

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            res.status(404).json({ message: "Either email or password is incorrect" });
        }

        const passCheck = await existingUser.validatePassword(password);
        if (!passCheck) {
            res.status(404).json({ message: "Either email or password is incorrect" });
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

        res.status(200).json({ message: "User logged-in successfully", token });
    } catch (error) {
        next(error);
    }
}

module.exports.signOut = async (req, res, next) => {
    try {
        res.send('signout request')
    } catch (error) {
        next(error);
    }
}

module.exports.getDetails = async (req, res, next) => {
    try {
        res.send('Details request ' + req.userId)
    } catch (error) {
        next(error);
    }
}
    
