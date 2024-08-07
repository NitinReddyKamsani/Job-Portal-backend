import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'

//schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, //the email should be unique
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    locations: {
        type: String,
        default: 'Hyderabad'
    }
}, { timestamps: true })
//middlewares
userSchema.pre('save', async function () {
    if (!this.isModified) return true;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
//compare passwords
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
}
//json web token
userSchema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: 10 })
}
export default mongoose.model('User', userSchema)