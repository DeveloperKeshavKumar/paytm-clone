const User = require('../models/user.model.js');
const Account = require('../models/account.model.js')
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
            return res.status(411).json({ message: "Incorrect inputs", error: result.error });
        }

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(411).json({ message: "Email already taken" })
        }

        const passwordHash = await User.createHash(password);

        const user = await User.create({ name, email, password: passwordHash });

        await Account.create({
            userId: user._id,
            balance: 1 + Math.random() * 10000
        })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return res.status(200).json({ message: "User created successfully", token });

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
            return res.status(411).json({ message: "Invalid inputs" });
        }

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "Either email or password is incorrect" });
        }

        const passCheck = await existingUser.validatePassword(password);
        if (!passCheck) {
            return res.status(404).json({ message: "Either email or password is incorrect" });
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

        return res.status(200).json({ message: "User logged-in successfully", token });
    } catch (error) {
        next(error);
    }
}

module.exports.signOut = async (req, res, next) => {
    try {
        return res.send('signout request')
    } catch (error) {
        next(error);
    }
}

module.exports.getDetails = async (req, res, next) => {
    try {
        return res.send('Details request ' + req.userId)
    } catch (error) {
        next(error);
    }
}

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

module.exports.updateDetails = async (req, res, next) => {
    try {

        const result = updateBody.safeParse(req.body);

        if (!result.success) {
            return res.status(411).json({ message: "Invalid inputs" });
        }

        const { name, password } = req.body;
        const existingUser = User.findById({ _id: req.userId });

        if (!existingUser) {
            return res.status(403).json({ message: "Not authorized to update details" });
        }

        if (password && password.length < 8) {
            return res.status(411).json({ message: "Password too small" });
        } else if (password) {
            existingUser.updateOne({ _id: req.userId }, { name, password: passwordHash });
            const passwordHash = await User.createHash(password);
        }


        return res.status(200).json({ message: "User updated successfully" });

    } catch (error) {
        next(error);
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {

        const filter = req.query.filter || '';
        const users = await User.find({
            name: { "$regex": `.*${filter}.*`, "$options": "i" }
        })

        return res.status(200).json({
            message: "All users fetched",
            users: users.map(user => ({
                email: user.email,
                name: user.name,
                id: user._id
            }))
        })
    } catch (error) {
        next(error);
    }
}