import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {

    const { name, email, password } = req.body;
    if (!name) {
        next("name is required")
    }
    if (!email) {
        next("email is required")
    }
    if (!password) {
        next("password is required")
    }
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
        next("Email already in use")
    }
    const user = await userModel.create({ name, email, password })
    //token creation
    const token = user.createJWT()
    res.status(201).send({
        success: true,
        message: 'User created successfully',
        user, token,

    })
}

export const loginController = async (req, res, next) => {
    const { email, password } = req.body

    if (!email && !password) {
        next('Please provide all fields')
    }
    //find user by id
    const user = await userModel.findOne({ email })
    if (!user) {
        next('Invalid user id or password')
    }
    //compare password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        next("Invalid user id or password")
    }
    const token = user.createJWT()
    res.status(200).json({
        success: true,
        message: "Login successful",
        user,
        token,
    })
}