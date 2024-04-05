const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Course = require("./dbConnect");
const ImageKit = require("imagekit");
const multer = require("multer");

// إعداد ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.publicKey,
  privateKey: process.env.privateKey,
  urlEndpoint: process.env.urlEndpoint,
  authenticationEndpoint: process.env.authenticationEndpoint,
});

// إعداد Multer لتحميل الصور
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./img"); // تحديد المجلد المستهدف للتخزين
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// إنشاء نقطة نهاية لإضافة بيانات الدورة مع ImageKit
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file.path; // استخدام مسار الصورة المحملة
    const { name, description, id } = req.body;

    // تحميل الصورة إلى ImageKit
    const uploadResponse = await imagekit.upload({
      file: imageUrl,
      fileName: "abc1.jpg",
      tags: ["tag1"],
    });

    // إنشاء كائن دورة جديد
    const newCourse = new Course({
      id: id,
      name: name,
      img: uploadResponse.url,
      description: description,
    });

    // حفظ الدورة في قاعدة البيانات
    await newCourse.save();

    // إرسال رد بعد حفظ الدورة بنجاح
    res.status(200).send("تم تحميل الصورة بنجاح.");
  } catch (err) {
    // إرسال رد خطأ في حالة حدوث خطأ
    console.error("خطأ في تحميل الصورة:", err);
    res.status(500).send("فشل في تحميل الصورة.");
  }
});

router.patch("/upload-image/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { path: imageUrl } = req.file;
  const { name, description } = req.body;

  try {
    // تحقق مما إذا كان المعرف هو ObjectId صالحًا
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

    let course;
    if (isValidObjectId) {
      // إذا كان المعرف ObjectId صالحًا، فاستخدمه مباشرة
      course = await Course.findById(id);
    } else {
      // إذا لم يكن المعرف ObjectId صالحًا، فاستخدمه كما هو
      course = await Course.findOne({ id: parseInt(id) });
    }

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    // تحميل الصورة إلى ImageKit
    const uploadResponse = await imagekit.upload({
      file: imageUrl,
      fileName: "abc1.jpg",
      tags: ["tag1"],
    });
    // Update course properties
    course.name = name;
    course.description = description;
    course.img = uploadResponse.url;

    // Save the updated course
    await course.save();

    res.json(course);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/upload-image/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // تحقق مما إذا كان المعرف هو ObjectId صالحًا
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

    let course;
    if (isValidObjectId) {
      // إذا كان المعرف ObjectId صالحًا، فاستخدمه مباشرة
      course = await Course.findById(id);
    } else {
      // إذا لم يكن المعرف ObjectId صالحًا، فاستخدمه كما هو
      course = await Course.findOne({ id: parseInt(id) });
    }

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // حذف الدورة إذا تم العثور عليها
    await course.deleteOne(); // أو استخدم findOneAndDelete()

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// إنشاء نقطة نهاية لاسترجاع جميع بيانات الدورة
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "فشل في عرض الدورات" });
  }
});

module.exports = router;
