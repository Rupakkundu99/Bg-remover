import 'dotenv/config'
import e from 'express'
import cors from 'cors'
import connectDb from './configs/mongodb.js'
import userRouter from './routes/userRoutes.js'

//App config
const PORT=process.env.PORT||5000
const app=e()

//Initialize middlewares
app.use(e.json())
app.use(cors())
await connectDb()

//API routes
app.get('/',(req,res)=>{
    res.send('API is working')
})
app.use('/api/user',userRouter)

app.listen(PORT,()=>{
    console.log("Server is runnig on port ",PORT);
})