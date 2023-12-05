import { Router } from 'express';
import { createCourse, createBatch, enrollBatch, getCourses, createCategory, getCategories, updateCategory,isBatchExist, ShowBatches } from '../controllers/courseController.js';
import { verifyAdmin, verifyJwt } from '../middleware/fetchuser.js';
const routes = Router()
// import multer from 'multer'


routes.get('/', getCourses)

///////////////////////////////////////////////////////////////////////////

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "upload");
//     },
//     filename: function (req, file, cb) {
//       cb(
//         null,
//         file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//       );
//     },
//   });
//   const upload = multer({
//     storage: storage,
//   });
////////////////////////////////////////////////////////////////////////////////////////////////////////

routes.post('/', createCourse)

routes.get('/category', getCategories)
routes.post('/category', createCategory)
routes.put('/category', updateCategory)

routes.post('/batch/create',verifyAdmin, createBatch)
routes.post('/batch/enroll',enrollBatch)
routes.post('/batch/batchExist',verifyJwt, isBatchExist)
routes.post('/batch/showbatches',verifyAdmin, ShowBatches)



export default routes