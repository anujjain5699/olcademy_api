const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter username"]
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'invalid email']
    },
    password: {
        type: String,
        required: [true, "please enter password"],
        minlength: [6, "minimum password length is 6 characters"]
    },
    dob: {
        type: String,
        required: [true, "date of birth required"]
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male',
        lowercase: true
    }
},
    {
        timestamps: true,
    }
);

//fire a function before doc saved to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

//static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await User.findOne({ email});

    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const User = mongoose.model('user', userSchema)

module.exports = User