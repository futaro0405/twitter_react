import Cookies from "js-cookie"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { styled, Link, Box } from "@mui/material";

import { signIn } from "../../lib/api/auth";
import { currentUserState, flashState, isSigninState } from "../../lib/state/state";
import {AlertMessage} from "../utils/AlertMessage";

import { Card } from "../../components/card/Card";
import { PrimaryButton } from "../../components/button/PrimaryButton";
import { TextField } from "../../components/textfield/TextField";

import { initialUser, isBlank, signinLists } from "../../hooks/useSignin";
import { Typography } from "../../components/typograpy/Typoraghy";

const SBox = styled(Box)(() => ({
  marginTop: "2rem",
}));
const SLink = styled(Link)(() => ({
  textDecoration: "none",
}));

export const SignIn = () => {
  const navigation = useNavigate()
  const setCurrentUser = useSetRecoilState(currentUserState)
  const setIsSignIn = useSetRecoilState(isSigninState)
  const setFlash = useSetRecoilState(flashState)

  const [user, setUser] = useState(initialUser)

  const onChangeUser = () => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const params = {
      email: user.email,
      password: user.password,
    }

    try {
      const res = await signIn(params)
      console.log(res)
      if(res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
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
        <Card title="Sign In">
          {
            signinLists.map((list) => (
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
            type={"submit"}
            disabled={isBlank(user) ? true : false}
            handleEvent={handleSubmit}
          >
            Submit
          </PrimaryButton>

          <SBox textAlign="center">
            <Typography variant="body2">
              Don`t have an account?
              <SLink to="/signup">Sign Up now!</SLink>
            </Typography>
          </SBox>
        </Card>
      </form>

      <AlertMessage />
    </>
  )
}
