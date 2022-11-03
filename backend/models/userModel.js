import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, ddfault: false}
}, {
    timestamps: true
});

userSchema.methods.matchPassword = async function(enteredPassword){
    console.log('match password');
}

userSchema.pre('save', async function(next){
    console.log('before saving')
});


const User = mongoose.model('User', userSchema);

export default User;