import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Meals from "./pages/Meals";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
// <Layout>
//     <Home />
// </Layout>

function App() {

    return (

        <BrowserRouter>

            <Layout>

                <Routes>

                    <Route
                        path="/"
                        element={<Home />}
                    />


                    <Route
                        path="/meals/category/:categoryId"
                        element={<Meals />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />

                </Routes>

            </Layout>

        </BrowserRouter>

    );

}

export default App;