import {Webhook} from 'svix'
import userModel from '../models/usermodel.js'


// API Controller function to manage clerk user with database
//https://localhost:5000/api/user/webhooks
const userCredits=async(req,res)=>{

    try {
        const {clerkId}=req.body
        const userData=await userModel.findOne({clerkId})
        res.json({success:true,credits:userData.creditBalance})

    } 
        catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}
const clerkWebhooks=async(req,res)=>{
    try{
        //create a svix instance with clerk webhook secret
        const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET) 

        await whook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
        })
        const {data,type}=req.body

        switch(type){
            case "user.created":{
                const userData={
                    clerkId:data.id,
                    email:data.email_addresses[0].email_address,
                    firstname:data.first_name,
                    lastname:data.last_name,
                    photo:data.image_url
                }
                await userModel.create(userData)
                res.json({})
                break;
            }
            case "user.updated":{
                const update={
                    email:data.email_addresses[0].email_address,
                    firstname:data.first_name,
                    lastname:data.last_name,
                    photo:data.image_url
                }
                await userModel.findOneAndUpdate({clerkId:data.id},update)
                res.json({})
                break;
            }
            case "user.deleted":{
                await userModel.findOneAndDelete({clerkId:data.id})
                res.json({})
                break;
            }
        }
    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:"Failed"})
    }
}
export {clerkWebhooks,userCredits}

//For user credit data
