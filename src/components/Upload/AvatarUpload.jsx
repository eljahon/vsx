import React, { useEffect, useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { get, isFunction } from "lodash";
import { serialize } from "object-to-formdata";

import { httpClient } from "services";

import { UploadBase } from "./UploadBase";

import "./Upload.scss";
import UserDefault from "assets/images/user-default.png";
import { ReactComponent as EditIcon } from "assets/icons/edit.svg";

export const AvatarUpload = ({
  src = UserDefault,
  className = "",
  getImage,
  form,
  field,
}) => {
  const [imgSrc, setImgSrc] = useState();
const BaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;
  // console.log(imgSrc, field , BaseUrl)
  // useEffect(() => {
  //   setImgSrc(field.value);
  // }, [field.value]);
  useEffect(() => {
    setImgSrc(imgSrc);
  }, [imgSrc]);
  const handleImageUpload = (event) => {
    const image = event?.target?.files[0];
    const formdata = new FormData()
    formdata.append('files', image)
    httpClient.post("/upload", formdata).then(({ data }) => {
      console.log(data)
    	setImgSrc(get(data, "0.url"));
    	form.setFieldValue(
    		field.name,
    		isFunction(getImage) ? getImage(data) : get(data, "0.url")
    	);
    });
  };
  return (
    <div className={cn("avatar-upload", className)}>
      <div className="avatar-upload__inner">
        <img src={field.value ? BaseUrl+field.value : imgSrc ?  BaseUrl+imgSrc : ''} alt="image is not " />
      </div>

      <UploadBase
        accept=".png,.jpeg,.jpg"
        className="avatar-upload__btn"
        onFileUpload={handleImageUpload}
      >
        <EditIcon />
      </UploadBase>
    </div>
  );
};

AvatarUpload.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  getImage: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};
