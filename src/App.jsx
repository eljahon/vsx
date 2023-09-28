	import React from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get, isEmpty } from "lodash";

import { constants, storage } from "services";
import { useFetchOne } from "hooks";
import { auth, system } from "store/actions";
import { userSelector } from "store/selectors";

import { AuthorizedRoutes, UnAuthorizedRoutes } from "AppRoutes";

import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  const user = useSelector(userSelector);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useFetchOne({
  // 	url: "/language",
  // 	queryOptions: {
  // 		onSuccess: (response) => dispatch(system.changeLanguages(response)),
  // 	},
  // });

  useFetchOne({
  	url: "/users/me",
  	urlSearchParams: {
  		populate: "position,userDetail,userDetail.avatar",
  	},
  	queryOptions: {
  		onSuccess: (user) => {
  			dispatch(auth.success(user));
  			storage.set("token", get(user, "token"));
  			if (get(user, "step") <= constants.STEP_PHONE_CONFIRMED) navigate("/profile");
  		},
  		onError: (error) => {
  			dispatch(auth.success(user));

  			// dispatch(auth.failure(error));
  			// navigate("/login");
  		},
  	},
  });

  return (
    <>
      {(!isEmpty(user) && get(user, "step") >= constants.STEP_REGISTRATION_END) || true ? (<AuthorizedRoutes />) : (<UnAuthorizedRoutes />)}

      <ToastContainer className="app-toast" />
    </>
  );
};
