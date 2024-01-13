import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./components/Registration/Login";
import Main from "./components/Product/Product";
import Checkout from "./components/Checkout/Checkout";
import Signup from "./components/Registration/Signup";
import { useSelector} from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
        </Routes>
        
        <Footer/>
        <ToastContainer/>
      </BrowserRouter>
    </>
  );
}

export default App;
export const ProtectedRoute = ({children}) => {
  const userInfo = useSelector((state)=>state.cart.userInfo)
  if(userInfo){
    console.log(userInfo);
    return children
  }else{
    console.log(userInfo)
    return <Navigate to={'/login'}/>
    
  }
}