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

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const { getLanguageValue } = useGetLanguage();

  const handleLogout = (event) => {
    storage.remove("token");
    dispatch(auth.failure());
    navigate("/login");
  };

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
                  getLanguageValue(get(user, "position.title")) || "John Doe"
                }
              />
            </div>

            <Avatar
              src={
                get(user, "userDetail.avatar.thumbnails.medium") ||
                require("assets/images/user.png")
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
      <Button
        className="btn drop-down__btn table__actions-edit"
        prepend={<EditIcon />}
        text="Редактировать"
        onClick={redirectEditPage}
      />

      <Button
        className="btn drop-down__btn table__actions-delete"
        prepend={<LogoutIcon />}
        text="Выйти"
        onClick={handleLogout}
      />
    </DropDown>
  );
};
