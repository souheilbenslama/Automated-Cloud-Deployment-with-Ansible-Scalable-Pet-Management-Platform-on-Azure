var express = require('express');
var router = express.Router();
var mid = require("../middleware/mid");
var authentificationController = require("../controller/authentificationController");
var profileController = require("../controller/profileController");
var petsController = require("../controller/petsController");
var eventController = require("../controller/eventController");
var postController = require("../controller/postController");
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

  const STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
  const ACCOUNT_ACCESS_KEY = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;

  
  const ONE_MEGABYTE = 1024 * 1024;
  const FOUR_MEGABYTES = 4 * ONE_MEGABYTE;
  const ONE_MINUTE = 60 * 1000;
  

  async function uploadLocalFile(aborter, containerClient, filePath) {
      filePath = path.resolve(filePath);
  
      const fileName = path.basename(filePath);
  
      const blobClient = containerClient.getBlobClient(fileName);
      const blobOptions = { blobHTTPHeaders: { "blobContentType": 'image/jpg', "Content-Disposition": "binary" } };
      const blockBlobClient = blobClient.getBlockBlobClient();
            
      return await blockBlobClient.uploadFile(filePath,blobOptions);
  }


  
async function execute(filepath) {

      const containerName = "petsiblob";
      const blobName = "quickstart.txt";      
      const localFilePath = filepath;
  
      const credentials = new StorageSharedKeyCredential(STORAGE_ACCOUNT_NAME, ACCOUNT_ACCESS_KEY);
      const blobServiceClient = new BlobServiceClient(`https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,credentials);
          blobServiceClient.setProperties
      const containerClient = blobServiceClient.getContainerClient(containerName);
      containerClient.setMetadata
      const blobClient = containerClient.getBlobClient(blobName);
      const blockBlobClient = blobClient.getBlockBlobClient();
      
      const aborter = AbortController.timeout(30 * ONE_MINUTE);
  
      await uploadLocalFile(aborter, containerClient, localFilePath);
      console.log(`Local file "${localFilePath}" is uploaded`);
  
  }
  
  
  


/*
// AZURE STORAGE PArt 
const {
      Aborter,
      BlobURL,
      BlockBlobURL,
      ContainerURL,
      ServiceURL,
      StorageSharedKeyCredential,
      StorageURL,
      uploadStreamToBlockBlob
  } = require('@azure/storage-blob');
  const az = require('@azure/storage-file');
      require('dotenv').config();
  
 const STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
  const ACCOUNT_ACCESS_KEY = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;
  const ONE_MEGABYTE = 1024 * 1024;
  const FOUR_MEGABYTES = 3 * ONE_MEGABYTE;


  async function execute() {
      const {
            Aborter,
            BlobURL,
            BlockBlobURL,
            ContainerURL,
            ServiceURL,
            StorageSharedKeyCredential,
            StorageURL,
            uploadStreamToBlockBlob
        } = require('@azure/storage-blob');
    const containerName = "petsiblob"; 
    const blobName = "quickstart.txt";
    const content = "hello!";
    const localFilePath = "./readme.md";
     
     const credentials = new StorageSharedKeyCredential(STORAGE_ACCOUNT_NAME, ACCOUNT_ACCESS_KEY);
     const pipeline = az.StorageURL.newPipeline(credentials);
     const serviceURL = new az.ServiceURL(`https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net`, pipeline);

     const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
     const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);  
     await uploadLocalFile(aborter, containerURL, localFilePath);
     console.log(`Local file "${localFilePath}" is uploaded`);

      }
//// end AZure  
*/ 

 var storage = multer.diskStorage({
  destination:function(req,file,callback){
    callback(null,"./public/uploads");
  },
  filename: async (req, file, cb) => {
    console.log(file);    
    var name =Date.now()+"_"+file.originalname ; 
         cb(null, name);

            const blobServiceClient = await BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
            const containerClient = await blobServiceClient.getContainerClient("petsiblob");
            const blobName = file.name;
            const contentType = file.type;
            const filePath = file.path;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            const uploadBlobResponse = await blockBlobClient.uploadFile(file.path);
        

     //execute("./public/uploads/"+name).then(() => console.log("Done")).catch((e) => console.log(e));
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
      .get(mid.loggedIn, postController.myPosts)

router.route("/post/:id")
      .delete(mid.loggedIn, postController.deletePost)


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
      .post(mid.loggedIn,mid.verifyFollow,messageController.sendMessage);
router.route("/messages")
      .get(mid.loggedIn,messageController.getallmessages)    

router.route("/dossier/:dossierId")
      .get(mid.loggedIn,mid.vetAccess,dossierController.getDossier)
      .put(mid.loggedIn,mid.verifyVet,mid.dossierOpen,dossierController.giveAccess)
      .delete(mid.loggedIn,dossierController.cancelRequest);
router.put("/addRapport/:dossierId",mid.loggedIn,mid.vetAccess,mid.verifyVet,mid.dossierOpen,dossierController.addRapport);
router.get("/dossiers",mid.loggedIn,mid.verifyVet,dossierController.getDossiers);
router.get("/pet/:petId/vetRequestsOnHold",mid.loggedIn,mid.verifyPetOwner,dossierController.requestsOnHold);
router.route("/pet/:petId/dossier")
      .put(mid.loggedIn,dossierController.closeDossier);
router.route("/dossier/:petId")
      .post(mid.loggedIn,mid.verifyPetOwner,dossierController.requestVet)
router.get("/dossierRequests",mid.loggedIn,mid.verifyVet,dossierController.requests);


router.route("/follow/:userId")
      .get(mid.loggedIn,followController.visitUser)
      .post(mid.loggedIn,followController.follow)
      .delete(mid.loggedIn,followController.cancelFollow);
router.put("/confirmFollow/:followId",mid.loggedIn,followController.confirmFollow);
router.get("/followers",mid.loggedIn,followController.followers);
router.get("/follows",mid.loggedIn,followController.follows);
router.get("/requestsOnHold",mid.loggedIn,followController.requestsOnHold);
router.get("/requests",mid.loggedIn,followController.requests);

router.get("/localization",mid.loggedIn,localizationController.getLocalization);

module.exports = router;
