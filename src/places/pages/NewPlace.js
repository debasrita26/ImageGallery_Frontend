import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [Error, setError] = useState();

  const [formState, inputHandler] = useForm(
    {
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  // const placeSubmitHandler = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     formData.append("image", formState.inputs.image.value);
  //     formData.append("creator", auth.userId);
  //     await sendRequest("http://localhost:5010/api/places", "POST", formData, );
  //     history.push("/");
  //   } catch (err) {
  //     setError(err.message || "something went wrong");
  //     console.log("error in creating iamge", err);
  //   }
  // };

  return (
    <form className="place-form" >
      <ImageUpload
        id="image"
        onInput={inputHandler}
        errorText="Please provide an image"
      />
      {/* <Button to="/u1/places" type="submit" disabled={!formState.isValid}>
        Add Image
      </Button> */}
    </form>
  );
};

export default NewPlace;
