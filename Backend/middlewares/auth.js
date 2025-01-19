import jwt from 'jsonwebtoken'


const authMiddleware=async(req,res,next)=>{
    const {token}=req.headers;
    
    if(!token){
        return res.json({success:false,message:"Not authorized, Login again!"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decoded){
            return res.json({success:false,message:"Not authorized, Login again!"})
        }
        req.body.userId=decoded.userId;
        
        next()
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

export default authMiddleware