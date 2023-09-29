	import React from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get, isEmpty } from "lodash";

import { constants, storage } from "services";
import { useFetchOneAuth } from "hooks";
import { auth, system } from "store/actions";
import { userSelector } from "store/selectors";

import { AuthorizedRoutes, UnAuthorizedRoutes } from "AppRoutes";

import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  const user = useSelector(userSelector);
    const userData = JSON.parse(localStorage.getItem('userData'))
  const navigate = useNavigate();
  const dispatch = useDispatch();
	useFetchOneAuth({
  	url: "/users/me",
  	urlSearchParams: {
  		populate: "*",
  	},
  	queryOptions: {
  		onSuccess: (user) => {
			console.log(user)
  			dispatch(auth.success({user}));
  			storage.set("token", get(user, "token"))
  		},
  		onError: (error) => {
  			dispatch(auth.failure(error));
  			navigate("/login");
  		},
  	},
  });
  return (
    <>
      {!isEmpty(user) ? <AuthorizedRoutes /> : <UnAuthorizedRoutes />}

      <ToastContainer className="app-toast" />
    </>
  );
};
