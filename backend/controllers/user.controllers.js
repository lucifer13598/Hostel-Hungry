import User from "../models/user.model.js"

export const getCurrentUser=async (req,res) => {
    try {
        const userId=req.userId
        if(!userId){
            return res.status(400).json({message:"userId is not found"})
        }
        const user=await User.findById(userId)
        if(!user){
               return res.status(400).json({message:"user is not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`get current user error ${error}`})
    }
}

// export const updateUserLocation=async (req,res) => {
//     try {
//         const {lat,lon}=req.body
//         const user=await User.findByIdAndUpdate(req.userId,{
//             location:{
//                 type:'Point',
//                 coordinates:[lon,lat]
//             }
//         },{new:true})
//          if(!user){
//                return res.status(400).json({message:"user is not found"})
//         }
        
//         return res.status(200).json({message:'location updated'})
//     } catch (error) {
//            return res.status(500).json({message:`update location user error ${error}`})
//     }
// }
export const updateUserLocation = async (req, res) => {
    try {
        // Accept both lon and lng from the request body
        const { lat, lon, lng } = req.body;
        const longitude = lon || lng; 

        // If data is still missing, return a clear message
        if (!lat || !longitude) {
            return res.status(400).json({ 
                message: "Missing coordinates. Expected 'lat' and 'lon' or 'lng'." 
            });
        }

        const user = await User.findByIdAndUpdate(req.userId, {
            location: {
                type: 'Point',
                coordinates: [longitude, lat] // [Longitude, Latitude] is the GeoJSON standard
            }
        }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        return res.status(200).json({ message: 'Location updated successfully' });
    } catch (error) {
        console.error("Location Update Error:", error);
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
}
