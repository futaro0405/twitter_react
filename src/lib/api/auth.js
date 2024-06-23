import { url_signin, url_signout, url_signup } from "../urls"
import client from "./client"
import Cookies from "js-cookie"

// サインアップ（新規アカウント作成）
export const signUp = (params) => {
  console.log(params)
  return client.post(url_signup, params)
}

// サインイン（ログイン）
export const signIn = (params)  => {
  return client.post(url_signin, params)
}

// サインアウト（ログアウト）
export const signOut = () => {
  return client.delete(url_signout, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
  return client.get("/auth/sessions", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}
