const User = require('../models/userModel')
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler(async(req,res) => {
     const {name,email,password} = req.body
     const userExist = await User.findOne({email})

     if (userExist){
        res.sendStatus(400);
         throw new Error('user already exist');
     }
     
        const user = await User.create({
            name,email,password
        })
        if (user){
            res.json({
                name:user.name,
                email:user.email,
                _id:user._id,
                token: generateToken(user._id)
                
            })
            const result = user.save()
            console.log(result)
        }
        else{
            throw new Error('error occured')
        }
     

  
});

const logUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body
    const user = await User.findOne({email})

   if (user && (await user.matchPassword(password))){
    res.json({
        name: user.name,
        email: user.email,
        _id : user._id,
        token: generateToken(user._id)
    })
    console.log(email
        ,password)
   }
   else{
    res.sendStatus(400);
    throw new Error('Invalid email or password');
}
})


module.exports = {registerUser,logUser}