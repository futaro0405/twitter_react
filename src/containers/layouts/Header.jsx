import Cookies from "js-cookie"
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// mui
import { AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

// api
import { signOut } from "../../lib/api/auth";

import { AuthContext } from "../../App";

const SLinkBtn = styled(Button)(() => ({
  textTransform: "none"
}));

const SIconBtn = styled(IconButton)(({theme}) => ({
  marginRight: theme.spacing(2),
}));

const STitle = styled(Typography)(() => ({
  flexGrow: 1,
  textDecoration: "none",
  color: "inherit"
}));

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
          <SLinkBtn
            color="inherit"
            onClick={handleSignOut}
          >
            Sign out
          </SLinkBtn>
        )
      } else {
        return (
          <>
            <SLinkBtn
              component={Link}
              to="/signin"
              color="inherit"
            >
              Sign in
            </SLinkBtn>
            <SLinkBtn
              component={Link}
              to="/signup"
              color="inherit"
            >
              Sign Up
            </SLinkBtn>
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
          <SIconBtn
            edge="start"
            color="inherit"
          >
            <MenuIcon />
          </SIconBtn>
          <STitle
            component={Link}
            to="/"
            variant="h6"
          >
            Sample
          </STitle>
          <AuthButtons />
        </Toolbar>
      </AppBar>
    </>
  );
};
