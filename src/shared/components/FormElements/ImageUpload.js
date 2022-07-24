// import React, { useEffect, useRef, useState } from "react";
// import { Redirect } from "react-router-dom";

// import Button from "./Button";
// import "./ImageUpload.css";

// const ImageUpload = (props) => {
//   const [file, setFile] = useState();
//   const [previewUrl, setPreviewUrl] = useState();
//   const [isValid, setIsValid] = useState(false);

//   const filePickerRef = useRef();

//   useEffect(() => {
//     if(!file){
//       return;
//     }
//     const fileReader=new FileReader();
//     fileReader.onload=()=>{
//       setPreviewUrl(fileReader.result);
//     };
//     fileReader.readAsDataURL(file);
//   }, [file]);

//   const pickedHandler = (event) => {
//     let pickedFile;
//     let fileIsValid = isValid;
//     if (event.target.files || event.target.files.length !== 0) {
//       const pickedFile = event.target.files[0];
//       setFile(pickedFile);
//       setIsValid(true);
//       fileIsValid = true;
//     } else {
//       setIsValid(false);
//       fileIsValid = false;
//     }
//     props.onInput(props.id, pickedFile, fileIsValid);
//   };

//   const pickImageHandler = () => {
//     filePickerRef.current.click();
//   };

//   const handleSubmit= async e => {
//     e.preventDefault();

//   }

//   return (
//     <div className="form-control">
//       <input
//         id={props.id}
//         ref={filePickerRef}
//         style={{ display: "none", color: "red" }}
//         type="file"
//         accept=".jpg,.png,.jpeg"
//         onChange={pickedHandler}
//       />
//       <div className={`image-upload ${props.center && "center"}`}>
//         <div className="image-upload__preview">
//           {previewUrl && <img src={previewUrl} alt="Preview" className="center" />}
//           {!previewUrl && <p>please pick an image</p>}
//         </div>
//         <Button type="button" onClick={pickImageHandler}>
//           Upload Image
//         </Button>
//         <Button to="/u1/places" type="submit">
//         Add Image
//       </Button>
//       </div>
//       {!isValid && <p>{props.errorText}</p>}
//     </div>
//   );
// };

// export default ImageUpload;

import MainNavigation from "../Navigation/MainNavigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import Card from "../UIElements/Card";
import cookie from "js-cookie";
import "./ImageUpload.css";

const ImageUpload = () => {
  const [state, setState] = useState({
    name: "",
    error: "",
    success: "",
    buttonText: "Add",
    image: "",
  });
  const [content, setContent] = useState("");
  const [imageUploadButtonName, setImageUploadButtonName] =
    useState("Upload image");

  const { name, success, error, image, buttonText } = state;

  const handleChange = (name) => (e) => {
    setState({ ...state, [name]: e.target.value, error: "", success: "" });
  };

  const token = cookie.get("token");

  const handleContent = (e) => {
    //setContent(e);
    setState({ ...state, success: "", error: "" });
  };

  const handleImage = (event) => {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }

    setImageUploadButtonName(event.target.files[0].name);
    
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            setState({ ...state, image: uri, success: "", error: "" });
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Uploading.." });

    try {
      const response = await axios.post(
        "http://localhost:5010/api/images/",
        { name, image, token },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      console.log("CATEGORY CREATE RESPONSE", response);
      setState({
        ...state,
        name: "",
        buttonText: "Added",
        success: `${response.data.name} is created`,
      });
    } catch (error) {
      console.log("error in uploading image", error);
      setState({
        ...state,
        buttonText: "Add",
        error: error.response.data.error,
      });
    }
  };

  return (
    <Card>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Image Upload</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                onChange={handleChange("name")}
                value={name}
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Image</label>
            </div>
            <br />
            <div className="form-group">
              <label className="btn btn-outline-secondary">
                <input
                  onChange={handleImage}
                  type="file"
                  accept="image/*"
                  className="form-control"
                />
              </label>
            </div>
            <br />
            <div>
              <button className="btn btn-outline-warning">{buttonText}</button>
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default ImageUpload;
