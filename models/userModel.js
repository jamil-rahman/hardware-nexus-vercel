const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required!"
    },

    email:{
        type: String,
        trim: true,
        unique: "User with this Email already exists!",
        required: 'Email is required'
    },
    password: {
        type: String,
        required: "Password is required!",
        min: 6,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/hardware-nexus/image/upload/v1624901282/samples/people/avatardefault_o5cpgq.png'
    },
    

},{
    timestamps: true
});
// let Dataset = mongoose.models.User || mongoose.model('Users', userSchema)
// export default Dataset;


// model issue solved following this link:
//https://github.com/kriasoft/react-starter-kit/issues/1418

export default (mongoose.models && mongoose.models.User
    ? mongoose.models.User
    : mongoose.model('User', userSchema));