import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { addUser, removeUser } from "../../redux/cartSlice";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State for general errors
  const [emailError, setEmailError] = useState(null); // State for email-specific errors
  const [passwordError, setPasswordError] = useState(null); // State for password-specific errors
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    //console.log(auth)
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          addUser({
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("logout successful");
        dispatch(removeUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setError(null); // Clear general error
    setEmailError(null); // Clear email-specific error
    setPasswordError(null); // Clear password-specific error



    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(addUser({
          _id: user.uid,
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        }));
        toast.success("Login successful")

        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage =  error.message;

        if (errorCode === "auth/user-not-found" || errorCode === "auth/invalid-email") {
          setEmailError("Email Address is wrong");
        } else if (errorCode === "auth/wrong-password" || errorCode === "auth/missing-password") {
          setPasswordError("Password is wrong");
        } else {
          setError("Email or Password is Wrong");
        }

        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-8 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to PIXTEL
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {emailError && (
        <div className="text-red-500 text-sm mt-2">{emailError}</div>
      )}

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

             {passwordError && (
        <div className="text-red-500 text-sm mt-2">{passwordError}</div>
      )}

{error && (
        <div className="text-red-500 text-sm mt-2">{error}</div>
      )}

              <div className="text-sm flex flex-row-reverse p-1">
            
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={handleSignIn}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>

            <p className="text-sm font-light text-gray-900 dark:text-gray-900">
              Dont have an account yet?{" "}
              <a
                href="/signup"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </a>
            </p>
          </form>

          <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold">OR</p>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full text-center py-3 mb-12 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="w-6 h-6"
              alt=""
            />
            <span className="dark:text-gray-900">Login with Google</span>
          </button>
          <button onClick={handleSignOut}>logout</button>
        </div>
      </div>
    </>
  );
};

export default Login;
