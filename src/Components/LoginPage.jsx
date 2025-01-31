/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { LOGIN_BG_IMG } from "../utils/constants";

const LoginPage = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  const handleButtonClick = () => {
    const message = checkValidData(
      email?.current?.value,
      password?.current?.value
    );
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/main");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage("can not sign up the user ");
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          const user = userCredential.user;

          navigate("/main");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage("User not found");
        });
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${LOGIN_BG_IMG}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-8 rounded-xl shadow-xl w-full max-w-md transform transition-all hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8">
          {isSignInForm ? "Welcome Back" : "Create Account"}
        </h2>

        <form onClick={(e) => e.preventDefault()} className="space-y-6">
          {!isSignInForm && (
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-white/5 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-white/50"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Email
            </label>
            <input
              ref={email}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-white/5 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-white/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Password
            </label>
            <input
              ref={password}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-white/5 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-white/50"
            />
            {errorMessage && (
              <p className="mt-2 text-red-300 bg-red-900/30 px-3 py-2 rounded-md text-sm">
                {errorMessage}
              </p>
            )}
          </div>

          <button
            onClick={handleButtonClick}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            {isSignInForm ? "Sign In" : "Create Account"}
          </button>

          <p className="text-center text-sm text-white/70 mt-6">
            {isSignInForm ? "New here?" : "Already have an account?"}
            <button
              onClick={toggleSignInForm}
              className="ml-2 text-blue-300 hover:text-blue-400 font-medium transition-colors focus:outline-none"
            >
              {isSignInForm ? "Create account" : "Sign in instead"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
