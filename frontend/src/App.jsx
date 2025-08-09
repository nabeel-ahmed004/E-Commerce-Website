import { Route, BrowserRouter, Routes } from "react-router";
import { LoginPage, SignupPage, ActivationPage, HomePage, ProductPage } from "./routes";
import "./App.css";
import { Bounce, ToastContainer } from "react-toastify";
import axios from "axios";
import { server } from "./server";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";

function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
    // axios
    //   .get(`${server}/user/getuser`, { withCredentials: true })
    //   .then((res) => {
    //     toast.success(res.data.message);
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data.message);
    //     toast.error("Error");
    //   });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route path="products" element={<ProductPage/>}/>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </BrowserRouter>
  );
}

export default App;
