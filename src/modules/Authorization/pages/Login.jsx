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

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const notifier = useNotification();
  return (
    <>
      <div className="auth__heading d-flex align-items-center flex-column">

       <img src={logo} />
        <Typography
          Type="h1"
          className="auth__title"
          text="Ўзбекистон Республикаси Ички ишлар вазирлиги"
        />

      </div>

    <div className="auth__form__bg">
    <Containers.Form
        url="/users-permissions/login"
        className="row g-3 "
        onSuccess={(user) => {
          dispatch(auth.success(get(user, "user")));
          storage.set("token", get(user, "jwt"));
          storage.set('roleName', get(user, "user.role.name"))
          storage.set('userData', JSON.stringify(get(user, 'user')))
          navigate("/");
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
              <FastField
                name="identifier"
                component={Fields.InputText}
                placeholder="Имя пользователя"
                // prepend={<UserIcon />}
              />
            </div>

            <div className="col-12 mb_15">
              <FastField
                name="password"
                component={InputPassword}
                placeholder="Пароль"
                // prepend={<PhoneIcon />}
              />
            </div>

            <div className="col-12 mb_20 text-align_left">
              <AppLink
                link="/forgot-password"
                className="color_brand-blue text-decoration_underline"
                text="Паролни унутингизми?"
              />
            </div>

            <div className="col-12 mb_15">
              <Button
                className="btn w_full"
                design="primary"
                type="submit"
                text="Кириш"
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
