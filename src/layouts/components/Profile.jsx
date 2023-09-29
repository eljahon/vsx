import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { get } from "lodash";

import { auth } from "store/actions";
import { storage } from "services";
import { userSelector } from "store/selectors";
import { useGetLanguage } from "hooks";

import { Button, Avatar, Typography, DropDown } from "components";

import { ReactComponent as ArrowIcon } from "assets/icons/drop-down-arrow-small.svg";
import { ReactComponent as EditIcon } from "assets/icons/edit.svg";
import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";
import {useTranslation} from "react-i18next";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userData'))
  const { getLanguageValue } = useGetLanguage();
  const {t} = useTranslation()
  console.log(user)
  const handleLogout = (event) => {
    storage.remove("token");
    storage.remove("userData");
    storage.remove("roleName");
    dispatch(auth.failure());
    navigate("/login");
  };
  const filerUrl = process.env.REACT_APP_IMAGE_BASE_URL

  const redirectEditPage = (event) => {
    navigate("/profile");
  };

  return (
    <DropDown
      outerClass="ml_10 drop-down"
      offset="5px"
      renderTrigger={(handleMenuToggle, isVisible) => (
        <>
          <Button className="header__profile" onClick={handleMenuToggle}>
            <div className="mr_15 text-align_right">
              <Typography
                Type="h4"
                className="profile__name"
                text={
                  `${get(user, "userDetail.first_name", "")} ${get(
                    user,
                    "userDetail.last_name",
                    ""
                  )}` || "John Doe"
                }
              />
              <Typography
                Type="p"
                className="profile__position"
                text={
                  get(user, 'sureName') ? user.firstName+ " " +user.sureName      : t('user-not')
                }
              />
            </div>

            <Avatar
              src={
                get(user, "image")  ? filerUrl +get(user, 'image') :
                require("assets/images/user-default.png")
              }
              className="mr_10"
            />

            <ArrowIcon
              className={cn("transition-default", { rotate_180: isVisible })}
            />
          </Button>
        </>
      )}
    >
      {/*<Button*/}
      {/*  className="btn drop-down__btn table__actions-edit"*/}
      {/*  prepend={<EditIcon />}*/}
      {/*  text="Редактировать"*/}
      {/*  onClick={redirectEditPage}*/}
      {/*/>*/}

      <Button
        className="btn drop-down__btn table__actions-delete"
        prepend={<LogoutIcon />}
        text={t('Logout')}
        onClick={handleLogout}
      />
    </DropDown>
  );
};
