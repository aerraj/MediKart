// this file is for destructuring in javascript
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    location:{
        type: String,
        default: ''
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        default: ''
    },
    authProvider:{
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },
    avatar:{
        type: String,
        default: ''
    },
    date:{
        type:Date,
        default:Date.now
    }

})
// this line creates collection in Atlas based on above schema
// with name user
module.exports = mongoose.model('user',UserSchema);
