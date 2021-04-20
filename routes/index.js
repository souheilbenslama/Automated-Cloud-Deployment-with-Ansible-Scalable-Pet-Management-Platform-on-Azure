var express = require('express');
var router = express.Router();
var mid = require("../middleware/mid");
var authentificationController = require("../controller/authentificationController");
var profileController = require("../controller/profileController");
var petsController = require("../controller/petsController");
var eventController = require("../controller/eventController");
var multer = require('multer');

var storage = multer.diskStorage({
  destination:function(req,file,callback){
    callback(null,"./public/uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
      cb(null,Date.now()+"_"+file.originalname );
  }
});
var upload = multer({ storage: storage ,limits:{fieldSize:1024*1024*3}});

router.post('/login', authentificationController.login);

router.post("/forgetPassword",authentificationController.forgetPassword)

router.post("/resetPassword",authentificationController.resetPassword)

router.post("/register",upload.single("avatar"),authentificationController.register);

router.route("/profile")
      .get(mid.loggedIn,profileController.profile)
      .put(upload.single("avatar"),profileController.updateProfile);

router.get("/getUsers",mid.loggedIn,profileController.getUsers);

router.get("/logout",mid.loggedIn,authentificationController.logout);

router.get("/myPets",mid.loggedIn,petsController.myPets);
router.post("/addPet",upload.single("photo"),petsController.addPet);
router.route("/pet/:petId")
      .get(mid.loggedIn,petsController.petProfile)
      .put(upload.single("photo"),petsController.updatePetProfile)
      .delete(mid.loggedIn,petsController.deletePet);

router.route("/pet/:petId/appointment")
      .post(eventController.addAppointment)
      .get(mid.loggedIn,eventController.showAppointments);
router.route("/pet/:petId/appointment/:appointmentId")
      .get(mid.loggedIn,eventController.findAppointment)
      .put(eventController.updateAppointment)
      .delete(mid.loggedIn,eventController.deleteAppointment);

router.route("/pet/:petId/bath")
      .post(eventController.addBath)
      .get(mid.loggedIn,eventController.showBaths);
router.route("/pet/:petId/bath/:bathId")
      .get(mid.loggedIn,eventController.findBath)
      .put(eventController.updateBath)
      .delete(mid.loggedIn,eventController.deleteBath);

router.route("/pet/:petId/weight")
      .post(eventController.addWeight)
      .get(mid.loggedIn,eventController.showWeights);
router.route("/pet/:petId/weight/:weightId")
      .get(mid.loggedIn,eventController.findWeight)
      .put(eventController.updateWeight)
      .delete(mid.loggedIn,eventController.deleteWeight);

router.route("/pet/:petId/vaccine")
      .post(eventController.addVaccine)
      .get(mid.loggedIn,eventController.showVaccines);
router.route("/pet/:petId/vaccine/:vaccineId")
      .get(mid.loggedIn,eventController.findVaccine)
      .put(eventController.updateVaccine)
      .delete(mid.loggedIn,eventController.deleteVaccine);

router.route("/pet/:petId/food")
      .post(eventController.addFood)
      .get(mid.loggedIn,eventController.showFood);
router.route("/pet/:petId/food/:foodId")
      .get(mid.loggedIn,eventController.findFood)
      .put(eventController.updateFood)
      .delete(mid.loggedIn,eventController.deleteFood);

router.route("/pet/:petId/treatment")
      .post(eventController.addTreatment)
      .get(mid.loggedIn,eventController.showTreatments);
router.route("/pet/:petId/treatment/:treatmentId")
      .get(mid.loggedIn,eventController.findTreatment)
      .put(eventController.updateTreatment)
      .delete(mid.loggedIn,eventController.deleteTreatment);

module.exports = router;
