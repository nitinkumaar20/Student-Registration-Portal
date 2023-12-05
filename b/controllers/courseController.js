import {
  batchModel,
  courseModel,
  categoryModel,
} from "../models/courseModel.js";
import { isRequired } from "../middleware/fieldMiddleware.js";

export const getCourses = async (req, res) => {
  try {
    const { category, course_name } = req.query;

    let courses = null;
    if (category && category != null) {
      courses = await courseModel.find({ category: category });
    } else if (course_name && course_name != null) {
      courses = await courseModel.find({
        course_name: { $regex: `.*${course_name.toLowerCase()}.*` },
      });
    } else {
      courses = await courseModel.find();
    }
    return res.json({ status: "done", result: courses });
  } catch (err) {
    console.log(err.message);
    return res.json({ status: "failed", error: err.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const data = isRequired(req.body, [
      "course_name",
      "duration_time",
      "duration_type",
      "description",
      "category",
      "fees",
      // "file",
  
    ]);
 
     const result = courseModel(data);
    await result.save();


   
   
    return res.status(200).json({ status: "done", result });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ status: "failed", error: err.message });
  }
};

export const createBatch = async (req, res) => {
  try {
    const data = isRequired(req.body, [
      "course_id",
      "batch_name",
      "end_date",
      "start_date",
    ]);

    // data["start_date"] = `${data.start_date}T00:00:00.000+00:00`
    // data["end_date"] = `${data.end_date}T00:00:00.000+00:00`

    data["fees"] = (await courseModel.findById(data.course_id, "fees")).fees;

    let isUnique = await batchModel.find({
      course_id: data.course_id,
      // end_date: { $gte: data.start_date },
    });

    if (isUnique.length > 0) throw Error("Batch is Exists");

    data["status"] = "ongoing";
    const result = batchModel(data);
    await result.save();
    return res.json({
      status: "success",
      message: "Successful Batch Created",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      status: "failed",
      message: "Batch failed",
      error: err.message,
    });
  }
};

export const enrollBatch = async (req, res) => {
  try {
    const data = isRequired(req.body, ["user_id", "course_id"]);
    console.log(data,'backend data');
    let currBatch =
      (await batchModel.findOne({
        course_id: data.course_id,
        status: "ongoing",
      })) || undefined;

    if (currBatch) {
      currBatch.user_list.forEach((e) => {
        if (e.user_id == data.user_id) throw Error("User is Exist");
      });
      currBatch.user_list.push({ user_id: data.user_id });
      await currBatch.save();
    }
    return res.json({ status: "done", data: currBatch });
  } catch (err) {
    console.log(err.message);
    return res.json({ status: "failed", error: err.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const data = isRequired(req.body, ["category"]);
    const result = categoryModel(data);
    await result.save();
    return res.json({ status: "done", result });
  } catch (err) {
    console.log(err.message);
    return res.json({ status: "failed", error: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const data = isRequired(req.body, ["category"]);
    const result = await categoryModel.findByIdAndUpdate(req.query.id, data, {
      new: true,
    });
    return res.json({ status: "done", data: result });
  } catch (err) {
    console.log(err.message);
    return res.json({ status: "failed", error: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const { category } = req.query;
    let result = null;
    if (category && category != null) {
      result = await categoryModel.find(
        { category: category },
        { category: 1, _id: 0 }
      );
    } else {
      result = await categoryModel.find({}, { category: 1 }).lean();
    }
    return res.json({ status: "done", result });
  } catch (err) {
    console.log(err.message);
    return res.json({ status: "failed", error: err.message });
  }
};

export const isBatchExist = async (req, res) => {
  try {
    const data = isRequired(req.body, ["course_id", "user_id"]);

    console.log(data);

    if (!data) {
      throw Error("course id not found");
    }

    // Batch status

    const batchStatus = (
      await batchModel.findOne({ course_id: data.course_id }, "status")
    ).status;

    let ExUser= null;
    const currentBatch = await batchModel.findOne({
      course_id: data.course_id,
      status: "ongoing",
    });
    
    if (currentBatch) {
      const userlist = currentBatch.user_list
    
      await userlist.forEach((e) => {
       
        if ( JSON.stringify(data.user_id)  == JSON.stringify(e.user_id)){
          // Already Enroll the Course user
         console.log(
          data.user_id, e.user_id);
          return (ExUser = true);
        }
      });
    }

    return res.json({ status: "successful", batchStatus, ExUser });
  } catch (error) {
    return res.json({ status: "failed", error: error.message });
  }
};

export const ShowBatches = async (req, res) => {
  try {
    const { ask } = req.query;
    let result = null;

    if (ask == "ongoing") {
      result = await batchModel.find({
        status: ask,
      });
    } else if (ask == "upcoming") {
      result = await batchModel.find({
        status: ask,
      });
    } else {
      result = await batchModel.find();
    }

    return res.json({ status: "successful", result });
  } catch (error) {
    return res.json({ status: "failed", error: error.message });
  }
};
