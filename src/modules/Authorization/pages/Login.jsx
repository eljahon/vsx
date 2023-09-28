import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FastField } from "formik";
import { get } from "lodash";

import { storage } from "services";
import { auth } from "store/actions";

import Containers from "containers";
import { Fields, Typography, InputPassword, Button, AppLink } from "components";

import { ReactComponent as UserIcon } from "assets/icons/user.svg";
import { ReactComponent as PhoneIcon } from "assets/icons/phone.svg";
import logo from "../../../assets/images/logo.svg";
import {useNotification} from "../../../hooks";
import { useTranslation } from "react-i18next";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notifier = useNotification();
  const {t} = useTranslation();
  const checkList = (roleName, id) => {
      console.log(roleName, id)
      switch (roleName) {
          case 'Superadmin': return navigate(`/${id}/dashboard`)
          case 'VsxManager': return navigate(`/${id}/dashboard`)
          case 'VsxInspector': return navigate(`/${id}/cameras`)
          case 'RegionalManager': return navigate(`/${id}/dashboard`)
          case 'SuperDuperAdmin': return navigate(`/${id}/dashboard`)
          // default: return navigate(`/${id}/dashboard`)
      }
  }
  return (
    <>
      <div className="auth__heading d-flex align-items-center flex-column">

       <img src={logo} />
        <Typography
          Type="h1"
          className="auth__title"
          text={t("auth-title")}
        />

      </div>

    <div className="auth__form__bg">
    <Containers.Form
        url="/users-permissions/login"
        className="row g-3 "
        onSuccess={ async (user) => {
            console.log(user)
          dispatch(auth.success(get(user, "user")));
          storage.set("token", get(user, "jwt"));
          storage.set('roleName', get(user, "user.role.name"))
          storage.set('userData', JSON.stringify(get(user, 'user')))
          // navigate(`/${user.user.id}/dashboard`);
            await checkList(user?.user?.role?.name, user.user.id)
        }}
        onError={(user) => {
            // console.log(user)
            // notifier.error('')
          // dispatch(auth.success(get(user, "data")));
          // storage.remove("token");
          // storage.remove("userData");
          // navigate("/");
        }}
        onFinal={()=> {

        }}
        fields={[
          {
            name: "identifier",
            validations: [{ type: "required" }],
          },
          {
            name: "password",
            validations: [{ type: "required" }],
          },
        ]}
      >
        {({ isSubmitting }) => (
          <>
            <div className="col-12">
              <span className="label">{t("auth-label")}</span>
              <FastField
                name="identifier"
                component={Fields.InputText}
                placeholder={t("auth-login")}
              />
            </div>

            <div className="col-12 mb_15">
              <FastField
                name="password"
                component={InputPassword}
                placeholder={t("auth-password")}
              />
            </div>

            <div className="col-12 mb_20 text-align_left">
              <AppLink
                link="/forgot-password"
                className="color_brand-blue text-decoration_underline"
                text={t('auth-forgot-password')}
              />
            </div>

            <div className="col-12 mb_15">
              <Button
                className="btn w_full"
                design="primary"
                type="submit"
                text={t("submit")}
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
              />
            </div>
          </>
        )}
      </Containers.Form>
    </div>

      {/* <Typography Type="p" className="text-align_center control__text">
				{() => (
					<>
						Нет аккаунта?{" "}
						<AppLink
							link="/register"
							className="color_brand-blue"
							text="Зарегистрироваться"
						/>
					</>
				)}
			</Typography> */}

    </>
  );
};

export default Login;
