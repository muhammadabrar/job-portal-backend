const router = require("express").Router();
let Users = require("../models/users");
let Candidates = require("../models/candidates");
let Recruiter = require("../models/Recruiter");



//////////////////////////////////////
///////////Get All Users////////////////
router.route("/").get((req, res) => {
  Users.find()
    .then((Users) => res.json(Users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//////////////////////////////////////
///////////post Users////////////////
router.route("/").post(async (req, res) => {
  const data = req.body;
  var code = Math.floor(1000 + Math.random() * 9000);
  const addnewUsers = new Users({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    status: "verification",
    code,
  });
  await addnewUsers
    .save()
    .then(() => res.json({ data: addnewUsers }))
    .catch((err) => res.status(400).json("Error: " + err));
});

//////////////////////////////////////
///////////get by id Users////////////////
router.route("/:id").get((req, res) => {
  Users.findById(req.params.id)
    .then((Users) => res.json(Users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//////////////////////////////////////
///////////User verification////////////////

router.route("/verification/:userId").put(async (req, res) => {
  const id = req.params.userId;
  const code = req.body.code;
  console.log(data);
  const generatedCode = Users.findById({ _id: id }, { code: 1 });
  if (code == generatedCode) {
    const verify = await Users.updateOne(
      { _id: id },
      {
        $set: {
          status: "usertype",
        },
      }
    )
      .then(() => res.json({ verify }))
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    res.status(400).json("Error: " + err);
  }
});

//////////////////////////////////////
///////////User Type////////////////

router.route("/type/:userId").put(async (req, res) => {
  const id = req.params.userId;
  const data = req.body.data;
  console.log(data);
  try {
    const update = await Users.updateOne(
      { _id: id },
      {
        $set: {  
          user_type: data,
          status: "profile",
        },
      }
    );

    res.json({ msg: "Users updated!", update: update });
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

//////////////////////////////////////
///////////post Candidate Users////////////////
router.route("/candidate").post(async (req, res) => {
  const data = req.body;
  const storeCandidate = new Candidates(data);
  await storeCandidate
    .save()
    .then(() => res.json({ data: storeCandidate }))
    .catch((err) => res.status(400).json("Error: " + err));
});


//////////////////////////////////////
///////////post Recruiter Users////////////////
router.route("/recruiter").post(async (req, res) => {
  const data = req.body;
  const storeRecruiter = new Recruiter(data);
  await storeRecruiter
    .save()
    .then(() => res.json({ data: storeRecruiter }))
    .catch((err) => res.status(400).json("Error: " + err));
});


module.exports = router;
