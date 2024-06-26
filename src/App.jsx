import './App.css'
import { useState } from 'react'
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth', {
        email: email,
        password: password
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
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
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default App
