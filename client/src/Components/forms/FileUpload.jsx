import React from "react";
import Resizer from "react-image-file-resizer";

const FileUpload = () => {
  // this is for the reisizing of the images
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        720,
        720,
        "JPEG",
        100,
        0,
        (uri) => {
          // this url will give us the rezsized link of image
          resolve(uri);
        },
        "base64"
      );
    });
  // creating a handleChange function which will resize the image pic to minimun size anbd after we send the image to backend and from backend it will go to cloudinary
  // once we resize the image then the image will send to productcrefrom in image usetate
  const handleChange = async (e) => {
    // user can elect multiple files so we use for loop to iterate the files and resize the each of them
    try {
      const files = e.target.files;
      for (let file of files) {
        const image = await resizeFile(file);
        // console.log(image); thsi is the url of the resized link
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="row">
      <label className="btn btn-sm btn-warning rounded">
        Upload File
        <div>
          <input
            type="file"
            multiple
            accept="image/*"
            hidden
            onChange={handleChange}
          />
        </div>
      </label>
    </div>
  );
};

export default FileUpload;
