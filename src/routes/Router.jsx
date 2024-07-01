import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "../containers/pages/SignUp";
import { SignIn } from "../containers/pages/SignIn";
import { Home } from "../containers/pages/Home";
import { Layout } from "../containers/layouts/Layout";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};