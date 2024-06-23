import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

import { Button, Card, CardContent, CardHeader, TextField, styled } from "@mui/material"
import { signUp } from "../../lib/api/auth";
import {AlertMessage} from "../utils/AlertMessage";
import { useSetRecoilState } from "recoil";
import { currentUserState, flashState, isSigninState } from "../../lib/state/state";
import { url_signin } from "../../lib/urls";

const SSubmitBtn = styled(Button)(({theme}) => ({
  marginTop: theme.spacing(2),
  flexGrow: 1,
  textTransform: "none"
}));
const SHeader = styled(CardHeader)(({theme}) => ({
  marginTop: theme.spacing(2),
  flexGrow: 1,
  textTransform: "none"
}));
const SCard = styled(Card)(({theme}) => ({
  padding: theme.spacing(2),
  maxWidth: 400
}));

// サインアップ用ページ
export const SignUp = () => {
  const navigation = useNavigate()
  const setCurrentUser = useSetRecoilState(currentUserState)
  const setIsSignIn = useSetRecoilState(isSigninState)
  const setFlash = useSetRecoilState(flashState)

  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")
  const [phone, setPhone] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

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
      // confirm_success_url: url_signin
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
        <SCard>
          <SHeader title="Sign Up" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Name"
              value={name}
              margin="dense"
              onChange={event => setName(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="UserName"
              value={userName}
              margin="dense"
              onChange={event => setUserName(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email"
              value={email}
              margin="dense"
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password Confirmation"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPasswordConfirmation(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="PhoneNumber"
              value={phone}
              margin="dense"
              onChange={event => setPhone(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="BirthDay"
              value={birthdate}
              margin="dense"
              onChange={event => setBirthdate(event.target.value)}
            />
            <SSubmitBtn
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="inherit"
              disabled={!name || !email || !userName || !phone || !birthdate || !password || !passwordConfirmation ? true : false}
              onClick={handleSubmit}
            >
              Submit
            </SSubmitBtn>
          </CardContent>
        </SCard>
      </form>
      <AlertMessage />
    </>
  )
}
