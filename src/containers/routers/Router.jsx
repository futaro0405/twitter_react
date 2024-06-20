import { BrowserRouter, Route, Routes } from "react-router-dom";

// pages
import { Layout } from "../layouts/Layout";
import { SignUp } from "../pages/SignUp";
import { SignIn } from "../pages/SignIn";
import { Home } from "../pages/Home";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};