const cloudinary = require("cloudinary");

// config for the cloudinary to upload a image
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// in the backend we send the image from client side those image will save in the cloudinary by backend after saving it gives the url as response to frontend
uploadImage = async (req, res) => {
  try {
    // console.log(req.body.image);
    let result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`, // this is the id
      resource_type: "auto", // jpeg, png support any format of the image
    });

    res.json({
      public_id: result.public_id, // send the id of the uploaded image
      url: result.secure_url, // send the url of the uploaded image
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

// removeImage = async (req, res) => {
//   try {
//     let image_id = req.body.public_id; // this is the id on which we will remove from the cloudinary

//     const destroyResult = await new Promise((resolve, reject) => {
//       cloudinary.uploader.destroy(image_id, (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result);
//         }
//       });
//     });

//     res.send("ok");
//   } catch (error) {
//     res.status(500).json({ success: false, error: "Image removal failed." });
//   }
// };

module.exports = uploadImage;
