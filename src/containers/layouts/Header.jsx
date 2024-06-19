import Cookies from "js-cookie"
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// mui
import { AppBar, Toolbar} from "@mui/material";

// components
import {HeaderButton as SButton} from "../../components/button/HeaderButton";
import {HeaderTitle as STitle} from "../../components/typograpy/HeaderTitle";

// api
import { signOut } from "../../lib/api/auth";
import { AuthContext } from "../../App";

export const Header = () => {
  const {loading, isSignIn, setIsSignIn } = useContext(AuthContext);
  const navigation = useNavigate()

  const handleSignOut = async () => {
    try {
      const res = await signOut()
      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignIn(false)
        navigation("/signin")

        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignIn) {
        return (
          <SButton onClick={handleSignOut}>Sign out</SButton>
        )
      } else {
        return (
          <>
            <SButton to="/signin">Sign in</SButton>
            <SButton to="/signup">Sign Up</SButton>
          </>
        )
      }
    } else {
      return <></>
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <STitle to="/">Sample</STitle>
          <AuthButtons />
        </Toolbar>
      </AppBar>
    </>
  );
};
