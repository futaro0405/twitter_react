import Cookies from "js-cookie"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil";

import { signUp } from "../../lib/api/auth";
import { url_signin } from "../../lib/urls";
import { currentUserState, flashState, isSigninState } from "../../lib/state/state";

import {AlertMessage} from "../utils/AlertMessage";
import { Card } from "../../components/card/Card";
import { DateField } from "../../components/textfield/DateField";
import { TextField } from "../../components/textfield/TextField";
import { SubmitButton } from "../../components/button/PrimaryButton";

// サインアップ用ページ
export const SignUp = () => {
  const navigation = useNavigate()
  const setCurrentUser = useSetRecoilState(currentUserState)
  const setIsSignIn = useSetRecoilState(isSigninState)
  const setFlash = useSetRecoilState(flashState)

  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [phone, setPhone] = useState("")
  const [birthdate, setBirthdate] = useState("")

  const formList = [
    {
      label: "Name",
      type: "text",
      state: name,
      setState: setName,
    },
    {
      label: "userName",
      type: "text",
      state: userName,
      setState: setUserName,
    },
    {
      label: "Email",
      type: "text",
      state: email,
      setState: setEmail,
    },
    {
      label: "Password",
      type: "password",
      state: password,
      setState: setPassword,
    },
    {
      label: "PasswordConfirmation",
      type: "password",
      state: passwordConfirmation,
      setState: setPasswordConfirmation,
    },
    {
      label: "PhoneNumber",
      type: "text",
      state: phone,
      setState: setPhone,
    },
    {
      label: "BirthDay",
      type: "date",
      state: birthdate,
      setState: setBirthdate,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault()

    const params = {
      name: name,
      user_name: userName,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
      phone: phone,
      birthdate: birthdate,
      confirm_success_url: url_signin
    }

    try {
      const res = await signUp(params)
      console.log(params)

      if (res.status === 200) {
        // アカウント作成と同時にログインさせてしまう
        // 本来であればメール確認などを挟むべきだが、今回はサンプルなので
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
          { formList.map(arr => {
            if (arr.type === "text" || arr.type === "password") {
              return (
                <TextField
                  key={arr.label}
                  type={arr.type}
                  lavel={arr.label}
                  state={arr.state}
                  setState={arr.setState}
                />
              )
            } else if(arr.type === "date") {
              return (
                <DateField
                  key={arr.label}
                  lavel={arr.label}
                  state={arr.state}
                  setState={arr.setState}
                />
              )
            }
          })}

          <SubmitButton
            disabled={!name || !email || !userName || !phone || !birthdate || !password || !passwordConfirmation ? true : false}
            handleEvent={handleSubmit}
          >
            Submit
          </SubmitButton>
        </Card>
      </form>

      <AlertMessage />
    </>
  )
}
