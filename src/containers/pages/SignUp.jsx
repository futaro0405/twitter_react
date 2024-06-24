import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil";
import { useState } from "react"

import { signUp } from "../../lib/api/auth";
import { url_signin } from "../../lib/urls";
import { currentUserState, flashState, isSigninState } from "../../lib/state/state";

import {AlertMessage} from "../utils/AlertMessage";
import { Card } from "../../components/card/Card";
import { TextField } from "../../components/textfield/TextField";
import { initialUser, isBlank, signupLists } from "../../hooks/useSignup";
import { PrimaryButton } from "../../components/button/PrimaryButton";

export const SignUp = () => {
  const [user, setUser] = useState(initialUser);

  const onChangeUser = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const navigation = useNavigate()
  const setCurrentUser = useSetRecoilState(currentUserState)
  const setIsSignIn = useSetRecoilState(isSigninState)
  const setFlash = useSetRecoilState(flashState)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const params = {
      name: user.name,
      user_name: user.user_name,
      email: user.email,
      password: user.password,
      passwordConfirmation: user.password_confirmation,
      phone: user.phone,
      birthdate: user.birthdate,
      confirm_success_url: url_signin
    }

    try {
      const res = await signUp(params)
      console.log(params)

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignIn(true)
        setCurrentUser(res.data.data)

        navigation("/")

        setFlash({
          isOpen: true,
          severity: "success",
          message: "Signed in successfully!",
        })
      } else {
        setFlash({
          isOpen: true,
          severity: "error",
          message: res.data.errors.full_messages.join("\r\n"),
        })
      }
    } catch (err) {
      console.log("err", err);
      setFlash({
        isOpen: true,
        severity: "error",
        message: err.data.errors.full_messages.join("\r\n"),
      })
    }
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <Card title={"Sign Up"}>
          {
            signupLists.map((list) => (
              <TextField
                key={list.name}
                name={list.name}
                type={list.type}
                label={list.label}
                value={user[list.name]}
                handleChenge={(e) => onChangeUser(e)}
              />
            ))
          }

          <PrimaryButton
            type="submit"
            disabled={isBlank(user) ? true : false}
            onClick={handleSubmit}
          >

          </PrimaryButton>
        </Card>
      </form>
      <AlertMessage />
    </>
  )
}
