import "./App.css";
import { useState, useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./components/Registration/Login";
import Main from "./components/Product/Product";
import Checkout from "./components/Checkout/Checkout";
import Signup from "./components/Registration/Signup";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./components/Cart/Cart";

function App() {
  // Load dark mode setting from local storage on component mount
  const initialDarkMode = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  // Update local storage when darkMode changes
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <>
      <BrowserRouter>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route
            path="/"
            element={
              <Main darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            }
          ></Route>
          <Route path="/login" element={<Login darkMode={darkMode} />}></Route>
          <Route
            path="/signup"
            element={<Signup darkMode={darkMode} />}
          ></Route>
          <Route path="/cart" element={<Cart darkMode={darkMode} />}></Route>
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout darkMode={darkMode} />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer darkMode={darkMode} />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
export const ProtectedRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.cart.userInfo);
  if (userInfo) {
    console.log(userInfo);
    return children;
  } else {
    console.log(userInfo);
    return <Navigate to={"/login"} />;
  }
};
