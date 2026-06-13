import { useContext, useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext, DataCollection } from "@/index";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useContext(AuthContext);
  const data = useContext(DataCollection);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({type: "AUTOLOGIN"});
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({type: "LOGIN", loginData: {username, password, endpoint: data['/login']}});
  };

  useEffect(() => {
    if (state.type === 'loggedin') {
      navigate('/main');
    }
  }, [state.type]);

  return (
    <div className="login-page">
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          <input
            placeholder="Username"
            value={username}
            onFocus={() => {setUsername(''); dispatch({type: 'CLEAR'});}}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onFocus={() => {setPassword(''); dispatch({type: 'CLEAR'});}}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {(state.type === 'error') && <p className="error">{state.msg}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
