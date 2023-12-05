import {
  docModel,
  infoModel,
  educationModel,
  userModel,
} from "../models/userModel.js";
import { paymentModel } from "../models/paymentModel.js";
import { isRequired } from "../middleware/fieldMiddleware.js";

// user_id, name, father, mother, mobile, whatsapp, gender
// category, marital, religion, pwd, ews, address, full_address, state
// district, city, pincode

export const userStepOne = async (req, res) => {
  try {
    const old =
      (await infoModel.findOne({ user_id: req.body.user_id })) || undefined;
    const update = req.body.update;
    if (old && update == true) {
      let updatedData = {};

      if (Object.keys(req.body.userData).length !== 0) {
        updatedData = { ...req.body.userData };
      }
      for (const keys in req.body.permanent) {
        updatedData[`permanent.${keys}`] = req.body.permanent[keys];
      }
      for (const keys in req.body.correspond) {
        updatedData[`correspond.${keys}`] = req.body.correspond[keys];
      }
      const result = await infoModel.updateOne(
        { user_id: req.body.user_id },
        { $set: updatedData }
      );
      return res.json({ status: "success", result });
    }

    const data = isRequired(req.body.userData, [
      "name",
      "father",
      "mother",
      "mobile",
      "gender",
      "category",
      "marital",
      "religion",
      "pwd",
      "ews",
      "dob",
      "whatsapp",
    ]);
    const permanent = isRequired(req.body.permanent, [
      "state",
      "district",
      "city",
      "pincode",
      "full_address",
    ]);
    const correspond = isRequired(req.body.correspond, [
      "state",
      "district",
      "city",
      "pincode",
      "full_address",
    ]);
    data.permanent = permanent;
    data.correspond = correspond;
    data.user_id = req.body.user_id;

    const result = infoModel(data);
    await result.save();
    return res.json({ status: "success", result });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ status: "failed", error: err.message });
  }
};

// user_id, exam_name, institute, university, passing_year, percentage, division, exam_type
export const userStepTwo = async (req, res) => {
  try {
    const old =
      (await educationModel.findOne({ user_id: req.body.user_id })) ||
      undefined;
    if (old) return res.json({ message: "Please user is old", error: "exist" });

    let { tenth, twelfth } = req.body;
    tenth = isRequired(tenth, [
      "exam_name",
      "institute",
      "university",
      "passing_year",
      "percentage",
      "division",
      "exam_type",
    ]);
    twelfth = isRequired(twelfth, [
      "exam_name",
      "institute",
      "university",
      "passing_year",
      "percentage",
      "division",
      "exam_type",
    ]);

    let mod = await educationModel.create({
      ...tenth,
      user_id: req.body.user_id,
    });
    console.log(mod);
    mod = await educationModel.create({
      ...twelfth,
      user_id: req.body.user_id,
    });
    console.log(mod);
    return res.json({ data: [] });
  } catch (err) {
    console.log(err.message);
    return res.json({ error: err.message });
  }
};

// user_id, aadhar_path, photo_path, leftThumb_path, sign_path, tenth_path, twelfth_path
export const userStepThree = async (req, res) => {
  try {
    const data = isRequired(req.body, [
      "user_id",
      "qualification",
      "subject",
      "institute",
      "university",
      "passing_year",
      "percentage",
      "division",
    ]);
    console.log(data);
    return res.json({ status: "success", data: [] });
  } catch (err) {
    console.log(err.message);
    return res.json({ status: "failed", error: err.message });
  }
};

export const userInformation = async (req, res) => {
  try {
    const { user_id } = req.body;
    const { ask } = req.query;
    const responseArr = [];
    if (ask == "personal" || ask == "all") {
      const userData = await infoModel
        .findOne(
          { user_id: user_id },
          { user_id: 0, _id: 0, __v: 0, updated_at: 0 }
        )
        .lean();
        console.log({userData});
      if (userData) {
        const permanent = userData?.permanent;
        const correspond = userData?.correspond;
        delete userData.correspond;
        delete userData.permanent;
        responseArr.push({ userData, permanent, correspond });
      }

      if (ask == "personal") return res.json({ result: [responseArr[0]] });
    }

    if (ask == "education" || ask == "all") {
      const educationData = await educationModel
        .findOne(
          { user_id: user_id },
          { user_id: 0, _id: 0, __v: 0, updated_at: 0 }
        )
        .lean();

      if (ask == "education") {
        if (educationData == null) {
          return res.json({ result: [] });
        }
        return res.json({ result: [educationData] });
      }

      if (educationData) responseArr.push(educationData);
    }

    if (ask == "document" || ask == "all") {
      const documentData = await docModel
        .findOne(
          { user_id: user_id },
          { user_id: 0, _id: 0, __v: 0, updated_at: 0 }
        )
        .lean();

      if (ask == "document") {
        if (documentData == null) {
          return res.json({ result: [] });
        }
        return res.json({ result: [documentData] });
      }

      if (documentData != null) responseArr.push(documentData);
    }

    return res.json({ result: responseArr });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: err.message });
  }
};

import fs from "fs";
import { batchModel } from "../models/courseModel.js";

export const fileReciever = async (req, res) => {
  try {
    const file = req.files[0];
    const { fieldname, user_id, user_name } = req.body;

    // console.log(file);
    let path = `./upload/student/`; 
    if (!fs.existsSync(path)) fs.mkdirSync(path);
    path = `${path}${user_name.replace(" ", "-")}-${user_id}/`;
    if (!fs.existsSync(path)) fs.mkdirSync(path);

    path = `${path}/${file.originalname}`;

    let model = await docModel.find({ user_id });

    if (model.length == 1) {
      model = await docModel.findOneAndUpdate(
        { user_id },
        { [fieldname]: path.split("./upload")[1] }
      );
      model.save();
    } else {
      model = await docModel.create({
        user_id,
        [fieldname]: path.split("./upload")[1],
      });
    }
    fs.writeFileSync(path, file.buffer);
    return res.status(200).json({ message: "done" });
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ error: err.message });
  }
};

export const AppHistory = async (req, res) => {
  try {
    const userId = req.body.user_id;
    const paymentRecords = await paymentModel.find({ user_id: userId });

    // const Enrolled_Courses = paymentRecords[0].course_name;
    // const Enrolled_Courses = paymentRecords.map((e)=>{return e.course_name})

    return res.status(200).json(paymentRecords);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

export const GetCandidates = async (req, res) => {
  try {
    const { user_id } = req.body;
    // console.log({user_id});

    const userData = await infoModel.find( { user_id } );
    console.log({userData});
    return res.json({ userData });
  } catch (error) {
    return res.json({ status: "failed", error: error.message });
  }
};
