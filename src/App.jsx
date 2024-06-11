import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import './App.css';

import { SignUp } from "./containers/pages/SignUp";
import { LogIn } from "./containers/pages/SignIn";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<LogIn />} />
      </Routes>
    </Router>
  )
}

export default App
