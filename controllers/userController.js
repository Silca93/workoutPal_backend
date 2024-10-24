const User = require('./../models/userModel')
const jwt = require("jsonwebtoken")
const {sendWelcomeEmail} = require('../emailService')

//Creating JWT token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'} )
}


//login user
const loginUser = async(req, res) => {

    const {email, password} = req.body

    try {

        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({error: error.message}) 
        
    }
}

//signup user

const signupUser = async (req, res) => {
    const {email, password} = req.body;
    
    console.log('Starting signup process for:', email);

    try {
        // First create the user
        const user = await User.signup(email, password);
        console.log('User created successfully:', email);
        
        const token = createToken(user._id);
        console.log('Token created for user:', email);

        // Send welcome email
        try {
            const userName = email.split('@')[0];
            console.log('Attempting to send welcome email:', {
                email: user.email,
                userName
            });
            
            await sendWelcomeEmail(user.email, userName);
            console.log('Welcome email sent successfully for:', email);
        } catch (emailError) {
            console.error('Welcome email failed:', {
                error: emailError.message,
                email: user.email
            });
            // Don't throw error, continue with signup
        }

        res.status(200).json({email, token});
        console.log('Signup completed successfully for:', email);

    } catch (error) {
        console.error('Signup failed:', {
            error: error.message,
            email
        });
        res.status(400).json({error: error.message});
    }
};


module.exports = {loginUser, signupUser}