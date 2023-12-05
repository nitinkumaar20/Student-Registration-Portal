import { Router } from 'express'; 
import { verifyAdmin} from '../middleware/FetchUsersForAdmin.js';
import { ShowBatches } from '../controllers/courseController.js';

const router = Router(); 


router.get('/batches',verifyAdmin, ShowBatches)


export default router