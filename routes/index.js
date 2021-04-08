var express = require('express');
var router = express.Router();
var mid = require("../middleware/mid");
var authentificationController = require("../controller/authentificationController");
var profileController = require("../controller/profileController");
var multer = require('multer');

var storage = multer.diskStorage({
  destination:function(req,file,callback){
    callback(null,"./public/uploads");
  },
  filename: (req, file, cb) => {
      cb(null,file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage: storage ,limits:{fieldSize:1024*1024*3}}).single("avatar");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/contacts', function(req, res, next) {
  res.render('contacts');
});

router.get('/login',mid.loggedOut, function(req, res, next) {
  res.render('login');
});
router.post('/login', authentificationController.login_post);

router.get("/forgetPassword",mid.loggedOut,function(req,res,next){
  res.render("forgetPassword");
});

router.post("/forgetPassword",authentificationController.forgetPassword_post)

router.get("/register",mid.loggedOut, function(req, res, next) {
  res.render("register");
});

router.post("/register",upload,authentificationController.register_post);

router.get("/profile",mid.loggedIn,profileController.profile);

router.get("/logout",mid.loggedIn,authentificationController.logout);

module.exports = router;
