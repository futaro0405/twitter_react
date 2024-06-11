import './App.css';
import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate,} from "react-router-dom";

import { SignUp } from "./containers/pages/SignUp";
import { SignIn } from "./containers/pages/SignIn";
import Layout from "./containers/layouts/Layout";
import { getCurrentUser } from './lib/api/auth';
import { Home } from './containers/pages/Home';

export const AuthContext = createContext();

function App() {
  const [loading, setLoading] = useState(true);
  const [isSignIn, setIsSignIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async() => {
    try {
      const res = await getCurrentUser()
      if(res?.data.isLogin === true) {
        setIsSignIn(true)
        setCurrentUser(res?.data.data)
        console.log(res?.data.data)
      }else{
        console.log("No current user")
      }
    } catch(error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  const Private = ({children}) => {
    if(!loading) {
      if(isSignIn) {
        return children
      } else {
        return <Navigate to="/signin" />
      }
    }
  }

  return (
    <Router>
      <AuthContext.Provider value={{ loading, setLoading, isSignIn, setIsSignIn, currentUser, setCurrentUser}}>
        <Layout>
          <Routes>
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Private>
              <Route exact path="/" element={<Home />} />
            </Private>
          </Routes>
        </Layout>
      </AuthContext.Provider>
    </Router>
  )
}

export default App
