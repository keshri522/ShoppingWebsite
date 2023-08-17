import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar, Badge } from "antd";
import { useSelector } from "react-redux";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";

const FileUpload = ({ loading, Setloading, values, Setvalues }) => {
  let user = useSelector((state) => state.rootreducer.user);

  // this is for the reisizing of the images
  const alluploadImage = values.images; // this is AN array coming from productCreate.js
  // this function will resize the image and then send to backend to upload to clodinary
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
    Setloading(true);
    // user can elect multiple files so we use for loop to iterate the files and resize the each of them
    try {
      const files = e.target.files;
      for (let file of files) {
        const image = await resizeFile(file);

        // console.log(image); thsi is the url of the resized link
        // call a api to backend to send the image uri and upload in the cloudinary once uploaded we got the link as a response then the link has to saved in the alluploadeImag and once create its is going to save the url as string in the mongo db
        let response = await axios.post(
          "http://localhost:4000/api/uploadimage",
          { image: image },
          {
            headers: {
              token: user.token,
            },
          }
        );
        //pushing into the images coming as props

        alluploadImage.push(response.data);
        // set the values of images
        Setvalues({ ...values, images: alluploadImage }); // setting the values of images to the url coming from response
        Setloading(false);
      }
    } catch (err) {
      console.log(err);
      Setloading(false);
    }
  };
  const DelteImage = (image_id) => {
    // need to update values.images after deleted
    let filterItem = values.images.filter(
      (items) => items.public_id !== image_id
    );
    // need to update or set the values of images
    Setvalues({ ...values, images: filterItem });
  };

  return (
    <>
      <div className="row">
        {values && values.images
          ? values.images.map((image) => (
              <Badge
                type="button"
                count={<CloseOutlined className="text-danger"></CloseOutlined>}
                key={image.public_id}
                onClick={() => {
                  DelteImage(image.public_id);
                }}
              >
                <Avatar
                  key={image.public_id}
                  src={image.url}
                  size={100}
                  className="m-3"
                  shape="square"
                ></Avatar>
              </Badge>
            ))
          : ""}
      </div>
      <div className="row">
        <label className="">
          {loading ? (
            <h2 className="mx-2">
              {" "}
              <LoadingOutlined className="text-danger font"></LoadingOutlined>
            </h2>
          ) : values.images.length > 0 ? (
            <h4 className="text-primary upload rounded">Upload More</h4>
          ) : (
            <h4 className="text-primary upload rounded">Upload file</h4>
          )}

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
    </>
  );
};

export default FileUpload;
