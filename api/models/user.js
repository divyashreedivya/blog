const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

UserSchema.pre(
    'save',
    async function(next){
        const user = this;
        const hash = await bcrypt.hash(this.password,10);
        this.password = hash;
        next();
    }
);

UserSchema.methods.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password,this.password);
    return compare;
}

module.exports = mongoose.model('User',UserSchema);