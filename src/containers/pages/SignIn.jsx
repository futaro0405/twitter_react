import Cookies from "js-cookie"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, Card, CardHeader, Link, Button, CardContent, TextField, Typography, Box } from "@mui/material";

import { signIn } from "../../lib/api/auth";
import {AlertMessage} from "../utils/AlertMessage";
import { currentUserState, isSigninState } from "../../lib/state/state";
import { useRecoilState } from "recoil";

const SCard = styled(Card)(({theme}) => ({
  padding: theme.spacing(2),
  maxWidth: 400,
}));
const SHeader = styled(CardHeader)(() => ({
  textAlign: "center",
}));
const SSubmitBtn = styled(Button)(({theme}) => ({
  marginTop: theme.spacing(2),
  flexGrow: 1,
  textTransform: "none",
}));
const SBox = styled(Box)(() => ({
  marginTop: "2rem",
}));
const SLink = styled(Link)(() => ({
  textDecoration: "none",
}));

export const SignIn = () => {
  const navigation = useNavigate()
  const setCurrentUser = useRecoilState(currentUserState)
  const setIsSignIn = useRecoilState(isSigninState)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alertMessageOpen, setAlertMessageOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const params = { email, password }
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
        console.log("Signed in successfully!")
      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    }
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <SCard>
          <SHeader title="Sign In" />
          <CardContent>
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
              placeholder="At least 6 characters"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <SSubmitBtn
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="inherit"
              // 空欄があった場合はボタンを押せないように
              disabled={!email || !password ? true : false}
              onClick={handleSubmit}
            >
              Submit
            </SSubmitBtn>
            <SBox textAlign="center">
              <Typography variant="body2">Don`t have an account?
                <SLink to="/signup">Sign Up now!</SLink>
              </Typography>
            </SBox>
          </CardContent>
        </SCard>
      </form>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity={"error"}
        message={"Invalid emai or password"}
      />
    </>
  )
}
