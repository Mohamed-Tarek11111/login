const express = require("express");
const pasth = require("path");
const bcrypt = require("bcrypt");
const collaction = require("./config");

const app = express();

// convert data into json format تحويل البيانات إلى تنسيق json
app.use(express.json()); //هذا السطر يستخدم middleware من Express.js للمساعدة في تحليل
app.use(express.urlencoded({ extended: false }));

//static file css
app.use(express.static("public"));

//API
// register user
//----signup--------

app.post("/signup", async (req, res) => {
<<<<<<< HEAD
  try {
    const data = {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      BirthDate: req.body.BirthDate,
      username: req.body.username,
      phone: req.body.phone,
    };
    const extUser = await collaction.findOne({
      username: data.username,
      email: data.email,
    });
    if (extUser) {
      res.status(400).send({
        message:
          "User already exists. Please choose a different username and email.",
      });
    } else {
      const saltrounds = 10;
      const hashPassword = await bcrypt.hash(data.password, saltrounds);
      data.password = hashPassword;

      const userData = await collaction.insertOne(data);
      console.log(userData);
=======
    try {
        const data = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          gender: req.body.gender,
          date: req.body.date,
          username: req.body.username,
          phone: req.body.phone,
        };
        const extUser = await collaction.findOne({
          username: data.username,
          email: data.email,
        });
        if (extUser) {
          res.status(400).send({ message: "User already exists. Please choose a different username and email." });
        }else{
          const saltrounds = 10;
          const hashPassword = await bcrypt.hash(data.password, saltrounds);
          data.password = hashPassword;
      
          const userData = await collaction.insertOne(data);
            console.log(userData);
            // res.render("login")
        }
    } catch(err) {
        res.status(500).send({ error: err });
>>>>>>> origin/master
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
});
// ---------------------------------------------------------
//--login---
//login user
<<<<<<< HEAD
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body; // destructuring

    const check = await collaction.findOne({ username: username });
    if (!check) {
      res.status(400).send({ error: "Username is incorrect" });
    } else {
      //compare the hash password from the database with the plain taxt
      const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        check.password
      );
      if (isPasswordMatch) {
        const userData = {
          username: check.username,
          firstName: check.firstName,
          lastName: check.lastName,
        };
        res.send(userData);
      } else {
        res.send({ error: "Incorrect password" });
      }
    }
  } catch (err) {
    res.send({ error: err });
  }
});
=======
app.post("/login",async(req,res)=>{
    try{
        const { username, password } = req.body; // destructuring
        
        const check =await collaction.findOne({ username: username })
        if(!check){
           res.status(400).send({ error: "Username is incorrect" });
        }
        else {
            //compare the hash password from the database with the plain taxt
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password)
            if(isPasswordMatch){
                const userData = { username: check.username, firstName: check.firstName, lastName: check.lastName }
                res.send(userData);
            } else{
                res.send({ error: "Incorrect password" })
            }
        }
    }
    catch(err) {
        res.send({ error: err })
    }
})
>>>>>>> origin/master
//------------------------------------------
// Deploymant Access & Comprssion data
const cors = require("cors");
app.use(cors());
//compress all responses
const Comprssion = require("compression");
app.use(Comprssion());

const port = 5000;
app.listen(port, () => {
  console.log(`server run port on ${port}`);
});
