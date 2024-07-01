import axios from 'axios';
import { useState } from 'react'
import Cookies from "js-cookie"

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSignUp = async () => {
    const params = {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/auth',
        params
      );
      const status = response.status;
      console.log(response);

      if(status === 200) {
        Cookies.set("_access_token", response.headers["access-token"])
        Cookies.set("_client", response.headers["client"])
        Cookies.set("_uid", response.headers["uid"])
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="PasswordConfigration"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </>
  );
}