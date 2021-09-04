
const User = require('../../../models/user')
const jwt = require('jsonwebtoken')


module.exports.createSession = async function(req ,res){
    
    try{
        let user = await User.findOne({email : req.body.email});

        if(!user || user.passport != req.body.passport)
        {
            return res.json(422 , {
                message : "Invalid username or passport"
            });
        }
        
        return res.json(200,{
            message : 'Sign in successful , here is your token , please keep it safe',
            data : {
                token : jwt.sign(user.toJSON() ,'codieal' ,{expiresIn :'10000'})
            }
        })
    }
    catch(err)
    {
        console.log('########',err);
        return res.json(500 , {
            message : "Internal server error",
        });  
    }
 
}