const express = require("express");
const router = express.Router();
const Course = require("./dbConnect");
<<<<<<< HEAD
const ImageKit = require("imagekit");
const multer = require("multer");
const fs = require('fs');
const axios = require('axios');


// إعداد ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.publicKey,
  privateKey: process.env.privateKey,
  urlEndpoint: process.env.urlEndpoint,
  authenticationEndpoint: process.env.authenticationEndpoint,
});
=======
// mo
>>>>>>> 94c48f392e07f588144a27afb2ebef6ab4cce925


axios.get('http://process.env.authenticationEndpoint')
.then(function (response) {
  console.log(response.data);
})
.catch(function(error) {
  console.log(error);
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
    const { name, description } = req.body;

    // تحميل الصورة إلى ImageKit
    const uploadResponse = await imagekit.upload({
      file: imageUrl,
      fileName: "abc1.jpg",
      tags: ["tag1"],
    });

    // إنشاء كائن دورة جديد
    const newCourse = new Course({
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



router.delete("/delete-image", async (req, res) => 
    {
    const courses = img/Screenshot (128).png
      // قم بفحص ما اذا كان الملف موجود قبل الحزف 
    if (fs.existsSync(courses))  {
        fs.unlinkSync(courses);
        res.send('تم حزف الصورة بنجاح.');
    }

    else{
        res.send('الصورة غير موجودة اصلا.')
    }
});

router.listen(500, () => {
    console.log('THE PORT listen 500')
})


//catch (err) {
    //console.error("خطأ في مسح الصورة:", err);
    //res.status(500).send("فشل في مسح الصورة.");
    //}

module.exports = router;
