const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//UPDATE USER
router.put("/:id", async(req, res) => {
   if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
               const salt = await bcrypt.genSalt(10);
               req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){ 
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account updated");
        }catch(err){
            return res.status(500).json(err);
        }
   }else{
       return res.status(403).json("You can update only your own profile");
   }  
});

//DELETE USER
router.delete("/:id", async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
         if(req.body.password){
             try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
             }catch(err){ 
                 return res.status(500).json(err);
             }
         }
         try{
             const user = await User.findByIdAndDelete(req.params.id);
             res.status(200).json("Account deleted succesfuly");
         }catch(err){
             return res.status(500).json(err);
         }
    }else{
        return res.status(403).json("You can delete only your own profile");
    }  
 });
//GET USER

router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        //const { _id, name, email, isAdmin } = user;
        const {password, updatedAt, ...other} = user.toObject();
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }
});
//FOLLOW USER
//UNFOLLOW USER


module.exports = router;