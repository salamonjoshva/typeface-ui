import { GoogleLogin } from "react-google-login";
import typeFaceLogo from "../assests/logo-nav.svg";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

const Login = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const authenticate = async(token) => {
    const response = await fetch('http://localhost:8080/v1/login/user',{
      headers:{
        'Content-Type':'application/json',
        'token':token
      }})
    return await response.json();
  }
  const onLoginSuccess = (res) => {
    authenticate(res.tokenId).then(responseJson => {
      localStorage.setItem("user", responseJson.data)
      setIsLoggedIn(true);
    });
  };

  useEffect(() => {
    document.title = "Login - TypeFace";
    if (localStorage.getItem("user") || isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn]);
  
  const onLoginFailure = (res) => {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src={typeFaceLogo}
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div>
          <GoogleLogin
            clientId=""
            render={(renderProps) => (
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent
              text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-500
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-red-500"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Google Sign In
              </button>
            )}
            buttonText="Login"
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
