import jwt from 'jsonwebtoken'

//Middleware function to decode jwt tokens

const authuser=async(req,res,next)=>{

    try {

        const {token}=req.headers
        if(!token){
            return res.json({success:false,message:"Not authorized login again"})
        }
        
        const tokenDecode=jwt.decode(token)
        req.body.clerkId=tokenDecode.clerkId
        next()

    } catch (error) {
         console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

export default authuser;