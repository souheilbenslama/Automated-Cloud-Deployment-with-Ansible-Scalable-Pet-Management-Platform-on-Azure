var express = require('express');
var router = express.Router();
var mid = require("../middleware/mid");
var authentificationController = require("../controller/authentificationController");
var profileController = require("../controller/profileController");
var petsController = require("../controller/petsController");
var eventController = require("../controller/eventController");
var postController = require("../controller/postController");
var commentController = require("../controller/commentController");
var vetController = require("../controller/vetController");
var offerController = require("../controller/offerController");
var messageController = require("../controller/messageController");
var dossierController = require("../controller/dossierController");
var followController = require("../controller/followController");
var localizationController = require("../controller/localizationController");
var multer = require('multer');
const { route } = require('../app');


const { StorageSharedKeyCredential,
      BlobServiceClient } = require('@azure/storage-blob');
  const {AbortController} = require('@azure/abort-controller');
  const fs = require("fs");
  const path = require("path");
const { Console } = require('console');

  const STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
  const ACCOUNT_ACCESS_KEY = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;

  
  const ONE_MEGABYTE = 1024 * 1024;
  const FOUR_MEGABYTES = 4 * ONE_MEGABYTE;
  const ONE_MINUTE = 60 * 1000;
  
async function execute(filepath,filename,file) {
        
      const containerName = "petsiblob";
      const blobName = filename;      
      const localFilePath = filepath;
  
      const credentials = new StorageSharedKeyCredential(STORAGE_ACCOUNT_NAME, ACCOUNT_ACCESS_KEY);
      const blobServiceClient = new BlobServiceClient(`https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,credentials);
          
      const containerClient = blobServiceClient.getContainerClient(containerName);
      const blobClient = containerClient.getBlobClient(blobName);
      const blobOptions = { blobHTTPHeaders: { blobContentType: 'image/jpg' } };

     const blockBlobClient = blobClient.getBlockBlobClient();

      blockBlobClient.uploadStream(file.stream,file.stream.readableHighWaterMark ,undefined,blobOptions);

      console.log(`Local file "${localFilePath}" is uploaded`);
  }
  
  

 var storage = multer.diskStorage({
  destination:function(req,file,callback){
    callback(null,"./public/uploads");
  },
  filename: async (req, file, cb) => {
       
    var name =Date.now()+"_"+file.originalname ; 
    
         cb(null, name);
              
            execute("./public/uploads/"+name,name,file).then(() => console.log("Done")).catch((e) => console.log(e));
  }
});
var upload = multer({ storage: storage ,limits:{fieldSize:1024*1024*3}});

router.post('/login',mid.loggedOut, authentificationController.login);

router.post("/forgetPassword",mid.loggedOut,authentificationController.forgetPassword);
router.post("/verifyCode",mid.loggedOut,authentificationController.verifyCode);
router.put("/resetPassword",mid.loggedIn,authentificationController.resetPassword);

router.post("/register",mid.loggedOut,upload.single("avatar"),authentificationController.register);

router.route("/profile")
      .get(mid.loggedIn,profileController.profile)
      .put(mid.loggedIn,upload.single("avatar"),profileController.updateProfile);

router.get("/getUsers",mid.loggedIn,profileController.getUsers);
router.get("/getVets",mid.loggedIn,vetController.getVets);

router.get("/myPets",mid.loggedIn,petsController.myPets);
router.post("/addPet",mid.loggedIn,upload.single("photo"),petsController.addPet);
router.post("/petsForSale",petsController.getForSale);
router.post("/petsForAdoption",petsController.getForAdoption);
router.route("/pet/:petId")
      .get(mid.loggedIn,petsController.petProfile)
      .put(mid.loggedIn,upload.single("photo"),petsController.updatePetProfile)
      .delete(mid.loggedIn,petsController.deletePet);

router.route("/pet/:petId/appointment")
      .post(mid.loggedIn,eventController.addAppointment)
      .get(mid.loggedIn,eventController.showAppointments);
router.route("/pet/:petId/appointment/:appointmentId")
      .get(mid.loggedIn,eventController.findAppointment)
      .put(mid.loggedIn,eventController.updateAppointment)
      .delete(mid.loggedIn,eventController.deleteAppointment);

router.route("/pet/:petId/bath")
      .post(mid.loggedIn,eventController.addBath)
      .get(mid.loggedIn,eventController.showBaths);
router.route("/pet/:petId/bath/:bathId")
      .get(mid.loggedIn,eventController.findBath)
      .put(mid.loggedIn,eventController.updateBath)
      .delete(mid.loggedIn,eventController.deleteBath);

router.route("/pet/:petId/weight")
      .post(mid.loggedIn,eventController.addWeight)
      .get(mid.loggedIn,eventController.showWeights);
router.route("/pet/:petId/weight/:weightId")
      .get(mid.loggedIn,eventController.findWeight)
      .put(mid.loggedIn,eventController.updateWeight)
      .delete(mid.loggedIn,eventController.deleteWeight);

router.route("/pet/:petId/vaccine")
      .post(mid.loggedIn,eventController.addVaccine)
      .get(mid.loggedIn,eventController.showVaccines);
router.route("/pet/:petId/vaccine/:vaccineId")
      .get(mid.loggedIn,eventController.findVaccine)
      .put(mid.loggedIn,eventController.updateVaccine)
      .delete(mid.loggedIn,eventController.deleteVaccine);

router.route("/pet/:petId/food")
      .post(mid.loggedIn,eventController.addFood)
      .get(mid.loggedIn,eventController.showFood);
router.route("/pet/:petId/food/:foodId")
      .get(mid.loggedIn,eventController.findFood)
      .put(mid.loggedIn,eventController.updateFood)
      .delete(mid.loggedIn,eventController.deleteFood);

router.route("/pet/:petId/treatment")
      .post(mid.loggedIn,eventController.addTreatment)
      .get(mid.loggedIn,eventController.showTreatments);
router.route("/pet/:petId/treatment/:treatmentId")
      .get(mid.loggedIn,eventController.findTreatment)
      .put(mid.loggedIn,eventController.updateTreatment)
      .delete(mid.loggedIn,eventController.deleteTreatment);

router.put("/pet/:petId/status",mid.loggedIn,petsController.updateStatus);

router.route("/post")
      .post(mid.loggedIn,upload.single("photo"), postController.addPost)
      .get(mid.loggedIn, postController.myPosts);
router.route("/post/:postId")
      .delete(mid.loggedIn, postController.deletePost)
      .put(mid.loggedIn, postController.updatePost);
router.get("/allPosts",mid.loggedIn,postController.getFollowPosts);
router.get("/Posts/:receiverId",mid.loggedIn,mid.verifyFollow,postController.getPosts);

router.route("/post/:postId/comment")
      .post(mid.loggedIn,upload.single("photo"), commentController.addComment)
      .get(mid.loggedIn, commentController.getComments);
router.route("/comment/:commentId")
      .delete(mid.loggedIn, commentController.deleteComment)
      .put(mid.loggedIn, commentController.updateComment);


router.route("/pet/:petId/offer")
      .post(mid.loggedIn,offerController.addOffer)
      .get(mid.loggedIn,offerController.findPetOffer);
router.get("/offers",offerController.showOffers);
router.get("/adoptionOffers",offerController.showAdoptionOffers);
router.get("/saleOffers",offerController.showSaleOffers);
router.route("/pet/:petId/offer/:offerId")
      .get(offerController.findOffer)
      .put(mid.loggedIn,offerController.updateOffer)
      .delete(mid.loggedIn,offerController.deleteOffer);
router.put("/offer/:offerId",mid.loggedIn,offerController.sendOffer);
router.put("/cancelOffer/:offerId",mid.loggedIn,offerController.cancelOffer);
router.put("/confirmOffer/:offerId",mid.loggedIn,offerController.confirmOffer);

router.route("/message/:receiverId")
      .get(mid.loggedIn,messageController.getmessages)
      .post(mid.loggedIn,messageController.sendMessage);
router.route("/messages")
      .get(mid.loggedIn,messageController.getallmessages)    

router.route("/dossier/:dossierId")
      .get(mid.loggedIn,mid.vetAccess,dossierController.getDossier)
      .put(mid.loggedIn,mid.verifyVet,mid.dossierOpen,dossierController.giveAccess)
      .delete(mid.loggedIn,dossierController.cancelRequest);
router.put("/addRapport/:dossierId",mid.loggedIn,mid.vetAccess,mid.verifyVet,mid.dossierOpen,dossierController.addRapport);
router.get("/dossiers",mid.loggedIn,mid.verifyVet,dossierController.getDossiers);
router.get("/pet/:petId/vetRequestsOnHold",mid.loggedIn,mid.verifyPetOwner,dossierController.requestsOnHold);
router.put("/pet/:petId/dossier",mid.loggedIn,dossierController.closeDossier);
router.post("/dossier/:petId",mid.loggedIn,mid.verifyPetOwner,dossierController.requestVet)
router.get("/dossierRequests",mid.loggedIn,mid.verifyVet,dossierController.requests);


router.route("/follow/:userId")
      .get(mid.loggedIn,followController.visitUser)
      .post(mid.loggedIn,followController.follow);
router.delete("/follow/:followId",mid.loggedIn,followController.cancelFollow);
router.put("/confirmFollow/:followId",mid.loggedIn,followController.confirmFollow);
router.get("/followers",mid.loggedIn,followController.followers);
router.get("/follows",mid.loggedIn,followController.follows);
router.get("/notFollows",mid.loggedIn,followController.notFollows);
router.get("/requestsOnHold",mid.loggedIn,followController.requestsOnHold);
router.get("/requests",mid.loggedIn,followController.requests);

router.get("/localization",mid.loggedIn,localizationController.getLocalization);

module.exports = router;
