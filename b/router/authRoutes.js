import { Router } from "express";
import { verifyUser } from "../middleware/fetchuser.js";  
import { signUp, singIn } from "../controllers/authController.js";

const router = Router();
 

router.post( "/signup", signUp );
 router.post( "/signin", singIn );

router.post("/getuser", verifyUser);

export default router;
